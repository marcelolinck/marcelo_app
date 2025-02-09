import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../pages/Home";
import Billys from "../pages/Billys";
import Revenues from "../pages/Revenues";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: "Home",
          
        }}
      />
      <Drawer.Screen name="Billys" component={Billys} 
      options={{
        drawerLabel: "Contas",
      }}
      />
      <Drawer.Screen name="Revenues" component={Revenues} 
      options={{
        drawerLabel: "Receitas",
      }}/>
    </Drawer.Navigator>
  );
}
