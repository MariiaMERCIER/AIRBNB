import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";

import LottieView from "lottie-react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";

import { AntDesign } from "@expo/vector-icons";

export default function RoomScreen({ route }) {
  const animation = useRef(null);
  const [room, setRoom] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [seeMore, setSeeMore] = useState(false);
  //  console.log(route.params.id);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
      );
      setRoom(response.data);

      setIsLoading(false);
    };
    fetchData();
  }, [route.params.id]);

  const star = (ratingValue) => {
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < ratingValue) {
        starArray.push(
          <AntDesign name="star" size={24} color="rgb(255, 176, 0)" key={i} />
        );
      } else {
        starArray.push(
          <AntDesign name="star" size={24} color="grey" key={i} />
        );
      }
    }
    return starArray;
  };

  return isLoading ? (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
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
    <>
      <View style={styles.carrousel}>
        <Swiper
          dotStyle={styles.dot}
          dotColor="grey"
          activeDotStyle={styles.dot}
          activeDotColor="#FF5A5F"
        >
          {room.photos.map((photo) => {
            return (
              <Image
                source={{ uri: photo.url }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
                key={photo.picture_id}
              />
            );
          })}
        </Swiper>
      </View>
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
              {room.title}
            </Text>
            <View style={styles.imgAppart}>
              <Text>{star(room.ratingValue)}</Text>
              <Text
                style={{
                  color: "grey",
                  marginVertical: 20,
                  marginHorizontal: 5,
                }}
              >
                {room.reviews} reviews
              </Text>
            </View>
          </View>

          <Image
            source={{ uri: room.user.account.photo.url }}
            style={styles.imgUser}
            resizeMode="cover"
          />
        </View>

        {seeMore === true ? (
          <Text style={styles.description}>{room.description}</Text>
        ) : (
          <Text
            style={styles.description}
            ellipsizeMode="tail"
            numberOfLines={3}
          >
            {room.description}
          </Text>
        )}

        <TouchableOpacity
          onPress={() => {
            setSeeMore(!seeMore);
          }}
        >
          {seeMore ? (
            <Text style={{ color: "grey" }}>
              See less <AntDesign name="caretup" size={10} color="grey" />
            </Text>
          ) : (
            <Text style={{ color: "grey" }}>
              See more <AntDesign name="caretdown" size={10} color="grey" />
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: room.location[1],
          longitude: room.location[0],
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        }}
        style={{ width: "100%", height: "30%" }}
      >
        <Marker
          coordinate={{
            latitude: room.location[1],
            longitude: room.location[0],
          }}
        >
          <Callout>
            <Text>{room.title}</Text>
            <Text>{room.price}</Text>
          </Callout>
        </Marker>
      </MapView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },

  buttonContainer: {
    paddingTop: 20,
  },

  carrousel: {
    width: "100%",
    height: "38%",
  },

  description: {
    fontSize: 14,
    marginVertical: 10,
    lineHeight: 20,
  },

  title: {
    fontSize: 20,
    width: 300,
  },

  enTête: {
    flexDirection: "row",
  },

  imgAppart: {
    flexDirection: "row",
    alignItems: "center",
  },

  imgUser: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },

  dot: {
    width: 15,
    height: 15,
    borderRadius: 50,
  },
});
