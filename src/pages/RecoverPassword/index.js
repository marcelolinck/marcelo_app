import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RecoverPassword() {

  const Navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        Screen RecoverPassword
      </Text>
      <Text onPress={() =>{Navigation.navigate('Login')}}>Login</Text>
    </View>
  );
}
