import { useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";

export default function ProfileScreen() {
  const { params } = useRoute();
  return (
    <View>
      <Text>Coucou</Text>
      {/* <Text>user id : {params.userId}</Text> */}
    </View>
  );
}
