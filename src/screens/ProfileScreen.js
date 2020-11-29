import React, { useState } from "react";
import { View, StyleSheet} from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "./../providers/AuthProvider";
import { removeData } from "./../functions/AsyncStorageFunctions";
import { FontAwesome, Feather, AntDesign,MaterialIcons , MaterialCommunityIcons } from "@expo/vector-icons";
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

            <View style={styles.viewStyle2}>
            <Text style={styles.NameStyle}>
              {auth.CurrentUser.name}
            </Text>
            </View>

        <View style={styles.viewStyle2}>
        <View style={styles.perViewStyle2}>
              <MaterialIcons name="place" size={30} color="#777777" />
              <Text style={{ fontSize: 24, color: "#777777", marginLeft: 20 }}>{auth.CurrentUser.address}</Text>
            </View>
            <View style={styles.perViewStyle2}>
              <MaterialIcons name="date-range" size={30} color="#777777" />
              <Text style={{ fontSize: 24, color: "#777777", marginLeft: 20 }}>{auth.CurrentUser.bornOn}</Text>
            </View>
            <View style={styles.perViewStyle2}>
              <MaterialIcons name="work" size={30} color="#777777" />
              <Text style={{ fontSize: 24, color: "#777777", marginLeft: 20 }}>{auth.CurrentUser.worksAt}</Text>
            </View>
          </View>

        <View style={styles.viewStyle}>
        <Button
        icon={<AntDesign name="delete" size={24} color="dodgerblue" />}
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
    padding: 30,
    fontSize: 30,
    color: "#162f3e",
    fontStyle: 'normal'

  },
  perViewStyle2: {
    flexDirection: 'row',
    marginBottom: 10,
    margin: 10,
    padding: 10
  },
  viewStyle2: {
    paddingTop: 20,
    paddingHorizontal: 30,
    marginBottom: 25,
  },
});
export default ProfileScreen;
