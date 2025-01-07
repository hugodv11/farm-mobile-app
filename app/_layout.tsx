import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useEffect, useState } from "react";
import {
  getDBConnection,
  createDefaultTables,
  defaultInserts,
} from "./services/db-service";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeDatabase = async () => {
      const db = await getDBConnection();
      await createDefaultTables(db);
      await defaultInserts(db);
      setLoading(false);
    };

    initializeDatabase();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    );
  }
}
