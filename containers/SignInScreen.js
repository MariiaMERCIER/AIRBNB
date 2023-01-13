import { useNavigation } from "@react-navigation/core";
import { useState } from "react";

import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

// Import des composants

import Input from "../components/Input";
import Button from "../components/Button";
import Logo from "../components/Logo";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
          "https://lereacteur-bootcamp-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );

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
      <View>
        <View style={styles.container}>
          <View>
            <Logo size={"large"} />
            <Text style={styles.mainTitle}>Sign in</Text>
          </View>
          <Input value={email} placeholder={"Email"} setFunction={setEmail} />

          <Input
            placeholder={"Password"}
            password={true}
            secureTextEntry={true}
            value={password}
            setFunction={setPassword}
          />

          <Text style={{ color: "#FF5A5F" }}>{errorMessage}</Text>

          <View style={{ marginTop: 50 }}>
            <Button text={"Sign in"} setFunction={handleSubmit} />

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
    backgroundColor: "white",
    justifyContent: "center",
  },

  container: {
    alignItems: "center",
  },

  mainTitle: {
    fontSize: 26,
    fontWeight: "600",
    color: "grey",
    textAlign: "center",
  },

  textUnderButton: {
    textAlign: "center",
    marginVertical: 15,
    color: "grey",
  },
});
