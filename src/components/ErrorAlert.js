//UseEffect - Cria efeitos colaterais em componentes funcionais.
import { useEffect } from "react";

//Incluir os componentes utilizado para estruturar o conteúdo.
import { Alert } from "react-native";

//Criar e exportar a função
//A função recebe os errors
const ErrorAlert = ({ errors }) => {
  //Executar a exibição do alerta sempre que a prop errors mudar.

  useEffect(() => {
    //Acessa o IF quando existir erros a serem exibidos
    if (errors) {
      //Iteração sobre as chaves do objeto errors
      //Object.keys(errors) retornar uma matriz das chaves do objeto errors
      //.map(key => errors[key]) iterar sobre cada chave e obtém o valor correspondente(a mensagem de erro).
      //join('\n') jntar todas as mensagens de erro com uma quebra de linha
      const messages = Object.keys(errors)
        .map((key) => errors[key])
        .join("\n");

      //Exibir o alerta com a mensagem formatada
      Alert.alert("Ops", messages.trim());
    }
  }, [errors]);
  // null - indicar que o componente não renderiza nenhum elemento visual na tela, em vista que é só uma mensagen de erro e deve ficar no mesmo local
  return null;
};

export default ErrorAlert;
