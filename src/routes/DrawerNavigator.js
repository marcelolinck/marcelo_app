//Importar o contexto de autenticação para verificar se o usuario está logado
import { AuthContext } from "../contexts/authContext";

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


//Importando icones do MaterialIcons
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

//
import UserIcon from "../components/UserIcon";

//useContext - compartilhar dados entre as páginas
import { useContext } from "react";


const Drawer = createDrawerNavigator();



//Criar a função para sair do app
function DrawerSignOut(props) {
  const { signOut } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Sair" onPress={() => signOut()} icon={()=>(
            <MaterialCommunityIcons
              name='logout'
              size={25}
              color='#1f51fe'
              style={{ marginRight: -5 }}
            />
          )} 
        />
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
          headerRight: () => <UserIcon />,
          drawerIcon: () => (
            <MaterialCommunityIcons
              name='home'
              size={25}
              color='#1f51fe'
              style={{ marginRight: -5 }}
            />
          ),
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen
        name="Billys"
        component={Billys}
        options={{
          headerRight: () => <UserIcon />,
          drawerIcon: () => (
            <MaterialCommunityIcons
              name='currency-usd-off'
              size={25}
              color='#1f51fe'
              style={{ marginRight: -5 }}
            />
          ),
          drawerLabel: "Contas",
        }}
      />
      <Drawer.Screen
        name="Revenues"
        component={Revenues}
        options={{
          headerRight: () => <UserIcon />,
          drawerIcon: () => (
            <MaterialCommunityIcons
              name='cash'
              size={25}
              color='#1f51fe'
              style={{ marginRight: -5 }}
            />
          ),
          drawerLabel: "Receitas",
        }}
      />
    </Drawer.Navigator>
  );
}
