import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage} from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { TextInput } from 'react-native';
const IndividualPostScreen = (props) => {
  const [Profile, setProfile] = useState({});
  const [EditWrite, SetWrite] = useState("");
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>Name</Text>
        <Text style={styles.textStyle}>posted On :  </Text>
        <Text style={styles.textStyle}>21 Likes, 7 Comments</Text>
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder = "Write Something!"
            onChangeText={text => SetWrite(text)}
            />
        <Button 
        title="Comment"
        type="solid"
        />


        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    margin: 5,
    color: "black",
  },
  viewStyle: {
    alignItems: "center",
    margin: 100,
  },

  avatarStyle: {
    margin: 30,
    alignSelf: "center",



  }
});
export default IndividualPostScreen;