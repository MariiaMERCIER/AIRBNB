import React from "react";
import { Image, View } from "react-native";
import logo from "../assets/airbnb.png";

const Logo = ({}) => {
  <View>
    <Image
      source={logo}
      style={(size = "large" ? styles.largeLogo : smallLogo)}
      resizeMode="contain"
    />
  </View>;
};

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

export default Logo;
