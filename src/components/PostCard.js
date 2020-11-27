import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "./../providers/AuthProvider";
import { storeDataJSON, addDataJSON, getDataJSON, removeData } from './../functions/AsyncStorageFunction';

const PostCard = (props) => {
  const [postComments, setPostComments] = useState([]);
  const [postLike, setPostLike] = useState([]);
  const [allLike, setallLike] = useState([]);
  const loadLikes = async () => {
    let likes = await getDataJSON('Likes');
    if (likes != null) {
      setallLike(likes);
      setPostLike(likes.filter((thisLike) => thisLike.post_ID == props.post_ID))
    } else {
      setPostLike([]);
    }
  };

  const loadComments = async () => {
    let allcomments = await getDataJSON('Comments');
    if (allcomments != null) {
      setPostComments(allcomments.filter((thisComment) => thisComment.post_ID == props.post_ID));
    } else {
      setPostComments([]);
    }
  };

  useEffect(() => {
    loadComments();
    loadLikes();
  }, []);
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <Card>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar
              containerStyle={{ backgroundColor: "#ffab91" }}
              rounded
              icon={{ name: "user", type: "font-awesome", color: "black" }}
              activeOpacity={1}
            />
            <Text h4Style={{ padding: 10 }} h4>
              {props.author}
            </Text>
          </View>
          <Text style={{ fontStyle: "italic" }}> {props.title}</Text>
          <Text
            style={{
              paddingVertical: 10,
            }}
          >
            {props.body}
          </Text>
          <Card.Divider />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button
              type="outline"
              title={"  Like (" + postLike.length + ")"}
              icon={<AntDesign name="like2" size={24} color="dodgerblue" />}
              onPress={
                function () {
                  let newlike = {
                    post_ID: props.post_ID,
                    liker: auth.CurrentUser.name
                  };
                  if (postLike == undefined) {
                    setPostLike([newlike]);
                  } else {
                    setPostLike([...postLike, newlike]);
                  }
                  if (allLike == undefined) {
                    setallLike([newlike]);
                    storeDataJSON('Like', [newlike]);
                  } else {
                    setallLike([...allLike, newlike]);
                    addDataJSON('Like', newlike);
                  }
                }
              }
            />
            <Button type="outline" title={"Comment (" + postComments.length + ")"} onPress={
              function () {
                props.navigation.navigate("PostScreen", props.post);
              }
            } />
          </View>
        </Card>
      )}
    </AuthContext.Consumer>
  );
};

export default PostCard;