import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, AsyncStorage } from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import { AuthContext} from "../providers/AuthProvider";

const PostScreen = (props) => {
    let user = AsyncStorage.auth().currentUser;
    let userid = user.uid;
    let username = user.displayName;
    let postId = props.route.params.postid;
    const [Post, setPost] = useState({});
    const [Comment, setComment] = useState("");

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        color: "blue",
    },
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
    },

});

export default PostScreen;}