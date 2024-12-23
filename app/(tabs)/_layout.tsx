import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from './(map)';
import CropsScreen from './(crops)';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      initialRouteName="crops"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'map') {
            iconName = 'map';
          } else if (route.name === 'crops') {
            iconName = 'leaf';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="map" component={MapScreen} options={{ headerShown: false }} />
      <Tab.Screen name="crops" component={CropsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
