import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeTabScreen from "./HomeTab";
import IndividualPostScreen from "./../screens/IndividualPost";
const HomeStack=createStackNavigator();
const HomeScreenStack=()=>{
    return(<HomeStack.Navigator initialRouteName="HomeTab">
      <HomeStack.Screen name="HomeTab"  component={HomeTabScreen}/>
      <HomeStack.Screen name="IndividualPost" component={IndividualPostScreen} options={{ headerShown: false }}/>
    </HomeStack.Navigator>)
  };

export default HomeScreenStack;