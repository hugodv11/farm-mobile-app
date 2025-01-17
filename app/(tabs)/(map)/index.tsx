import { Camera, MapView, MarkerView } from "@maplibre/maplibre-react-native";
import { useEffect, useState } from "react";
import { PermissionsAndroid, Image, StyleSheet } from "react-native";
import Geolocation from "@react-native-community/geolocation";

export default function Map() {
  const [location, setLocation] = useState<any>({
    latitude: 55.6761,
    longitude: 12.5683,
  });

  const requestLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "This app needs access to your location.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  // If we can access the current location, we will show the
  // location the user setted as "home"
  const fetchLocation = async () => {
    const hasPermission = await requestLocationPermission();

    if (hasPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 },
      );
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <MapView
      style={{ flex: 1 }}
      mapStyle="https://api.maptiler.com/maps/basic-v2/style.json?key=PMK5ywsC29zKMVfrB4U4"
    >
      <Camera
        centerCoordinate={[location.longitude, location.latitude]}
        zoomLevel={15}
      />
      <MarkerView coordinate={[location.longitude, location.latitude]}>
        <Image
          source={require("@/assets/icons/tractor.png")}
          style={styles.tractorIcon}
        />
      </MarkerView>
    </MapView>
  );
}

const styles = StyleSheet.create({
  tractorIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
