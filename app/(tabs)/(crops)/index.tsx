import { getCrops } from "@/app/services/crop-services";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function Crops() {
  const dbCtx = useSQLiteContext();

  const [loading, setLoading] = useState(true);
  const [crops, setCrops] = useState([] as any[]);

  useEffect(() => {
    const loadCrops = async () => {
      const cropsResult = await getCrops(dbCtx);
      setCrops(cropsResult);
    };

    loadCrops().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Crop list</Text>
        <Text>{JSON.stringify(crops)}</Text>
      </View>
    );
  }
}
