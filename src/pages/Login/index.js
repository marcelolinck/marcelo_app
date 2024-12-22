import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native";

export default function Login() {

  const Navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        Login App
      </Text>

      <Button title="Cadastrar" onPress={()=> Navigation.navigate('NewUser')} color={'#007AFF'}/>
      <Button title="Recuperar Senha" onPress={()=> Navigation.navigate('RecoverPassword')} color={'#007AFF'}/>
    </View>
  );
}
