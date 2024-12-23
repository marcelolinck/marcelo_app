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

export default function Login() {
  // Navegar entre as telas
  const Navigation = useNavigation();

  // Armazenar as informacoes do usuário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = async () => {
    //Alert.alert('Sucesso', `E-mail: ${email}\nSenha: ${password}`);
    try {

      //Substituir o IP 192.168.0.14 pelo IP da maquina que está o aplicativo. Para encontrar o IP: ipconfig para windows ou ifconfig para Linux
       const response = await fetch('http://192.168.0.14:8000/api/login', {
        method: 'post',
        //Aqui estou enviando os dados para validar o email e senha recebidos dos campos abaixo e enviados a api
        body: JSON.stringify({email, password}),
        headers:{
          'Content-Type': 'application/json',
          'User-Agent': 'app/0.0.1'
        }
       })

       const result = await response.json();
       console.log(result);

       if (result.status) {
        Alert.alert("Sucesso", `Nome: ${result.user.name} - E-mail: ${result.user.email}`)
      } else {
         Alert.alert("Erro", result.message)
        
       }


    } catch (error) {
       Alert.alert('Erro', error.message);
    }
  }

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
