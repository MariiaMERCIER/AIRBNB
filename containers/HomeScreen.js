import axios from "axios";
import { useEffect, useState } from "react";

import {
  Button,
  Text,
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.log("rooms >>", error.message);
      }
    };

    fetchData();
  }, []);

  const star = [1, 2, 3, 4, 5];

  return isLoading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#FF5A5F" />
    </View>
  ) : (
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={styles.annonce}
            onPress={() => {
              navigation.navigate("Room", {
                id: item._id,
              });
            }}
          >
            <ImageBackground
              source={{ uri: item.photos[0].url }}
              style={styles.imageAnnonce}
            >
              <View
                style={{
                  backgroundColor: "black",
                  width: 90,
                  height: 45,
                  alignItems: "center",
                  justifyContent: "center",
                  top: 165,
                }}
              >
                <Text style={{ color: "white", fontSize: 18 }}>
                  {item.price} €
                </Text>
              </View>
            </ImageBackground>

            <View style={[styles.row, styles.barAnnonce]}>
              <View>
                <Text
                  style={styles.title}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <View style={[styles.row, styles.opinion]}>
                  {star.map((elemt, index) => {
                    if (elemt <= item.ratingValue) {
                      return (
                        <AntDesign
                          name="star"
                          size={24}
                          color="rgb(255, 176, 0)"
                          key={index}
                        />
                      );
                    } else {
                      return (
                        <AntDesign
                          name="star"
                          size={24}
                          color="rgb(211,211,211)"
                          key={index}
                        />
                      );
                    }
                  })}

                  <Text style={styles.reviews}>{item.reviews} reviews</Text>
                </View>
              </View>
              <Image
                source={{ uri: item.user.account.photo.url }}
                style={{ height: 60, width: 60, borderRadius: 50 }}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "white",
  },

  title: {
    width: 315,
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
  },

  annonce: {
    borderBottomColor: "rgb(211,211,211)",
    borderBottomWidth: 1,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
  },

  rating: {
    flexDirection: "row",
  },

  imageAnnonce: {
    height: 220,
    marginVertical: 15,
  },

  opinion: {
    marginVertical: 15,
    alignItems: "center",
  },

  barAnnonce: {
    justifyContent: "space-between",
  },

  reviews: {
    marginHorizontal: 15,
    color: "grey",
  },
});
