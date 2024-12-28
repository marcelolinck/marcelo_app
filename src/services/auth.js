//Incluido o AsyncStorage para armazenar dados no local.
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../config/api";

//Arquivo com as configurações da API

//Recuperar o token e validar ele
export const getValToken = async () => {
  //Chamar a funcao validar Token
  await valTokenUser();
  
  //Recuperar o token do AsyncStorage
  const valueToken = await AsyncStorage.getItem("@token");

  //Agora é necessário verificar se há um token
  if (valueToken !== null) {
    return valueToken;
  } else {
    return null;
  }
};

const valTokenUser = async () => {
  //Recuperar o token do AsyncStorage
  const valueToken = await AsyncStorage.getItem("@token");

  const headers = {
    headers: {
      Authorization: `Bearer ${valueToken}`,
      //   Authorization: `Bearer 45`,
    },
  };

  await api
    .post("validate-token", {}, headers)
    .then((response) => {
      //Acessar o then quando a API retornar status sucesso

      //Receber o token atualizado da API
      // AsyncStorage.setItem("@token", response.data.token);
      //Salvar os dados no AsyncStorage
      AsyncStorage.setItem("@name", response.data.user.name);
      AsyncStorage.setItem("@email", response.data.user.email);
    })
    .catch((err) => {
      //Remover os dados do AsyncStorage em caso de falha
      AsyncStorage.removeItem("@token");
      AsyncStorage.removeItem("@name");
      AsyncStorage.removeItem("@email");

      //Acessar o then quando a API retornar status sucesso
      if (err.response) {
        //Acessa o IF quando a API retornar erro
        Alert.alert("Ops!", err.response.data.message);
      } else {
        //Acessa o ELSE quando a API não responder.
        Alert.alert("Ops!", "Erro, tente novamente!");
      }
    });
};
