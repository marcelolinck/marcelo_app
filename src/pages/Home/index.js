// useCallback - A função não será recriada a cada renderização, somente quando a dependências
// useState - Adicionar estado ao componente
import { useCallback, useState } from 'react';

// useFocusEffect para executar um efeito quando o componente recebe o foco
import { useFocusEffect } from '@react-navigation/native';

// Incluir os componentes utilizado para estruturar o conteúdo
import { Alert, ScrollView } from 'react-native';

// Importar o arquivo com os componentes CSS
import { Container, List, RowDataHome, SpaceBetweenHome, TextHome, TextHomeSuccess, ValueHome, ValueHomeContent, ValueHomeDanger, ValueHomeSuccess, ValueHomeWarning, VerticalBarContent } from '../../styles/custom';

// Importar o componente para apresentar o alerta com as mensagens de erro retornadas da API.
import ErrorAlert from '../../components/ErrorAlert';

// Importar o componente para formatar moeda.
import CurrencyFormatter from '../../utils/CurrencyFormatter';

// Importar o componente para apresentar carregando
import Loading from '../../components/Loading';

// Incluir AsyncStorage para armazenar dados
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importar a função para formatar moeda.
import formatCurrency from '../../utils/formatCurrency';

// Arquivo com as configurações da API
import api from '../../config/api';

// Criar e exportar a função com a tela dashboard
export default function Home() {

    // Armazenar as informações do relatório
    const [errors, setErrors] = useState(null);
    const [totalBalanceValue, setTotalBalanceValue] = useState("");
    const [reportMonth, setReportMonth] = useState({});
    const [totalBillValue, setTotalBillValue] = useState("");
    const [billsDueToday, setBillsDueToday] = useState([]);
    const [overdueBills, setOverdueBills] = useState([]);
    const [loading, setLoading] = useState(false);

    // Recuperar o relatório mensal
    const getReport = async () => {

        // Usar try e catch para gerenciar exceção/erro
        try { // Permanece no try se não houver nenhum erro

            // Alterar para TRUE e apresentar loading
            setLoading(true);

            // Recuperar o token
            const token = await AsyncStorage.getItem('@token');

            await api.get(`home`, {
                'headers': {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => { // Acessar o then quando a API retornar status sucesso

                // console.log(response.data);
                // Atribuir os dados retornado da API
                setTotalBalanceValue(formatCurrency(response.data.totalBalanceValue ?? 0));
                setReportMonth(response.data.reportMonth);
                setTotalBillValue(formatCurrency(response.data.totalBillValue ?? 0));
                setBillsDueToday(response.data.billsDueToday);
                setOverdueBills(response.data.overdueBills);


            }).catch((err) => { // Acessar o catch quando a API retornar status erro
                if (err.response) { // Acessa o IF quando a API retornar erro

                    // Receber os erros e atribuir à constante errors.
                    const errors = err.response?.data?.erros;

                    setErrors(errors)

                } else { // Acessa o ELSE quando a API não responder
                    Alert.alert("Ops", "Tente novamente!");
                }
            })

        } catch (error) { // Acessa o catch quando houver erro no try
            if (error.errors) { // Acessa o IF quando existir a mensagem de erro
                Alert.alert("Ops", error.errors[0]);
            } else { // Acessa o ELSE quando não existir a mensagem de erro
                Alert.alert("Ops", "Erro: Tente novamente!");
            }
        } finally {

            // Alterar para false e ocultar loading
            setLoading(false);
        }
    }

    // Executar quando o usuário carregar a tela e chamar a função getReport
    useFocusEffect(
        useCallback(() => {
            getReport();
        }, [])
    );


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

            <Container>

                {/* Usar o componente para apresentar as mensagens de erro retornadas da API. */}
                <ErrorAlert errors={errors} />

                <List>

                    <RowDataHome>
                        <SpaceBetweenHome>
                            <TextHome>
                                Saldo das contas
                            </TextHome>
                            <ValueHomeSuccess>
                                {totalBalanceValue ?? 0}
                            </ValueHomeSuccess>
                        </SpaceBetweenHome>
                    </RowDataHome>

                    <RowDataHome>
                        <SpaceBetweenHome>
                            <TextHome>
                                Gastos de hoje
                            </TextHome>
                            <ValueHomeDanger>
                                {totalBillValue ?? 0}
                            </ValueHomeDanger>
                        </SpaceBetweenHome>
                    </RowDataHome>

                    <RowDataHome>
                        <SpaceBetweenHome>
                            <TextHome>
                                Visão geral do mês
                            </TextHome>
                            <ValueHome>
                                {reportMonth.year_month ? reportMonth.year_month : ""}
                            </ValueHome>
                        </SpaceBetweenHome>

                        <SpaceBetweenHome>
                            <TextHome>
                                Receitas
                            </TextHome>
                            <ValueHomeSuccess>
                                <CurrencyFormatter value={reportMonth.month_revenue ?? 0} />
                            </ValueHomeSuccess>
                        </SpaceBetweenHome>

                        <SpaceBetweenHome>
                            <TextHome>
                                Despesas
                            </TextHome>
                            <ValueHomeDanger>
                                <CurrencyFormatter value={reportMonth.month_expense ?? 0} />
                            </ValueHomeDanger>
                        </SpaceBetweenHome>

                        <SpaceBetweenHome>
                            <TextHome>
                                Despesas no crédito
                            </TextHome>
                            <ValueHomeWarning>
                                <CurrencyFormatter value={reportMonth.month_expense_credit ?? 0} />
                            </ValueHomeWarning>
                        </SpaceBetweenHome>

                    </RowDataHome>

                    <RowDataHome>
                        <SpaceBetweenHome>
                            <TextHome>
                                Vencimento hoje
                            </TextHome>
                        </SpaceBetweenHome>
                        {billsDueToday.length > 0 ? (
                            // Ler a lista de contas com vencimento na data de hoje
                            billsDueToday.map((billDueToday) => (
                                <SpaceBetweenHome key={billDueToday.id}>
                                    <VerticalBarContent color={billDueToday.bill_situation.color.hexadecimal} />
                                    <TextHome>
                                        {billDueToday.name}
                                    </TextHome>
                                    <ValueHomeContent color={billDueToday.bill_situation.color.hexadecimal}>
                                        <CurrencyFormatter value={billDueToday.bill_value ?? 0} />
                                    </ValueHomeContent>
                                </SpaceBetweenHome>
                            ))
                        ) : (
                            <SpaceBetweenHome>
                                <TextHomeSuccess>
                                    Nenhuma conta vence hoje.
                                </TextHomeSuccess>
                            </SpaceBetweenHome>
                        )}
                    </RowDataHome>

                    <RowDataHome>
                        <SpaceBetweenHome>
                            <TextHome>
                                Vencidas
                            </TextHome>
                        </SpaceBetweenHome>
                        {overdueBills.length > 0 ? (
                            // Ler a lista de contas com vencimento na data de hoje
                            overdueBills.map((overdueBill) => (
                                <SpaceBetweenHome key={overdueBill.id}>
                                    <VerticalBarContent color={overdueBill.bill_situation.color.hexadecimal} />
                                    <TextHome>
                                        {overdueBill.name}
                                    </TextHome>
                                    <ValueHomeContent color={overdueBill.bill_situation.color.hexadecimal}>
                                        <CurrencyFormatter value={overdueBill.bill_value ?? 0} />
                                    </ValueHomeContent>
                                </SpaceBetweenHome>
                            ))
                        ) : (
                            <SpaceBetweenHome>
                                <TextHomeSuccess>
                                    Nenhuma conta vencida.
                                </TextHomeSuccess>
                            </SpaceBetweenHome>
                        )}
                    </RowDataHome>

                    {/* Apresentar o loading */}
                    {loading && <Loading />}

                </List>

            </Container>
        </ScrollView>
    )
}