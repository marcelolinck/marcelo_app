//useContext - compartilhar dados entre as páginas
//useState - Adicionar o estado a um componente
import { useContext, useState } from "react";

//Importando o loading para exibir ao efetuar o login
import Loading from "../../components/Loading";

//Incluido o AsyncStorage para armazenar dados no local.
import AsyncStorage from "@react-native-async-storage/async-storage";

//Importar o context para verificar se o usuário está logado
import { AuthContext } from "../../contexts/authContext";

//Pacote responsavel pela navegacao entre telas
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
  BtnSubmitPressedForm,
} from "../../styles/custom";


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

  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  const loginSubmit = async () => {
    //Funcao para validar o formulario com js puro
    //if (!validate()) return;

    try {
      //Funcao para validar o formulario com yup
      await validationSchema.validate(
        { email, password },
        { abortEarly: false }
      );

      //Alterar o loading para TRUE e apresentar o loading
      setLoading(true);

      //Requisicao para a API indicand a rota e os dados
      await api
        .post("/login", { email, password })
        .then((response) => {
          console.log(response);

          //  Alert.alert("Sucesso", response.data.user.email);

          //Salvar os dados no AsyncStorage para recuperar no futuro
          AsyncStorage.setItem("@token", response.data.token);
          AsyncStorage.setItem("@name", response.data.user.name);
          AsyncStorage.setItem("@email", response.data.user.email);

          //Chamar a funcao que está no memo e no context

          signIn();
          // Redirecionar para a pagina de login
          // Navigation.navigate("Home");
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
    } finally {
      //Alterar o loading para false após o processamento
      setLoading(false);
    }
  };

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
          editable={!loading}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {/* Campo de senha */}
        <InputForm
          placeholder="Senha"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          editable={!loading}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        {/* Criar o botão para submeter/enviar os dados do formulário */}
        <BtnSubmitForm
          onPress={loginSubmit}
          disabled={loading}
          style={({ pressed }) => BtnSubmitPressedForm(pressed)}
        >
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

        {loading && <Loading />}
      </ContainerLogin>
    </ScrollView>
  );
}
