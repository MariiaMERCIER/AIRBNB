import { useRoute } from "@react-navigation/core";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

export default function UpdateProfileScreen() {
  const animation = useRef();
  const route = useRoute();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [updateData, setUpdateData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = route.params.token;
      const response = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/update",
        {
          email: email,
          description: description,
          username: userName,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <View style={styles.container}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: "white",
        }}
        source={require("../assets/126629-bouncing-ball-morphing.json")}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            borderColor: "#FF5A5F",
            borderWidth: 2,
            padding: 20,
            borderRadius: 100,
          }}
        >
          {userData.photo ? (
            <Image
              source={{ uri: userData.photo.url }}
              style={{ width: 130, height: 130, borderRadius: 100 }}
              resizeMode="cover"
            />
          ) : (
            <FontAwesome5 name="user-alt" size={130} color="lightgrey" />
          )}
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-evenly",
            marginHorizontal: 20,
          }}
        >
          <MaterialIcons name="photo-library" size={35} color="grey" />
          <MaterialIcons name="photo-camera" size={35} color="grey" />
        </View>
      </View>

      <TextInput
        style={styles.inputText}
        // placeholder={}
        autoCapitalize="none"
        value={userData.email}
      />
      <TextInput
        style={styles.inputText}
        // placeholder={}
        autoCapitalize="none"
        value={userData.username}
      />
      <TextInput
        style={styles.inputDescription}
        // placeholder={}
        multiline
        numberOfLines={3}
        autoCapitalize="none"
        value={userData.description}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("UpdateProfile", {
            id: userId,
          });
        }}
      >
        <Text style={styles.textButton}>UPDATE</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,

    backgroundColor: "white",

    alignItems: "center",
  },

  button: {
    width: 220,
    height: 60,
    borderWidth: 3,
    borderColor: "#FF5A5F",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginTop: 25,
  },

  inputText: {
    width: 350,
    borderBottomWidth: 1,
    borderBottomColor: "red",
    marginTop: 40,
    paddingVertical: 10,
    fontSize: 16,
  },

  inputDescription: {
    marginTop: 60,
    marginBottom: 30,
    width: 350,
    height: 100,
    borderWidth: 1,
    borderColor: "red",
    paddingVertical: 15,
    paddingLeft: 15,
    textAlignVertical: "top",
    fontSize: 16,
  },
  textButton: {
    fontSize: 20,
    fontWeight: "600",
    color: "grey",
  },
});
