import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Feather, AntDesign, Ionicons, MaterialIcons  } from "@expo/vector-icons";
import { storeDataJSON } from "../functions/AsyncStorageFunctions";
import DateTimePicker from '@react-native-community/datetimepicker';

const SignUpScreen = (props) => {
  const [Name, setName] = useState("");
  const [SID, setSID] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [date, setDate] = useState(new Date(1700420630000));
  const [show, setShow] = useState(false);
  const [BornOn , setBornOn] = useState("");
  const [Address, setAddress] = useState("");
  const [Works_At, setWorksAt] = useState("");
  return (
    <View style={styles.viewStyle}>
      <Card>
        <Card.Title>Welcome to BlogApp!</Card.Title>
        <Card.Divider />
        <Input
          leftIcon={<Ionicons name="ios-person" size={24} color="black" />}
          placeholder="Name"
          onChangeText={function (currentInput) {
            setName(currentInput);
          }}
        />
        <Input
          leftIcon={<Ionicons name="ios-school" size={24} color="black" />}
          placeholder="Student ID"
          onChangeText={function (currentInput) {
            setSID(currentInput);
          }}
        />
        <Input
          leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
          placeholder="E-mail Address"
          onChangeText={function (currentInput) {
            setEmail(currentInput);
          }}
        />

        <Input
          placeholder="Password"
          leftIcon={<Feather name="key" size={24} color="black" />}
          secureTextEntry={true}
          onChangeText={function (currentInput) {
            setPassword(currentInput);
          }}
        />


        <Input
          leftIcon={<MaterialIcons name="place" size={24} color="black" />}
          placeholder='Address'
          onChangeText={
              function (currentInput) {
                  setAddress(currentInput);
          }
            }
        />

                <Input
                    leftIcon={<MaterialIcons name="work" size={24} color="black" />}
                    placeholder='Works At'
                    onChangeText={
                        function (currentInput) {
                          setWorksAt(currentInput);
                        }
                    }
                    />

          <View>
          <View style={styles.viewStyle2}>

              <Button icon={<MaterialIcons name="date-range" size={24} color="black" />}
                  style={styles.buttonStyle2} type="outline" color='blue' onPress={
                      function () {
                          setShow(true)
                      }} title="  Select Your BirthDate" />
          </View>
          {show && (
              <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  display="calendar"
                  onChange={function (event, selectedDate) {
                  setShow(false);
                  setDate(selectedDate);
                  let str = selectedDate.toString();
                  str = str.slice(4, 16)
                  setBornOn(str);
                  }
                  }
              />
          )}
          </View>



        <Button
          icon={<AntDesign name="user" size={24} color="white" />}
          title="  Sign Up!"
          type="solid"
          onPress={function () {
            let currentUser = {
              name: Name,
              sid: SID,
              email: Email,
              password: Password,
              bornOn: BornOn,
              address: Address,
              worksAt: Works_At,
            };
            
            storeDataJSON(Email, currentUser);
            props.navigation.navigate("SignIn");
          }}
        />
        <Button
          type="clear"
          icon={<AntDesign name="login" size={24} color="dodgerblue" />}
          title="  Already have an account?"
          onPress={function () {
            props.navigation.navigate("SignIn");
          }}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#4bacb8",
  },
  viewStyle2: {
    justifyContent: 'flex-start',
    margin: 10,
    paddingBottom: 10
},
});
export default SignUpScreen;
