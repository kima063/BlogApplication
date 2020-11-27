import React, { useState } from "react";
import { View, StyleSheet} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { TextInput } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';


const EditProfileScreen = (props) => {
    const [Profile, setProfile] = useState({});
    const [EditName, SetName] = useState("");
    const [date, setDate] = useState("25.06.2019");
    const [EditAddress, SetAddress] = useState("");
    const [EditWorkPlace, SetWorkPlace] = useState("");


  
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
            //onAccessoryPress={() => Alert.alert("change avatar")}
            overlayContainerStyle={{ backgroundColor: "#1C1C1C" }}
            showAccessory
            accessory={{ containerStyle: { backgroundColor: "#1C1C1C" } }}
            />
  
            <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder = "Edit Your Name"
            onChangeText={text => SetName(text)}
            />
            

          <DatePicker
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
  
  
  
    },

    datePickerStyle: {
        width: 200,
        marginTop: 20,
      },
  });
  export default EditProfileScreen;