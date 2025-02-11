//UseCallBack - A funcao nao sera recriada a cada renderizacao, somente quando as dependencias mudarem

// Importar o React e o useState
import { useCallback, useState } from "react";

//Importar o useFocusEffect para atualizar a tela sempre que ela for exibida ou o componente receber foco
import { useFocusEffect } from "@react-navigation/native";

//Incluir os componentes utilizados para estruturar o conteudo
import { Alert, ScrollView } from "react-native";

//Importar o arquivo com os componentes css
import {
  Container,
  List,
  RowDataHome,
  SpaceBetweenHome,
  TextHome,
  ValueHome,
  ValueHomeContent,
  VerticalBarContent,
} from "../../styles/custom";

//Importar o componente para formatar a moeda
import CurrencyFormatter from "../../utils/CurrencyFormatter";

//Importar o componente para apresentar o alerta com as mensagens de erro retornadas da API.
import ErrorAlert from "../../components/ErrorAlert";

//Importar o componente para apresentar carregando
import Loading from "../../components/Loading";
import api from "../../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Criar e exportar a funcao com a tela Dashboard
export default function Home() {
  const [errors, setErrors] = useState(null);
  const [totalBalanceValue, setTotalBalanceValue] = useState("");
  const [reportMonth, setReportMonth] = useState({});
  const [totalBillValue, setTotalBillValue] = useState("");
  const [billsDueToday, setBillsDueToday] = useState([]);
  const [overdueBills, setOverdueBills] = useState([]);
  const [loading, setLoading] = useState(false);

  const getReport = async () => {
    //Usar o try e catch para tratar erros
    try {
      // Alterar para true e apresentar o loading
      setLoading(true);

      const token = await AsyncStorage.getItem("@token");

      await api
        .get(`home`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          //   console.log(response.data);
          setTotalBalanceValue(response.data.totalBalanceValue);
          setReportMonth(response.data.reportMonth);
          setTotalBillValue(response.data.totalBillValue);
          setBillsDueToday(response.data.billsDueToday);
          setOverdueBills(response.data.overdueBills);
        })
        .catch((err) => {
          //Acessa o catch quando houver um erro no try
          if (err.response) {
            //Acessa o if quanto existir a mensagem de erro

            const errors = err.response?.data?.erros;
            setErrors(errors);
          } else {
            //Acessa o ELSE quando não existir a mensagem de erro
            Alert.alert("Ops", "Erro: tente novamente!");
          }
        });

      //Permanece no try se nao houver erro
    } catch (error) {
      // Acessa o catch quando houver erro no try
      if (error.errors) {
        // Acessa o IF quando existir a mensagem de erro
        Alert.alert("Ops", error.errors[0]);
      } else {
        // Acessa o ELSE quando não existir a mensagem de erro
        Alert.alert("Ops", "Erro: Tente novamente!");
      }
    } finally {
      // Alterar para false e ocultar loading
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getReport();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Container>
        {/* Usar o componente para apresentar as mensagens de erro retornadas na API. */}
        <ErrorAlert errors={errors} />
        <List>
          <RowDataHome>
            <SpaceBetweenHome>
              <TextHome>Saldo das contas</TextHome>
              <ValueHome>
                <CurrencyFormatter value={totalBalanceValue ?? 0} />
              </ValueHome>
            </SpaceBetweenHome>
          </RowDataHome>
          <RowDataHome>
            <SpaceBetweenHome>
              <TextHome>Gastos de hoje</TextHome>
              <ValueHome>
                <CurrencyFormatter value={totalBillValue ?? 0} />
              </ValueHome>
            </SpaceBetweenHome>
          </RowDataHome>
          <RowDataHome>
            <SpaceBetweenHome>
              <TextHome>Visão geral do mês</TextHome>
              <ValueHome>
                {reportMonth.year_month ? reportMonth.year_month : 0}
              </ValueHome>
            </SpaceBetweenHome>

            <SpaceBetweenHome>
              <TextHome>Receitas</TextHome>
              <ValueHome>
                <CurrencyFormatter value={reportMonth.month_revenue ?? 0} />
              </ValueHome>
            </SpaceBetweenHome>

            <SpaceBetweenHome>
              <TextHome>Despesas</TextHome>
              <ValueHome>
                <CurrencyFormatter value={reportMonth.month_expense ?? 0} />
              </ValueHome>
            </SpaceBetweenHome>

            <SpaceBetweenHome>
              <TextHome>Despesas no crédito</TextHome>
              <ValueHome>
                <CurrencyFormatter
                  value={reportMonth.month_expense_credit ?? 0}
                />
              </ValueHome>
            </SpaceBetweenHome>
          </RowDataHome>
          /* Apresentar as contas a pagar com vencimento para hoje */
          <RowDataHome>
            <SpaceBetweenHome>
              <TextHome>Vencimentos hoje:</TextHome>
            </SpaceBetweenHome>
            {/* Ler a lista de contas a pagar com vencimento para hoje e apresentar na tela */}
            {billsDueToday.length > 0 ? (
              billsDueToday.map((billDueToday) => (
                //Retornar o componente com o nome e valor da conta
                <SpaceBetweenHome key={billDueToday.id}>
                  <VerticalBarContent
                    color={billDueToday.bill_situation.color.hexadecimal}
                  />
                  <TextHome>{billDueToday.name}</TextHome>
                  <ValueHomeContent
                    color={billDueToday.bill_situation.color.hexadecimal}
                  >
                    <CurrencyFormatter value={billDueToday.bill_value ?? 0} />
                  </ValueHomeContent>
                </SpaceBetweenHome>
              ))
            ) : (
              <SpaceBetweenHome>
                <TextHome>Nenhuma conta vencendo hoje</TextHome>
              </SpaceBetweenHome>
            )}
          </RowDataHome>
          /* Apresentar as contas já vencidas */
          <RowDataHome>
            <SpaceBetweenHome>
              <TextHome>Vencidas</TextHome>
            </SpaceBetweenHome>
            {/* Ler a lista de contas vencidas e apresentar na tela */}
            {overdueBills.length > 0 ? (
              overdueBills.map((overdueBill) => (
                //Retornar o componente com o nome e valor da conta
                <SpaceBetweenHome key={overdueBill.id}>
                  <VerticalBarContent
                    color={overdueBill.bill_situation.color.hexadecimal}
                  />
                  <TextHome>{overdueBill.name}</TextHome>
                  <ValueHomeContent
                    color={overdueBill.bill_situation.color.hexadecimal}
                  >
                    <CurrencyFormatter value={overdueBill.bill_value ?? 0} />
                  </ValueHomeContent>
                </SpaceBetweenHome>
              ))
            ) : (
              <SpaceBetweenHome>
                <TextHome>Nenhuma conta vencendo hoje</TextHome>
              </SpaceBetweenHome>
            )}
          </RowDataHome>
          {/* Apresentar o loading */}
          {loading && <Loading />}
        </List>
      </Container>
    </ScrollView>
  );
}
