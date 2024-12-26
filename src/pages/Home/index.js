//UseEffect - Cria efeitos colaterais em componentes funcionais.
import { useEffect, useState } from "react";

//Incluir os componentes utilizados para estruturar o conteudo
import { View, Text } from "react-native";

//Incluido o AsyncStorage para armazenar dados no local.
import AsyncStorage from "@react-native-async-storage/async-storage";

//Funcao responsavel pela navegacao entre páginas
import { useNavigation } from "@react-navigation/native";

//Criar e exportar a funcao com a tela Dashboard
export default function Home() {
  //Navegar entre telas
  const Navigation = useNavigation();

  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const getToken = async () => {
    const valToken = await AsyncStorage.getItem("@token");
    const valName = await AsyncStorage.getItem("@name");
    const valEmail = await AsyncStorage.getItem("@email");

    setToken(valToken);
    setName(valName);
    setEmail(valEmail);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Dashboard</Text>
      <Text></Text>
      
      <Text>Token:{token} </Text>
      <Text>Nome: {name}</Text>
      <Text>E-mail: {email}</Text>
      
      <Text></Text>
      <Text
        onPress={() => {
          Navigation.navigate("Login");
        }}
      >
        Login
      </Text>
    </View>
  );
}