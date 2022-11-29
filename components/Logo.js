import React from "react";
import { Image, View, StyleSheet } from "react-native";

const Logo = ({ size }) => {
  <View>
    <Image
      source={require("../assets/airbnb.png")}
      style={size === "large" ? styles.largeLogo : styles.smallLogo}
      resizeMode={"contain"}
    />
  </View>;
};
export default Logo;

const styles = StyleSheet.create({
  largeLogo: {
    width: 120,
    height: 120,
    marginTop: 10,
    marginBottom: 30,
  },

  smallLogo: {
    width: 45,
    height: 45,
  },
});
