import { useState, useEffect, useRef } from "react";
import { Text, Image, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";
import * as Location from "expo-location";

import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import LottieView from "lottie-react-native";

export default function LocalScreen() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [finishLoading, setFinishLoading] = useState(true);
  const [data, setData] = useState("");
  const navigation = useNavigation();

  const animation = useRef(null);
  useEffect(() => {
    const getPermission = async () => {
      try {
        // Demander la permission d'accéder aux coordonnées de l'appareil
        const permissionResponse =
          await Location.requestForegroundPermissionsAsync();

        const { status } = permissionResponse;

        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();

          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          setIsLoading(false);
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
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/rooms/around?latitude=${latitude}&longitude=${longitude}`
        );

        setData(response.data);
        setFinishLoading(false);
      } catch (error) {
        console.log("aroundme-requete >> ", error.message);
      }
    };

    if (!isLoading && latitude && longitude) {
      fetchData();
    }
  }, [latitude, longitude, isLoading]);

  return finishLoading ? (
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
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {data.map((item) => {
          return (
            <Marker
              key={item._id}
              coordinate={{
                latitude: item.location[1],
                longitude: item.location[0],
              }}
            >
              <Callout
                onPress={() => {
                  navigation.navigate("Room", {
                    id: item._id,
                  });
                }}
              >
                <Text>{item.title}</Text>
                <Text>{item.price} €</Text>
                <Image
                  source={{ uri: item.photos[0].url }}
                  style={{ width: "100%", height: 120 }}
                  resizeMode="cover"
                />
              </Callout>
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
