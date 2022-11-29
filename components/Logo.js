import React from "react";
import { Image, StyleSheet } from "react-native";

const Logo = ({ size }) => {
  return (
    <Image
      source={require("../assets/airbnb.png")}
      style={size === "large" ? styles.largeLogo : styles.smallLogo}
      // style={{ width: 45, height: 45 }}
      resizeMode="contain"
    />
  );
};
export default Logo;

const styles = StyleSheet.create({
  largeLogo: {
    width: 250,
    height: 250,
  },

  smallLogo: {
    width: 50,
    height: 50,
  },
});
