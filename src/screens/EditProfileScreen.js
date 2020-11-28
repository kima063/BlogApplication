import React, { useState } from "react";
import { View, StyleSheet} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { TextInput } from 'react-native';
import {DateTimePicker} from "@react-native-community/datetimepicker";
import UploadPhoto from "../components/UploadPhoto";
import {storeDataJSON} from "./../functions/AsyncStorageFunctions";


const EditProfileScreen = (props) => {
    const [Profile, setProfile] = useState({});
    const [date, setDate] = useState("25.06.2019");
    const [EditAddress, SetAddress] = useState("");
    const [EditWorkPlace, SetWorkPlace] = useState("");
    const [SelectImage , SetImage] = useState("");


  
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
              centerComponent={{ text: "Edit User Profile", style: { color: "#fff" } }}
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

 <TouchableOpacity key={UploadPhoto} onPress={() => {
                                      this.props.navigation.navigate("ProfileScreen", {
                                        /* image params go here */
                                      });
                                    }}>
            </TouchableOpacity>
 

          <DateTimePicker
          style={styles.datePickerStyle}
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-1950"
          maxDate="01-01-2025"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />

        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder = "Edit Your Address"
            onChangeText={text => SetAddress(text)}
            />

        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder = "Edit Your Work Place"
            onChangeText={text => SetWorkPlace(text)}
            />

            <View style={styles.viewStyle}>
            <Button
                      onPress={() => {
                        let user={
                          name: auth.CurrentUser.name,
                          sid: auth.CurrentUser.sid ,
                          email: auth.CurrentUser.email,
                          Password: auth.CurrentUser.password,
                          BornOn: date,
                          Address: EditAddress,
                          Works_At: EditWorkPlace,

                        }
                        storeDataJSON(auth.CurrentUser.email , user);
                        auth.setCurrentUser(user);
                        props.navigation.navigate("ProfileScreen");
                      }}
                      title="Save"
                      color="#fff"
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
      fontSize: 20,
      alignItems: "center",
    },
  
    avatarStyle: {
      margin: 30,
      alignSelf: "center",
  
  
  
    },

    datePickerStyle: {
        width: 200,
        marginTop: 20,
      },
  });
  export default EditProfileScreen;