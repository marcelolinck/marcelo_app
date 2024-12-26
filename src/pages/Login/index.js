import { useNavigation } from "@react-navigation/native";

//Importar o arquivo com os componentes css
import {
  ContainerLogin,
  ImageLogo,
  InputForm,
  Logo,
  BtnSubmitForm,
  TxtSubmitForm,
  LinkLogin,
} from "../../styles/custom";

//useState - Adicionar o estado a um componente
import { useState } from "react";
import { Alert, ScrollView } from "react-native";

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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ContainerLogin>
        {/* View para carregamento do logo */}
        <Logo>
          <ImageLogo
            source={require("../../../assets/logo1.png")}
            resizeMode="stretch"
          />
        </Logo>

        {/* Campo de usuáro */}
        <InputForm
          placeholder="Usuário"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {/* Campo de senha */}
        <InputForm
          placeholder="Senha"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        {/* Criar o botão para submeter/enviar os dados do formulário */}
        <BtnSubmitForm onPress={loginSubmit}>
          <TxtSubmitForm>Acessar</TxtSubmitForm>
        </BtnSubmitForm>

        {/* Link para novo usuario */}
        <LinkLogin onPress={() => Navigation.navigate("NewUser")}>
          Cadastrar
        </LinkLogin>
        {/* Link para recuperar a senha */}
        <LinkLogin onPress={() => Navigation.navigate("RecoverPassword")}>
          Recuperar Senha
        </LinkLogin>
      </ContainerLogin>
    </ScrollView>
  );
}
