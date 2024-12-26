import { Alert, ScrollView } from "react-native";
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
  const [errors, setErrors] = useState(null);

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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ContainerLogin>
        <ErrorAlert errors={errors} />
        {/* View para carregamento do logo */}
        <Logo>
          <ImageLogo
            source={require("../../../assets/logo1.png")}
            resizeMode="stretch"
          />
        </Logo>
        {/* Campo de usuáro */}
        <InputForm
          placeholder="Nome completo"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        {/* Campo de usuáro */}
        <InputForm
          placeholder="Melhor e-mail"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {/* Campo de senha */}
        <InputForm
          placeholder="Senha com no mínimo 6 caracteres"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {/* Criar o botão para submeter/enviar os dados do formulário */}
        <BtnSubmitForm onPress={() => addUser()}>
          <TxtSubmitForm>Acessar</TxtSubmitForm>
        </BtnSubmitForm>

        {/* Link para a tela de login */}
        <LinkLogin onPress={() => Navigation.navigate("Login")}>
          Login
        </LinkLogin>
      </ContainerLogin>
    </ScrollView>
  );
}
