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

import * as ImagePicker from "expo-image-picker";

import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen({ handleTokenAndId, userId, userToken }) {
  const [isLoading, setIsLoading] = useState(true);
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [updateInformation, setUpdateInformation] = useState(false);
  const [updatePicture, setUpdatePicture] = useState(false);
  const navigation = useNavigation();

  const animation = useRef(null);

  const [selectPicture, setSelectPicture] = useState(null);
  const [isPictureLoading, setIsPictureLoading] = useState(false);

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
        console.log("profileInfo >>", error.response);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (selectPicture) {
      setIsPictureLoading(true);

      const tab = selectPicture.split(".");

      try {
        const formData = new FormData();
        formData.append("photo", {
          uri: selectPicture,
          name: `my-photo.${tab[1]}`,
          type: `image/${tab[1]}`,
        });

        const updatePic = await axios.put(
          "https://express-airbnb-api.herokuapp.com/user/upload_picture",
          formData,
          {
            headers: {
              authorization: `Bearer ${userToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (updatePic.data) {
          setIsPictureLoading(false);
          alert("You photo is updated");
          console.log(updatePic.data);
        }
      } catch (error) {
        console.log("updatepicture >>", error.message);
      }
    }
    if (setUpdateInformation) {
      try {
        const updateInformation = await axios.put(
          "https://express-airbnb-api.herokuapp.com/user/update",
          {
            email: email,
            username: username,
            description: description,
          },
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );
        alert("Your profile has been successefully modified");
      } catch (error) {
        console.log("updateInfo >>", error.response);
      }
    }
  };

  const getPermissionAndGetPicture = async () => {
    // On demande le droit d'acces
    const askPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (askPermission.status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (result.canceled === true) {
        alert("No photo chose");
      } else {
        setSelectPicture(result.assets[0].uri);
      }
    } else {
      alert("Access permission refused");
    }
  };
  const getPermissionAndGetPhoto = async () => {
    // On demande le droit d'acces
    const askPermission = await ImagePicker.requestCameraPermissionsAsync();

    if (askPermission.status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      if (result.canceled === true) {
        alert("No photo chose");
      } else {
        setSelectPicture(result.assets[0].uri);
      }
    } else {
      alert("Access permission refused");
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
          {photo === undefined ? (
            <FontAwesome5 name="user-alt" size={100} color="lightgrey" />
          ) : selectPicture ? (
            <Image
              source={{ uri: selectPicture }}
              style={{ height: 50, width: 50 }}
            />
          ) : (
            <Image
              source={{ uri: photo.url }}
              style={{ width: 130, height: 130, borderRadius: 100 }}
              resizeMode="cover"
            />
          )}
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-evenly",
            marginHorizontal: 20,
          }}
        >
          <TouchableOpacity onPress={getPermissionAndGetPicture}>
            <MaterialIcons name="photo-library" size={35} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity onPress={getPermissionAndGetPhoto}>
            <MaterialIcons name="photo-camera" size={35} color="grey" />
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={styles.inputText}
        autoCapitalize="none"
        placeholder="email"
        setUpdateInformation={true}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />

      <TextInput
        style={styles.inputText}
        autoCapitalize="none"
        placeholder="username"
        setUpdateInformation={true}
        value={username}
        onChangeText={(text) => {
          setUsername(text);
        }}
      />

      <TextInput
        style={styles.inputDescription}
        multiline
        numberOfLines={3}
        placeholder="description"
        setUpdateInformation={true}
        autoCapitalize="none"
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
