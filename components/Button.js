import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const Button = ({ text, backgroundColor, setFunction }) => {
  return (
    <TouchableOpacity
      style={
        backgroundColor ? [styles.button, styles.backColorBtn] : styles.button
      }
      onPress={() => {
        setFunction();
      }}
    >
      <Text style={styles.textButton}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: 250,
    height: 60,
    borderWidth: 3,
    borderColor: "#FF5A5F",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  textButton: {
    fontSize: 20,
    fontWeight: "600",
  },

  backColorBtn: {
    backgroundColor: "#e9e9e9",
  },
});
