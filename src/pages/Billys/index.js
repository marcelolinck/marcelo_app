

import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CurrencyFormatter from "../../utils/CurrencyFormatter";
import Loading from "../../components/Loading";
import formatDate from "../../utils/formatDate";
import api from "../../config/api";
import {
  Container,
  ContentSpaceBetweenHome,
  RowDataHome,
  SpaceBetweenBilly,
  TextHome,
  TextSubTitleBilly,
  ValueHomeContent,
  VerticalBarContent,
} from "../../styles/custom";
import ErrorAlert from "../../components/ErrorAlert";
import Paginate from "../../components/Paginate";

export default function Billys() {
  const [bills, setBills] = useState([]);
  const [errors, setErrors] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getBillys = async (page) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("@token");
      await api
        .get(`bills?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setBills(response.data.bills.data);
          setCurrentPage(response.data.bills.current_page);
          setLastPage(response.data.bills.last_page);
        })
        .catch((err) => {
          if (err.response) {
            const errors = err.response?.data?.erros;
            setErrors(errors);
          } else {
            Alert.alert("Ops", "Tente novamente!");
          }
        });
    } catch (error) {
      if (error.errors) {
        Alert.alert("Ops", error.errors[0]);
      } else {
        Alert.alert("Ops", "Erro: Tente novamente!");
      }
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getBillys(currentPage);
    }, [currentPage])
  );

  const handlePrevPage = (page) => {
    if (page < 1) page = 1;
    setCurrentPage(page);
  };

  const handleNextPage = (page) => {
    if (page > lastPage) page = lastPage;
    setCurrentPage(page);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Container>
        <ErrorAlert errors={errors} />

        {bills.map((bill) => (
          <RowDataHome key={bill.id}>
            <SpaceBetweenBilly>
              <VerticalBarContent
                color={bill.bill_situation.color.hexadecimal}
              />
              <ContentSpaceBetweenHome>
                <View>
                  <TextHome>Nome: {bill.name}</TextHome>
                  <TextSubTitleBilly>
                    Categoria: {bill.bill_category.name}
                  </TextSubTitleBilly>
                </View>
                <View>
                  <ValueHomeContent
                    color={bill.bill_situation.color.hexadecimal}
                  >
                    Valor: <CurrencyFormatter value={bill.bill_value} />
                  </ValueHomeContent>
                  <TextSubTitleBilly>{formatDate(bill.due_date)}</TextSubTitleBilly>
                </View>
              </ContentSpaceBetweenHome>
            </SpaceBetweenBilly>
          </RowDataHome>
        ))}
        <Paginate
          currentPage={currentPage}
          lastPage={lastPage}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
        {loading && <Loading />}
      </Container>
    </ScrollView>
  );
}
