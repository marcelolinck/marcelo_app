//UseState - Adicionar estado ao componente
import { useState } from "react";

//Incluir o componente scrollview para rolar a tela.
import { Alert, ScrollView } from "react-native";

//Validar os dados do formulário
import * as yup from "yup";

//Arquivo com as configurações da API
import api from "../../config/api";

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

//Importar o componente para apresentar o alerta com as mensagens de erro retornadas da API.
import ErrorAlert from "../../components/ErrorAlert";

//Importar  o componente para apresentar carregando
import Loading from "../../components/Loading";

//importando o componente resposavel pela navegacao entre telas.
import { useNavigation } from "@react-navigation/native";

export default function VerifyKey() {
  //Navegar entre as telas
  const Navigation = useNavigation();

  //Informacoes do usuário
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Essa variavel será true somente quando a chave/codigo for válido.
  const [formNewPassword, setFormNewPassword] = useState(false);

  //Informações usadas quando der erro
  const [errors, setErrors] = useState(null);

  //Importando o loading para exibir ao efetuar o login
  const [loading, setLoading] = useState(false);

  //Neste ponto estamos processando os dados do formulário submetido
  const verifyKey = async () => {
    //Usar try catch para gerenciar a exceção/erro
    try {
      //Permacence no true se nao houver nenhum erro

      //Alterar o loading para TRUE e apresentar o loading
      setLoading(true);

      //Funcao para validar o formulario com yup
     // await validationSchema.validate({ code, email }, { abortEarly: false });

      //Requisição para a API indicando a rita e os dadis
      await api
        .post("reset-password-validate-code", { code, email })
        .then((response) => {
          // //Acessar o then quanto a API retornar o status sucesso.

          // Alert.alert("Sucesso", response.data.message);
          //Nesse momento irá apresentar o formulário de troca de senha
          setFormNewPassword(true);
        })
        .catch((err) => {
          //Acessar o cacth quando a api retornar status sucesso.
      
          if (err.response) {//Acessa o IF quando a API retornar erro
            
            //Recebe os erros da api e atribui na constante errors
            const errors = err.response?.data?.erros;

            setErrors(errors);
          } else {
            //Acessa o ELSE quando a API não responder.
            Alert.alert("Ops!", "Erro, tente novamente!");
          }
        });
    } catch (error) {
      //Acessar o catch quando a api retornar status de erro.

      //Acessa o catch quando houver um erro no try
      if (error.errors) {
        //Acessa o if quanto existir a mensagem de erro
        Alert.alert("Ops", error.errors[0]);
      } else {
        //Acessa o ELSE quando não existir a mensagem de erro
        Alert.alert("Ops", "Erro: tente novamente!");
      }
    } finally {
      //Alterar o loading para false após o processamento
      setLoading(false);
    }
  };

  //Processar e submenter o formulário de editar senha
  const editPassword = async () => {
    //Usar try catch para gerenciar a exceção/erro
    try {
      //Permacence no true se nao houver nenhum erro

      //Alterar o loading para TRUE e apresentar o loading
      setLoading(true);

      //Funcao para validar o formulario com yup
    //  await validationSchemaPassword.validate({ password },{ abortEarly: false });

      //Requisicao para a aAPI indicando a rota e os dados
      await api
        //A partir daqui estamos enviando os dados setados no formulário para a API, claro os valores de email e code já foram validados.
        .post("reset-password-code", { email, code, password })
        .then((response) => {
          Alert.alert("Sucesso", response.data.message);

          // Redireciona para a tela de login quanto tiver sucesso na atualizacao da senha
          Navigation.navigate("Login");
        })
        .catch((err) => {
          //Acessar o catch quando a api retornar status de erro.
          //Recebe os erros da api e atribui na constante errors

          if (err.response) {
            const errors = err.response?.data?.erros;
      
            setErrors(errors);
          } else {
            //Acessa o ELSE quando a API não responder.
            Alert.alert("Ops!", "Erro, tente novamente!");
          }
        });
    } catch (error) {

      //Acessa o catch quando houver um erro no try
      if (error.errors) {
        //Acessa o if quanto existir a mensagem de erro
        Alert.alert("Ops", error.errors[0]);
      } else { //Acessa o ELSE quando não existir a mensagem de erro
        Alert.alert("Ops", "Erro: tente novamente!");
      }
    } finally {
      //Alterar o loading para false após o processamento
      setLoading(false);
    }
  };

  //Funcao que valida a senha do formulário com yup
  const validationSchemaPassword = yup.object().shape({
    password: yup
      .string("Necessário preencher o campo da senha!")
      .required("Necessário preencher o campo da senha!")
      .min(8, "A senha deve ter no mínimo 8 caracteres!"),
  });

  //Funcao que valida o formulário com yup
  const validationSchema = yup.object().shape({
    email: yup
      .string("Necessário preencher o campo e-mail!")
      .required("Necessário preencher o campo e-mail!")
      .email("Necessário informar um e-mail válido"),
    code: yup
      .string("Necessário preencher o campo código!")
      .required("Necessário preencher o campo código!"),
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

        {/* Se formNewPassword for TRUE, carrega o formulário nova senha */}
        {formNewPassword ? (
          <>
            {/* Campo de senha */}
            <InputForm
              placeholder="Senha com no mínimo 8 caracteres"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              editable={!loading}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            {/* Botão para submenter o formulário */}
            <BtnSubmitForm
              disabled={loading}
              onPress={editPassword}
              style={({ pressed }) => BtnSubmitPressedForm(pressed)}
            >
              <TxtSubmitForm>Salvar</TxtSubmitForm>
            </BtnSubmitForm>
          </>
        ) : (
          <>
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

            {/* Campo para validar o token enviado ao usuário */}
            <InputForm
              placeholder="Código de verificação"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              editable={!loading}
              value={code}
              onChangeText={(text) => setCode(text)}
            />

            {/* Botão para submenter o formulário */}
            <BtnSubmitForm
              disabled={loading}
              onPress={verifyKey}
              style={({ pressed }) => BtnSubmitPressedForm(pressed)}
            >
              <TxtSubmitForm>Validar</TxtSubmitForm>
            </BtnSubmitForm>
          </>
        )}

        {/* Link para novo usuario */}
        <LinkLogin onPress={() => Navigation.navigate("Login")}>
          Login
        </LinkLogin>

        {loading && <Loading />}
      </ContainerLogin>
    </ScrollView>
  );
}
