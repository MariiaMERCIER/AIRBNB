import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Text, View, ActivityIndicator, Image } from "react-native";

import { FlatList, StyleSheet } from "react-native-web";

export default function HomeScreen() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

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

  return isLoading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#FF5A5F" />
    </View>
  ) : (
    <View style={{ paddingHorizontal: 15, backgroundColor: "white" }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <View>
              <Image source={item.photos[0].url} style={{}} />
              <Text>{item.title}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
  },
});
