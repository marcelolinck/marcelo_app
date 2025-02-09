//import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Image } from "react-native";

export default function UserIcon() {
  
  //  const navigation = useNavigation();
  
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
      <Image
        source={require("../../assets/logo.png")}
        style={{ width: 40, height: 40, marginRight: 10 }}
      />
    </TouchableOpacity>
  );
}
