import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  Card,
  Button,
  Text,
  Avatar,
  Input,
  Header,
} from "react-native-elements";
import PostCard from "./../components/PostCard";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { getPosts } from "./../requests/Posts";
import { getUsers } from "./../requests/Users";
import { useNetInfo } from "@react-native-community/netinfo";
import { addPostJSON, getDataJSON, storeDataJSON } from "./../functions/AsyncStorageFunctions";
import {LogBox} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = (props) => {
  const netinfo = useNetInfo();
  if (netinfo.type != "unknown" && !netinfo.isInternetReachable) {
    alert("No Internet!");
  }
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentPost, setRecentPost] = useState([]);
  const [postNo, setPostNo] = useState(0);
  const [postDate, setPostDate] = useState("");
  var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const loadPosts = async () => {
    setLoading(true);
    let temp_posts = await getDataJSON("Posts");
    setPosts(temp_posts);
    setLoading(false);
  };
  const loadUsers = async () => {
    const response = await getUsers();
    if (response.ok) {
      setUsers(response.data);
    } else {
      alert(response.problem);
    }
};

  useEffect(() => {
    loadPosts();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  if (!loading) {
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
            <Card>
              <Input
                placeholder="What's On Your Mind?"
                leftIcon={<Entypo name="pencil" size={24} color="black" />}
                onChangeText={
                  function (currentPost) {
                    setRecentPost(currentPost);
                  }
                }
              />
              <Button title="Post" type="outline" onPress={function () {
                setLoading(true);
                setPostNo(postNo + 1);
                var date = new Date().getDate();
                var month = monthNames[new Date().getMonth()];
                var year = new Date().getFullYear();
                setPostDate(date + ' ' + month + ' ' + year);
                console.log(postDate);
                let postDetail = {
                  ID: postNo,
                  author: auth.CurrentUser.name,
                  body: recentPost,
                  created_at: "Posted On " + postDate,
                  likes: [],
                  comments: []
                }
                if (posts == undefined) {
                  setPosts([postDetail]);
                  storeDataJSON('Posts', [postDetail]);
                } else {
                  setPosts([...posts, postDetail]);
                  addPostJSON('Posts', postDetail);
                }
                setLoading(false);
              }} />
            </Card>

            <FlatList
              data={posts}
              inverted={true}
              scrollsToTop={true}
              keyExtractor={(item) => item.ID}
              renderItem={function ({ item }) {
                return (
                  <TouchableOpacity onPress={()=>{
 
                    <PostCard
                      author={item.author}
                      title={item.created_at}
                      body={item.body}
                      navigation={props.navigation}
                      post={item}
                     />
                     }}>

                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
      </AuthContext.Consumer>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" animating={true} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default HomeScreen;
