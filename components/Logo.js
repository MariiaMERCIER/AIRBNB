import React from "react";
import { Image, View, StyleSheet } from "react-native";

const Logo = ({ size }) => {
  return (
    <View>
      <Image
        source={require("../assets/airbnb.png")}
        style={size === "large" ? styles.largeLogo : styles.smallLogo}
        resizeMode="contain"
      />
    </View>
  );
};
export default Logo;

const styles = StyleSheet.create({
  largeLogo: {
    width: 250,
    height: 250,
  },

  smallLogo: {
    width: 45,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});
