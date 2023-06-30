import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export function Maps({ route }) {
  const [markers, setMarkers] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const initialRegion = {
    latitude: 51.9225,
    longitude: 4.47917,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://stud.hosted.hr.nl/0960572/PRG07/eindopdracht.json'
        );
        const data = await response.json();

        const markersData = data.clubs.map((item, index) => ({
          key: index,
          coordinate: {
            latitude: item.latitude,
            longitude: item.longitude,
          },
          title: item.name,
        }));

        setMarkers(markersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000, // Update every 1 second
            distanceInterval: 10, // Update when the user moves by 10 meters
          },
          (location) => {
            setCurrentLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });
          }
        );
      }
    };
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (route.params && route.params.club) {
      const { latitude, longitude } = route.params.club;
      const region = {
        latitude,
        longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      mapViewRef.current.animateToRegion(region);
    }
  }, [route.params]);

  const mapViewRef = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="My Location"
            pinColor="blue"
          />
        )}

        {markers.map((marker) => (
          <Marker
            key={marker.key}
            coordinate={marker.coordinate}
            title={marker.title}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
