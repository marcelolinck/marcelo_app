import { Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  BtnSubmitForm,
  BtnSubmitPressedForm,
  ContainerLogin,
  ImageLogo,
  InputForm,
  LinkLogin,
  Logo,
  TxtSubmitForm,
} from "../../styles/custom";

//Validar os dados do formulário
import * as yup from "yup";

//useState - Adicionar o estado a um componente
import { useState } from "react";

//Importar  o componente para apresentar carregando
import Loading from "../../components/Loading";

//Arquivo com as configurações da API
import api from "../../config/api";

//Importar o componente para apresentar o alerta com as mensagens de erro retornadas da API.
import ErrorAlert from "../../components/ErrorAlert";

export default function RecoverPassword() {
  //Navegar entre as telas
  const Navigation = useNavigation();

  //Informacoes do usuário
  const [email, setEmail] = useState("");

  //Importando o loading para exibir ao efetuar o login
  const [loading, setLoading] = useState(false);

  //Informações usadas quando der erro
  const [errors, setErrors] = useState(null);

  //Neste ponto estamos processando os dados do formulário submetido
  const recoveryPass = async () => {
    //Usar try catch para gerenciar a exceção/erro
    try {
      //Permacence no tru se nao houver nenhum erro

      //Alterar o loading para TRUE e apresentar o loading

      //Funcao para validar o formulario com yup
      await validationSchema.validate({ email }, { abortEarly: false });

      setLoading(true);

      //Requisição para a API indicando a rota e os dados
      await api
        .post("forgot-password-code", { email })
        .then((response) => {
          //Acessar o then quanto a API retornar o status sucesso.

          Alert.alert("Sucesso", response.data.message);
          //Redirecionar o usuário para a pagina de validação do codigo enviado por e-mail
          Navigation.navigate("VerifyKey");
        })
        .catch((err) => {
          if (err.response) {
            // Acessa o IF quando a API retornar erro
            Alert.alert("Ops", err.response.data.message);
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
      //Alterar o loading para false após o processamento
      setLoading(false);
    }
  };

  //Funcao que valida o formulário com yup
  const validationSchema = yup.object().shape({
    email: yup
      .string("Necessário preencher o campo e-mail!")
      .required("Necessário preencher o campo e-mail!")
      .email("Necessário informar um e-mail válido"),
  });

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ContainerLogin>
        {/* Usar o componente para apresentar as mensagens de erro retornadas na API. */}
        <ErrorAlert errors={errors} />

        {/* View para carregamento do logo */}
        <Logo>
          <ImageLogo
            source={require("../../../assets/logo1.png")}
            resizeMode="stretch"
          />
        </Logo>
        {/* Campo de E-mail */}
        <InputForm
          placeholder="E-mail cadastrado"
          autoCorrect={false}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {/* Criar o botão para submeter/enviar os dados do formulário */}
        <BtnSubmitForm
          disabled={loading}
          onPress={recoveryPass}
          style={({ pressed }) => BtnSubmitPressedForm(pressed)}
        >
          <TxtSubmitForm>Recuperar</TxtSubmitForm>
        </BtnSubmitForm>
        {/* Link para a rota login */}
        <LinkLogin onPress={() => Navigation.navigate("Login")}>
          Login
        </LinkLogin>
        {loading && <Loading />}
      </ContainerLogin>
    </ScrollView>
  );
}
