import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import axios from "axios";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Logo from "../assets/airbnb.png";

export default function SignUpScreen({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  const hadnleSubmitSignUp = async () => {
    if (password !== confirmpass) {
      setErrorMessage(true);
    } else if (!username || !password || !confirmpass || !email) {
      setErrorMessage(true);
    } else {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/sign_up",
        {
          email: email,
          nusername: username,
          password: password,
          description: description,
        }
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.mainTitle}>Sign Up</Text>
        </View>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Username"
          onChangeText={(text) => {
            setUsername(text);
          }}
          value={username || !password || !confirmpass || !email}
        />
        <TextInput
          style={styles.inputDescription}
          placeholder="Description"
          multiline
          numberOfLines={3}
          onChangeText={(text) => {
            setDescription(text);
          }}
          value={description}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          password={true}
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Confirm password"
          password={true}
          secureTextEntry={true}
          onChangeText={(text) => {
            setConfirmpass(text);
          }}
          value={confirmpass}
        />
        {errorMessage && (
          <Text style={{ color: "red" }}>Let's put all fields!</Text>
        )}

        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton} onPress={hadnleSubmitSignUp}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.textUnderButton}>
              You have already an account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  logo: {
    width: 150,
    height: 150,
  },

  mainTitle: {
    fontSize: 26,
    fontWeight: "600",
    color: "grey",
  },

  inputText: {
    width: 350,
    borderBottomWidth: 1,
    borderBottomColor: "red",
    paddingVertical: 15,
    paddingLeft: 15,
  },

  inputDescription: {
    marginTop: 30,
    width: 350,
    height: 150,
    borderWidth: 1,
    borderColor: "red",
    paddingVertical: 15,
    paddingLeft: 15,
    textAlignVertical: "top",
  },
  button: {
    borderColor: "red",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 220,
    borderRadius: 50,
  },

  textButton: {
    fontSize: 20,
    fontWeight: "600",
  },

  textUnderButton: {
    textAlign: "center",

    marginVertical: 15,
    color: "grey",
  },
});
