import { Text, Image, View, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";

import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import LottieView from "lottie-react-native";
import axios from "axios";

export default function LocalScreen() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");

  const animation = useRef(null);
  useEffect(() => {
    const getPermission = async () => {
      try {
        // Demander la permission d'accéder aux coordonnées de l'appareil
        const permissionResponse =
          await Location.requestForegroundPermissionsAsync();
        // console.log(permissionResponse);

        const { status } = permissionResponse;

        if (status === "granted") {
          // console.log("On passe à la suite");

          const location = await Location.getCurrentPositionAsync();
          // console.log(location);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);

          // console.log(latitude, longitude);
        } else {
          alert("Permission refusée");
        }
      } catch (error) {
        console.log("permission-localisation >> ", error.message);
      }
    };
    getPermission();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms/around"
      );

      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <View style={styles.container}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: "white",
        }}
        source={require("../assets/126629-bouncing-ball-morphing.json")}
      />
    </View>
  ) : (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0921,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {data.map((elem) => {
          return (
            <Marker
              key={elem._id}
              conrdinate={{
                latitude: elem.location[0],
                longitude: elem.location[1],
              }}
              pinColor={"red"}
            >
              <Text>{elem.price}</Text>
              <Text>{elem.title}</Text>
              <Image
                source={{ uri: elem.photos[0].url }}
                style={{ width: 100, height: 100 }}
              />
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
