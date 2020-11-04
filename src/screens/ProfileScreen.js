import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage} from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
const ProfileScreen = (props) => {
  const [Profile, setProfile] = useState({});
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
            centerComponent={{ text: "The Office", style: { color: "#fff" } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              },
            }}
          />
          
          <Avatar
          containerStyle={styles.avatarStyle}
          rounded
          source=
                  {require('./../../assets/pujo_white.jpg')}
          size={200}
          // onAccessoryPress={() => Alert.alert("change avatar")}
          overlayContainerStyle={{ backgroundColor: "#1C1C1C" }}
          showAccessory
          accessory={{ containerStyle: { backgroundColor: "#1C1C1C" } }}
        />
        <Text style={styles.textStyle}>Name :{auth.CurrentUser.name}</Text>
        <Text style={styles.textStyle}>Born On :{auth.CurrentUser.BornOn}</Text>
        <Text style={styles.textStyle}>Address :{auth.CurrentUser.address}</Text>
        <Text style={styles.textStyle}>Works At :{auth.CurrentUser.worksAt}</Text>
        <Button 
        title="Edit Profile"
        type="solid"
          onPress={function () {
            props.navigation.navigate("Edit");
            }}
        />


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
  },

  avatarStyle: {
    margin: 30,
    alignSelf: "center",



  }
});
export default ProfileScreen;
