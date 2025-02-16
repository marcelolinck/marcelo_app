// useCallback - A função não será recriada a cada renderização, somente quando a dependências
// useState - Adicionar estado ao componente
import { useCallback, useState } from "react";

// useFocusEffect para executar um efeito quando o componente recebe o foco
import { useFocusEffect } from "@react-navigation/native";

// Incluir os componentes utilizado para estruturar o conteúdo
import { ScrollView, Text, View } from "react-native";

// Incluir AsyncStorage para armazenar dados
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importar o componente para formatar moeda.
import CurrencyFormatter from "../../utils/CurrencyFormatter";

// Importar o componente para apresentar carregando
import Loading from "../../components/Loading";

import api from "../../config/api";
import { Container, ContentSpaceBetweenHome, RowDataHome, SpaceBetweenBilly, TextHome, TextSubTitleBilly, ValueHomeContent, VerticalBarContent } from "../../styles/custom";
import ErrorAlert from "../../components/ErrorAlert";
import formatDate from "../../utils/formatDate";
import Paginate from "../../components/Paginate";

//Criar e exportar a funcao com a tela de receitas
export default function Revenues() {
  const [revenues, setRevenues] = useState([]);
  const [errors, setErrors] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [loading, setLoading] = useState(false);



  const getRevenues = async (page) => {
    // Usar try e catch para gerenciar exceção/erro
    try {// Permanece no try se não houver nenhum erro

      // Alterar para TRUE e apresentar loading
      setLoading(true);
      // Recuperar o token
      const token = await AsyncStorage.getItem("@token");

      // Fazer a requisição para a API e receber a lista de contas
      await api
        .get(`revenues?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Acessar o then quando a API retornar status sucesso

          // console.log(response.data.revenues.data);
          // Atribuir os dados retornado da API
          setRevenues(response.data.revenues.data);
          setCurrentPage(response.data.revenues.current_page);
          setLastPage(response.data.revenues.last_page);
        })
        .catch((err) => {
          // Acessar o catch quando a API retornar status erro
          if (err.response) {
            // Acessa o IF quando a API retornar erro

            // Receber os erros e atribuir à constante errors.
            const errors = err.response?.data?.erros;

            setErrors(errors);
          } else {
            // Acessa o ELSE quando a API não responder
            Alert.alert("Ops", "Tente novamente!");
          }
        });
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

  const handlePrevPage = (page) => {
    if (page < 1) page = 1;
    setCurrentPage(page);
  };

  const handleNextPage = (page) => {
    if (page > lastPage) page = lastPage;
    setCurrentPage(page);
  };

    // Executar quando o usuário carregar a tela e chamar a função getBillys
    useFocusEffect(
      useCallback(() => {
        getRevenues(currentPage);
      }, [currentPage])
    );

  
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Container>
        {/* Usar o componente para apresentar as mensagens de erro retornadas da API. */}
        <ErrorAlert errors={errors} />

        {/* Ler a lista de contas */}
        {revenues.map((revenue) => (
              <RowDataHome key={revenue.id}>
                <SpaceBetweenBilly>
                
                <ContentSpaceBetweenHome>
                  <View>
                    <TextHome>{revenue.name}</TextHome>
                    <TextSubTitleBilly>
                      {revenue.revenue_type.name}
                    </TextSubTitleBilly>
                  </View>
                  <View>
                    <ValueHomeContent >
                      <CurrencyFormatter value={revenue.amount} />
                    </ValueHomeContent>
                    <TextSubTitleBilly>
                      {formatDate(revenue.revenue_date)}
                    </TextSubTitleBilly>
                  </View>
                </ContentSpaceBetweenHome>
                </SpaceBetweenBilly>
            </RowDataHome>
        ))}

         {/* Apresentar a paginação */}
         <Paginate
          currentPage={currentPage}
          lastPage={lastPage}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />

        {/* Apresentar o loading */}
        {loading && <Loading />}
        </Container>
    </ScrollView>
)
}
