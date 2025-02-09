//useContext - compartilhar dados entre as páginas
import { useContext } from "react";

import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import Home from "../pages/Home";
import Billys from "../pages/Billys";
import Revenues from "../pages/Revenues";

//Importar o contexto de autenticação para verificar se o usuario está logado
import { AuthContext } from "../contexts/authContext";

const Drawer = createDrawerNavigator();


//Criar a função para sair do app
function DrawerSignOut(props) {
  const { signOut } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Sair" onPress={() => signOut()} />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (

    //Nesse caso, o DrawerNavigator vai receber o DrawerSignOut para que o usuário possa sair do app
    <Drawer.Navigator drawerContent={props => <DrawerSignOut {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen
        name="Billys"
        component={Billys}
        options={{
          drawerLabel: "Contas",
        }}
      />
      <Drawer.Screen
        name="Revenues"
        component={Revenues}
        options={{
          drawerLabel: "Receitas",
        }}
      />
    </Drawer.Navigator>
  );
}
