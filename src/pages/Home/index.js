//UseCallBack - A funcao nao sera recriada a cada renderizacao, somente quando as dependencias mudarem

// Importar o React e o useState
import { useCallback, useState } from "react";

//Importar o useFocusEffect para atualizar a tela sempre que ela for exibida ou o componente receber foco
import { useFocusEffect } from "@react-navigation/native";

//Incluir os componentes utilizados para estruturar o conteudo
import { View, Text, Alert } from "react-native";

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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Usar o componente para apresentar as mensagens de erro retornadas na API. */}
      <ErrorAlert errors={errors} />
      <Text>Relatório</Text>
      <Text></Text>
      <Text>
        Saldo das contas: R$ {totalBalanceValue ? totalBalanceValue : 0}
      </Text>
      <Text>Gastos de hoje: R$ {totalBillValue ? totalBillValue : 0}</Text>1
      <Text>
        Visão geral do mês: R${" "}
        {reportMonth.year_month ? reportMonth.year_month : 0}
      </Text>
      <Text>
        Receitas: R$ {reportMonth.month_revenue ? reportMonth.month_revenue : 0}
      </Text>
      <Text>
        Despesas: R$ {reportMonth.month_expense ? reportMonth.month_expense : 0}
      </Text>
      <Text>
        Despesas no crédito: R${" "}
        {reportMonth.month_expense_credit
          ? reportMonth.month_expense_credit
          : 0}
      </Text>
      <Text></Text>
      <Text>Vencimentos hoje:</Text>
      {/* Ler a lista de contas a pagar com vencimento para hoje e apresentar na tela */}
      {billsDueToday.map((billDueToday) => {
        //Retornar o componente com o nome e valor da conta
        return (
          <View key={billDueToday.id}>
            <Text>{`${billDueToday.name} R$ ${billDueToday.bill_value}`}</Text>
          </View>
        );
      })}
      <Text></Text>
      <Text></Text>
      {/* Ler a lista de contas vencidas e apresentar na tela */}
      <Text>Contas vencidas:</Text>
      {overdueBills.map((overdueBill) => {
        //Retornar o componente com o nome e valor da conta
        return (
          <View key={overdueBill.id}>
            <Text>{`${overdueBill.name} R$ ${overdueBill.bill_value}`}</Text>
          </View>
        );
      })}
      {/* Apresentar o loading */}
      {loading && <Loading />}
    </View>
  );
}
