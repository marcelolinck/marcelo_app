import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

//Arquivo com as configurações da API
import api from "../../config/api";

import * as yup from "yup";

export default function Login() {
  // Navegar entre as telas
  const Navigation = useNavigation();

  // Armazenar as informacoes do usuário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = async () => {
    //Funcao para validar o formulario com js puro
    //if (!validate()) return;

    try {
      //Funcao para validar o formulario com yup
      await validationSchema.validate(
        { email, password },
        { abortEarly: false }
      );

      //Requisicao para a API indicand a rota e os dados
      await api
        .post("/login", { email, password })
        .then((response) => {
          console.log(response);

          Alert.alert("Sucesso", response.data.user.email);
        })
        .catch((err) => {
          //Acessar o cacth quando a api retornar status sucesso.
          console.log(err.response);

          if (err.response) {
            //Acessa o IF quando a API retornar erro
            Alert.alert("Ops!", err.response.data.message);
          } else {
            //Acessa o ELSE quando a API não responder.
            Alert.alert("Ops!", "Erro, tente novamente!");
          }
        });
    } catch (error) {
      //Acessa o catch se o houver erro no try
      Alert.alert("Ops!", error.errors[0]);
    }
  };

  //Funcao que valida o formulário
  // const validate  = () =>{
  //   if(!email){
  //     Alert.alert("Ops", "Erro: necessário preencher o campo do e-mail")
  //     return false;
  //   }
  //   if(!password){
  //     Alert.alert("Ops", "Erro: necessário preencher o campo de senha")
  //     return false;
  //   }
  //   return true
  // }

  //Funcao que valida o formulário com yup
  const validationSchema = yup.object().shape({
    email: yup
      .string("Necessário preencher o campo usuário!")
      .required("Necessário preencher o campo usuário!")
      .email("Necessário informar um e-mail válido"),
    password: yup
      .string("Necessário preencher o campo da senha!")
      .required("Necessário preencher o campo da senha!"),
  });

  return (
    <View style={styles.container}>
      {/* View para carregamento do logo */}
      <View style={styles.logo}>
        <Image
          source={require("../../../assets/logo1.png")}
          resizeMode="stretch"
        />
      </View>

      {/* Campo de usuáro */}
      <TextInput
        placeholder="Usuário"
        style={styles.inputform}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {/* Campo de senha */}
      <TextInput
        style={styles.inputform}
        placeholder="Senha"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {/* Criar o botão para submeter/enviar os dados do formulário */}
      <TouchableOpacity style={styles.btnSubmitForm} onPress={loginSubmit}>
        <Text style={styles.txtSubmitForm}>Acessar</Text>
      </TouchableOpacity>
      
      {/* Link para novo usuario */}
      <Text
        style={styles.linkLogin}
        onPress={() => Navigation.navigate("NewUser")}
      >
        Cadastrar
      </Text>
      {/* Link para recuperar a senha */}
      <Text
        style={styles.linkLogin}
        onPress={() => Navigation.navigate("RecoverPassword")}
      >
        Recuperar Senha
      </Text>
    </View>
  );
}
// Personalizar a tela de login com css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10101c",
  },
  logo: {
    paddingBottom: 20,
  },
  inputform: {
    backgroundColor: "#f5f5f5",
    width: "90%",
    marginBottom: 15,
    color: "#10101c",
    fontSize: 18,
    borderRadius: 6,
    padding: 10,
  },
  btnSubmitForm: {
    backgroundColor: "#1f51fe",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  txtSubmitForm: {
    color: "#f5f5f5",
    fontSize: 18,
  },
  linkLogin: {
    color: "#1f51fe",
    marginTop: 10,
    fontSize: 18,
  },
});
