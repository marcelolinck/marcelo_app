//useContext - compartilhar dados entre as páginas
import { useContext } from "react";

//Importar o context e verificar se o usuário está logado
import { AuthContext } from "../../contexts/authContext";

//Incluir os componentes utilizados para estruturar o conteudo
import { View, Text, Button } from "react-native";

//Criar e exportar a funcao com a tela Dashboard
export default function Home() {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Dashboard</Text>
      <Text></Text>

      <Button title="Sair" onPress={() => signOut()} />
    </View>
  );
}
