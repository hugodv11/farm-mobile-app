import React from "react";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import MapScreen from "./(map)";
import CropsScreen from "./(crops)";
import { createDefaultTables, defaultInserts } from "@/app/services/db-service";

const Tab = createBottomTabNavigator();

const getTabIcon = (route: RouteProp<ParamListBase, string>) => {
  switch (route.name) {
    case "map":
      return <Ionicons name="map" size={24} />;

    case "crops":
      return <Ionicons name="leaf" size={24} />;

    default:
      return "";
  }
};

const initDb = async (db: SQLiteDatabase) => {
  await createDefaultTables(db);
  await defaultInserts(db);
};

export default function TabLayout() {
  return (
    <SQLiteProvider databaseName="farm-app.db" onInit={initDb}>
      <Tab.Navigator
        initialRouteName="crops"
        screenOptions={({ route }) => ({
          tabBarIcon: () => getTabIcon(route),
        })}
      >
        <Tab.Screen
          name="map"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="crops"
          component={CropsScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </SQLiteProvider>
  );
}
