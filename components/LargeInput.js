import React from "react";
import { TextInput, StyleSheet } from "react-native";

const LargeInput = ({ text, setFunction, value, placeholder }) => {
  return (
    <TextInput
      style={styles.largeInput}
      autoCapitalize="none"
      value={value}
      placeholder={placeholder}
      multiline
      numberOfLines={3}
      onChangeText={(text) => setFunction(text)}
    />
  );
};
export default LargeInput;

const styles = StyleSheet.create({
  largeInput: {
    marginTop: 60,
    width: 350,
    height: 100,
    borderWidth: 1,
    borderColor: "#FF5A5F",
    textAlignVertical: "top",
    paddingTop: 10,

    paddingLeft: 15,
    fontSize: 16,
  },
});
