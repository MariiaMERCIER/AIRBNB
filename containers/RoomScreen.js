import { useRoute } from "@react-navigation/core";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import LottieView from "lottie-react-native";

export default function RoomScreen({ route }) {
  const animation = useRef(null);
  const [room, setRoom] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  //   console.log(route.params.id);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
      );
      setRoom(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: "white",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../assets/126629-bouncing-ball-morphing.json")}
      />
    </View>
  );
  //   ) : (
  //     <View>
  //       <Text>Coucou</Text>
  //       {/* <Text> {route.params.title}</Text> */}
  //     </View>
  //   );
}
const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
