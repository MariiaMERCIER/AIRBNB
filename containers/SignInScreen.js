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

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const navigation = useNavigation();

  const handleSubmitSignin = async () => {
    setErrorMessage(false);
    try {
      if (!email || !password) {
        setErrorMessage(true);
      } else {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );

        alert("Welcome to AirBnb!");
        navigation.navigate("SignUp");
      }
    } catch (error) {
      console.log("cathch signIn >>", error.response);
    }

    // const userToken = "secret-token";
    // setToken(userToken);
  };

  return (
    // <KeyboardAwareScrollView>
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
            setName(text);
          }}
          value={email}
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
        {errorMessage && (
          <Text style={{ color: "red" }}>Name or password isn't filled</Text>
        )}

        <View>
          <TouchableOpacity style={styles.button} onPress={handleSubmitSignin}>
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