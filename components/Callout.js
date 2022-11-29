import react from "react";
import { StyleSheet } from "react-native";
import { Callout } from "react-native-maps";

const Callout = ({ title, price }) => {
  return (
    <Callout
      style={styles.mapCallout}
      onPress={() => {
        navigation.navigate("Room", {
          id: item._id,
        });
      }}
    >
      <Text style={styles.mapTitle}>{title}</Text>
      <Text>{price} €</Text>
      {/* Image */}
    </Callout>
  );
};

export default Callout;

const styles = StyleSheet.create({
  mapCallout: {
    width: 300,
    height: 150,
  },

  mapTitle: {
    fontSize: 16,
    fontWeight: "900",
  },
});
