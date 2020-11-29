import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreenStack from "./HomeStack";
import ProfileScreen from "../screens/ProfileScreen";
const AppDrawer = createDrawerNavigator();

const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="HomeTab" component={HomeScreenStack} options={{ headerShown: false }} />
      <AppDrawer.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </AppDrawer.Navigator>
  );
};
export default AppDrawerScreen;