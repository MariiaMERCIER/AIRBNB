import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import axios from "axios";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Logo from "../components/Logo";
import Button from "../components/Button";
import Input from "../components/Input";
import LargeInput from "../components/LargeInput";

export default function SignUpScreen({ handleTokenAndId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  const hadnleSubmit = async () => {
    setErrorMessage("");

    if (!username || !password || !confirmpass || !email || !description) {
      setErrorMessage("Fill all fields!");
    } else if (password !== confirmpass) {
      setErrorMessage("Passwords are not the same!");
    } else {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",
          {
            email: email,
            username: username,
            password: password,
            description: description,
          }
        );

        handleTokenAndId(response.data.token, response.data.id);

        alert("Welcome to AirBnb!");
      } catch (error) {
        // const message = error.response;
        // if (
        //   message === "This username already has an account." ||
        //   message === "This email already has an account "
        // )
        setErrorMessage("Email or username have already been used!");
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: "white" }}
    >
      <View>
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <Logo size={"large"} />
            <Text style={styles.mainTitle}>Sign Up</Text>
          </View>

          <Input setFunction={setEmail} value={email} placeholder="Email" />

          <Input
            setFunction={setUsername}
            value={username}
            placeholder="Username"
          />
          <LargeInput
            setFunction={setDescription}
            value={description}
            placeholder="Description"
          />

          <Input
            placeholder="Password"
            password={true}
            secureTextEntry={true}
            value={password}
            setFunction={setPassword}
          />

          <Input
            placeholder="Confirm Password"
            password={true}
            secureTextEntry={true}
            value={confirmpass}
            setFunction={setConfirmpass}
          />
          <Text style={{ color: "#FF5A5F" }}>{errorMessage}</Text>

          <View style={{ marginTop: 50 }}>
            <Button text="Sign Up" setFunction={hadnleSubmit} />

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
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  mainTitle: {
    fontSize: 26,
    fontWeight: "600",
    color: "grey",
  },

  textUnderButton: {
    textAlign: "center",
    marginVertical: 15,
    color: "grey",
  },
});
