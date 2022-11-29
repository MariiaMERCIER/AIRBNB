import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = ({ text, setFunction, value, placeholder }) => {
  return (
    <TextInput
      style={styles.input}
      autoCapitalize="none"
      value={value}
      placeholder={placeholder}
      onPressText={(text) => setFunction(text)}
    />
  );
};
export default Input;

const styles = StyleSheet.create({
  input: {
    width: 350,
    borderBottomWidth: 1,
    borderBottomColor: "#FF5A5F",
    marginTop: 40,
    paddingVertical: 10,
    fontSize: 16,
  },
});
