import {
  ActivityIndicator,
  Text,
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { getCrops } from "@/app/services/crop-services";
import Crop from "@/app/models/entities/crop";
import SeasonsEnum from "@/app/models/entities/seasonsEnum";

export default function Crops() {
  const dbCtx = useSQLiteContext();

  const [loading, setLoading] = useState(true);
  const [crops, setCrops] = useState([] as Crop[]);

  useEffect(() => {
    const loadCrops = async () => {
      const cropsResult = await getCrops(dbCtx);
      setCrops(cropsResult as Crop[]);
    };

    loadCrops().finally(() => setLoading(false));
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 22,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={crops}
          renderItem={({ item }) => (
            <Text style={styles.item}>
              {item.id}-{item.name}-{item.description}-
              {SeasonsEnum[item.season]}
            </Text>
          )}
        />
      </View>
    );
  }
}
