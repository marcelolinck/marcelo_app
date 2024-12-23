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
import api from "../../config/api";

export default function Login() {
  // Navegar entre as telas
  const Navigation = useNavigation();

  // Armazenar as informacoes do usuário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = async () => {
    //Alert.alert('Sucesso', `E-mail: ${email}\nSenha: ${password}`);
    await api
      .post("/login", { email, password })
      .then((response) => {
        //console.log(response)

        Alert.alert("Sucesso", response.data.user.email)
      })
      .catch((err) => {
        // console.log(err.response);

        if (err.response) {
            Alert.alert("Ops!", err.response.data.message)
        }else
        {
          Alert.alert("Ops!", "Erro, tente novamente!")
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require("../../../assets/logo1.png")}
          resizeMode="stretch"
        />
      </View>
      <TextInput
        placeholder="Usuário"
        style={styles.inputform}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.inputform}
        placeholder="Senha"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.btnSubmitForm} onPress={loginSubmit}>
        <Text style={styles.txtSubmitForm}>Acessar</Text>
      </TouchableOpacity>

      <Text
        style={styles.linkLogin}
        onPress={() => Navigation.navigate("NewUser")}
      >
        Cadastrar
      </Text>
      <Text
        style={styles.linkLogin}
        onPress={() => Navigation.navigate("RecoverPassword")}
      >
        Recuperar Senha
      </Text>
    </View>
  );
}

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
