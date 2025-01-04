//useState - Adicionar e alterar os estados dos componentes.
//useMemo - Memorizar o componente e só executar se tiver algum valor do componente alterado.
import { useEffect, useMemo, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";

//Incluir AsyncStorage para armazenar dados
import AsyncStorage from "@react-native-async-storage/async-storage";

//Importar a função validar Token
import { getValToken } from "./services/auth";

//Importar a funcão remover token
import { logoutRemoveToken } from "./services/logout";

//Gerenciar a navegação entre telas.
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./pages/Login";
import NewUser from "./pages/NewUser";
import RecoverPassword from "./pages/RecoverPassword";
import Home from "./pages/Home";

//Importar o context e verificar se o usuário está logado
import { AuthContext } from "./contexts/authContext";

const Stack = createNativeStackNavigator();

export default function Routes() {
  //Alterar as informacoes do usuario
  const [userToken, setUSerToken] = useState(null);

  //Usar o Memo para memorizar o componente e só executar se tiver o token alterado
  const authContext = useMemo(() => {
    return {
      //Criar uma funcao signIn para ser consumida por outras páginas.
      signIn: () => {
        //Recuperar o token que está no AsyncStorage
        const valToken = AsyncStorage.getItem("@token");
        setUSerToken(valToken);
      },

      //Rota para sair do login efetuado. Esta funcao deve excluir os dados autenticados do app, ou seha, o token
      signOut: async () => {
        await logoutRemoveToken();
        //Dessa forma estou setando o valor de null em que vai redirecionar o usuário para a tela de login
        setUSerToken(null);
      },
    };
  });

  //Verificar nesse momento se o usuário possui token e chamar a funcao validar token
  const getToken = async () => {
    try {
      //Chamar a função validar token
      const valToken = await getValToken();
      if (valToken !== null) {
        setUSerToken(valToken);
      } else {
        setUSerToken(null);
      }
    } catch (err) {
      setUSerToken(null);
    }
  };

  //Executar quando o usuário acessar a tela e chamar a função getToken
  useEffect(() => {
    getToken();
  }, []);

  return (
    // Compartilhar o context de login com todas as páginas
    <AuthContext.Provider value={authContext}>
      {/* Agrupar as rotas */}
      <NavigationContainer>
        {/* Aqui estou validando se o token é valido dai vai para a primeira tela da pilha */}
        {userToken ? (
          // Criar uma pilha de páginas
          <Stack.Navigator>
            {/* Carragando as telas da area restrita */}
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        ) : (
          // Criar uma pilha de páginas
          <Stack.Navigator>
            {/* Carrega as telas de login caso o usuário esteja com o token inválido */}
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="NewUser" component={NewUser} />
            <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
