import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//useState - Adicionar o estado ao componente
import { useState } from "react";

import * as yup from "yup";
//Arquivo com as configurações da API
import api from "../../config/api";
import ErrorAlert from "../../components/ErrorAlert";

export default function NewUser() {
  const Navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null)

  const addUser = async () => {
    //Usar o try e catch para gerenciar exceção/erro
    try {
      //Funcao para validar o formulario com yup
      await validationSchema.validate(
        { name, email, password },
        { abortEarly: false }
      );
      //Requisicao para a aAPI indicando a rota e os dados
      await api
        .post("register", { name, email, password })
        .then((response) => {
          Alert.alert("Sucesso", response.data.message);

          Navigation.navigate("Login");
        })
        .catch((err) => {//Acessar o catch quando a api retornar status de erro.
          //Recebe os erros da api e atribui na constante errors
          
          if (err.response) {
            const errors = err.response?.data?.erros;

            setErrors(errors)

          } else {
            //Acessa o ELSE quando a API não responder.
            Alert.alert("Ops!", "Erro, tente novamente!");
          }
        });

      //Permanece no try se não houver nenhum erro
    } catch (error) {
      //Acessa o catch quando houver um erro no try
      if (error.errors) {
        //Acessa o if quanto existir a mensagem de erro
        Alert.alert("Ops", error.errors[0]);
      } else {
        Alert.alert("Ops", "Erro: tente novamente!");
      }
    }
  };

  //Funcao que valida o formulário com yup
  const validationSchema = yup.object().shape({
    name: yup
      .string("Necessário preencher o campo nome!")
      .required("Necessário preencher o campo nome!"),
    email: yup
      .string("Necessário preencher o campo e-mail!")
      .required("Necessário preencher o campo e-mail!")
      .email("Necessário informar um e-mail válido"),
    password: yup
      .string("Necessário preencher o campo da senha!")
      .required("Necessário preencher o campo da senha!")
      .min(8, "A senha deve ter no mínimo 8 caracteres!"),
  });

  return (
    <View style={styles.container}>
      <ErrorAlert  errors={errors} />
      {/* View para carregamento do logo */}
      <View style={styles.logo}>
        <Image
          source={require("../../../assets/logo1.png")}
          resizeMode="stretch"
        />
      </View>
      {/* Campo de usuáro */}
      <TextInput
        placeholder="Nome completo"
        style={styles.inputform}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      {/* Campo de usuáro */}
      <TextInput
        placeholder="Melhor e-mail"
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
        placeholder="Senha com no mínimo 6 caracteres"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {/* Criar o botão para submeter/enviar os dados do formulário */}
      <TouchableOpacity style={styles.btnSubmitForm} onPress={() => addUser()}>
        <Text style={styles.txtSubmitForm}>Acessar</Text>
      </TouchableOpacity>

      {/* Link para a tela de login */}
      <Text
        style={styles.linkLogin}
        onPress={() => Navigation.navigate("Login")}
      >
        Login
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
