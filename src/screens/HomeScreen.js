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
import { useNetInfo } from "@react-native-community/netinfo";
import { addPostJSON, getDataJSON, storeDataJSON , addDataJSON, removeData } from "./../functions/AsyncStorageFunctions";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
const input = React.createRef();

const HomeScreen = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentPost, setRecentPost] = useState([""]);
  const loadPosts = async () => {
    setLoading(true);
    let temp_posts = await getDataJSON('Posts');
    setPosts(temp_posts);
    setLoading(false);
  };

  deleteItemById = id => {
    const filteredData = posts.filter(item=> item.post_ID !=id);
    return filteredData;
  }
  // clearAsyncStorage = async() =>{
  //   AsyncStorage.clear();}

  useEffect(() => {
    // clearAsyncStorage();
    loadPosts();
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
              // centerComponent={{ text: "", style: { color: "#fff" } }}
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
              ref = {input}
              clearButtonMode = {'always'}
              clearButtonMode = {'always'}
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
                // alert("working i m ")
                let flag = 0;
                if (posts == undefined) {
                  flag = 1;
                }
                else {
                  flag = posts.length + 1;
                }
                let postDetail = {
                  post_ID: flag,
                  author: auth.CurrentUser.name,
                  body: recentPost,
                  created_at: "Posted On " + moment().format("DD MMM, YYYY"),
                  likes: [],
                  comments: []
                }
                if (posts == undefined) {
                  setPosts([postDetail]);
                  storeDataJSON('Posts', [postDetail]);
                } 
                else {
                  setPosts([...posts, postDetail]);
                  addDataJSON('Posts', postDetail);
                }
                input.current.clear();
                setRecentPost("");
                setLoading(false);
              }} />
              
            </Card>
            <SafeAreaView>

            <FlatList
              data={posts}
              inverted={true}
              // scrollEnabled={true}
              keyExtractor={(item) => item.post_ID}
              renderItem={function ({ item }) {
                return (
                  <TouchableOpacity onLongPress= {async ()=>{
                    setLoading(true);
                    if (posts.length == 1){
                      removeData("Posts");
                      setPosts([]);
                    }
                    else{
                      setPosts(deleteItemById(item.post_ID));
                      storeDataJSON([posts]);
                    }
                    setLoading(false);
                  }}>
                      <PostCard
                      author={item.author}
                      author_id = {item.author_id}
                      title={item.created_at}
                      body={item.body}
                      navigation={props.navigation}
                      post={item}
                      post_ID ={item.post_ID}
                     />

                  </TouchableOpacity>

                );
              }}
            />
            </SafeAreaView>
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
