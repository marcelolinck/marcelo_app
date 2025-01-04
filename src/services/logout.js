//Incluir AsyncStorage para armazenar os dados

import AsyncStorage from "@react-native-async-storage/async-storage";

//Arquivo com as configurações da API
import api from "../config/api";

//Remover o token do aplicativo e do banco de dados
export const logoutRemoveToken = async () => {
  //Recuperar o token do AsyncStorage
  const valueToken = await AsyncStorage.getItem("@token");

  const headers = {
    headers: {
      Authorization: `Bearer ${valueToken}`,
    },
  };

  await api
    .post("logout", {}, headers)
    .then(() => {
      //Acessar o then quando a API retornar status sucesso
    })
    .catch((err) => {
      //Acessar o then quando a API retornar status sucesso
      if (err.response) {
        //Acessa o IF quando a API retornar erro
        Alert.alert("Ops!", err.response.data.message);
      } else {
        //Acessa o ELSE quando a API não responder.
        Alert.alert("Ops!", "Erro, tente novamente!");
      }
    });

  //Remover os dados do AsyncStorage
  AsyncStorage.removeItem("@token");
  AsyncStorage.removeItem("@name");
  AsyncStorage.removeItem("@email");
};
