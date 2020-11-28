import React, { useState } from "react";
import { View, StyleSheet} from "react-native";
import {AsyncStorage} from "@react-native-async-storage/async-storage";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "./../providers/AuthProvider";
import { removeData } from "./../functions/AsyncStorageFunctions";
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
          <View style={styles.viewStyle}>
          {/* <UploadPhoto props={props} /> */}

          </View>
        <Text style={styles.textStyle}>Name :{auth.CurrentUser.name}</Text>
        <Text style={styles.textStyle}>S_ID :{auth.CurrentUser.sid}</Text>
        <Text style={styles.textStyle}>Email :{auth.CurrentUser.email}</Text>
        <Text style={styles.textStyle}>Password :{auth.CurrentUser.password}</Text>
        <Text style={styles.textStyle}>Born On :{auth.CurrentUser.BornOn}</Text>
        <Text style={styles.textStyle}>Address :{auth.CurrentUser.Address}</Text>
        <Text style={styles.textStyle}>Works At :{auth.CurrentUser.Works_At}</Text>
        <View style={styles.viewStyle}>    
        <Button 
        title="Edit Profile"
        type="solid"
          onPress={function () {
            props.navigation.navigate("Edit");
            }}
        />
        </View>

        <View style={styles.viewStyle}>
        <Button
              title={' Delete Profile '}
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

  },

  avatarStyle: {
    margin: 30,
    alignSelf: "center",



  }
});
export default ProfileScreen;
