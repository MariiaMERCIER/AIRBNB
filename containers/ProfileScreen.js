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

import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

export default function ProfileScreen({ handleTokenAndId, userId, userToken }) {
  const [isLoading, setIsLoading] = useState(true);
  const [photo, setPhoto] = useState("");
  const [updateInfo, setUpdateInfo] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

  const animation = useRef(null);

  // console.log(userToken);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );
        // console.log(response.data);
        setPhoto(response.data.photo);
        setEmail(response.data.email);
        setUsername(response.data.username);
        setDescription(response.data.description);

        setIsLoading(false);
      } catch (error) {
        console.log("profileInfo >>", error.message);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      const updateInformation = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/update",
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        },
        {
          email: email,
          username: username,
          description: description,
        }
      );
      alert("Your profile has been successefully modified");
      console.log(updateInformation);
    } catch (error) {
      console.log("updateInfo >>", error.response);
    }
  };
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
          {photo ? (
            <Image
              source={{ uri: photo.url }}
              style={{ width: 130, height: 130, borderRadius: 100 }}
              resizeMode="cover"
            />
          ) : (
            <FontAwesome5 name="user-alt" size={100} color="lightgrey" />
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
        autoCapitalize="none"
        placeholder="email"
        value={email}
        onChange={(text) => {
          setEmail(text);
        }}
      />

      <TextInput
        style={styles.inputText}
        autoCapitalize="none"
        placeholder="username"
        value={username}
        onChange={(text) => {
          setUsername(text);
        }}
      />

      <TextInput
        style={styles.inputDescription}
        multiline
        numberOfLines={3}
        placeholder="description"
        autoCapitalize="none"
        value={description}
        onChange={(text) => {
          setDescription(text);
        }}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.textButton}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#e9e9e9" }]}
        onPress={() => handleTokenAndId(null)}
      >
        <Text style={styles.textButton}>Log out</Text>
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
