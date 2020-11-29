import React, { useState } from "react";
import { View, StyleSheet} from "react-native";
import {AsyncStorage} from "@react-native-async-storage/async-storage";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "./../providers/AuthProvider";
import { removeData } from "./../functions/AsyncStorageFunctions";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import UploadPhoto from "../components/UploadPhoto";
const ProfileScreen = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "User Profile", style: { color: "#fff" } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              },
            }}
          />
          
          <View>
              <UploadPhoto props={props} />
            </View>

            <Text style={styles.NameStyle}>
              {auth.CurrentUser.name}
            </Text>

        {/* <Text style={styles.textStyle}>Name :{auth.CurrentUser.name}</Text> */}
        {/* <Text style={styles.textStyle}>Student ID :{auth.CurrentUser.sid}</Text>
        <Text style={styles.textStyle}>Email :{auth.CurrentUser.email}</Text>
        <Text style={styles.textStyle}>Password :{auth.CurrentUser.password}</Text> */}
        <Text style={styles.textStyle}>Born On :{auth.CurrentUser.bornOn}</Text>
        <Text style={styles.textStyle}>Address :{auth.CurrentUser.address}</Text>
        <Text style={styles.textStyle}>Works At :{auth.CurrentUser.worksAt}</Text>
        <View style={styles.viewStyle}>    
        </View>

        <View style={styles.viewStyle}>
        <Button
        icon={<AntDesign name="login" size={24} color="dodgerblue" />}
              title={' Delete Profile '}
              type="solid"
              onPress={function () {
                let key = auth.CurrentUser.email;
                removeData(key);
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
                alert("Profile Deleted");
              }}
            />

        </View>

        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    color: "black",
  },
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",

  },
  ButtonStyle:{
    flex: 1,
    justifyContent: "center",
    paddingHorizontal:50

  },
  NameStyle:{
    fontSize: 30,
    color: "black",
    justifyContent: "center",

  }
});
export default ProfileScreen;
