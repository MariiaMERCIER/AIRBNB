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

export default function SignInScreen({ handleTokenAndId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    setErrorMessage("");
    try {
      if (!email || !password) {
        setErrorMessage("Fill all fields!");
      } else {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        // console.log(response.data);

        alert("Welcome to AirBnb!");

        handleTokenAndId(response.data.token, response.data.id);
      }
    } catch (error) {
      console.log("cathch signIn >>", error.response);
      setErrorMessage(error.response.status);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.topContainer}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.mainTitle}>Sign in</Text>
          </View>

          <TextInput
            style={styles.inputText}
            placeholder="Email"
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.inputText}
            placeholder="Password"
            password={true}
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />

          <Text style={{ color: "#FF5A5F" }}>{errorMessage}</Text>

          <View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.textButton}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.textUnderButton}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
  },

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
