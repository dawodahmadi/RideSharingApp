import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const MapScreen = () => {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState("We are loading your location");
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [startLocation, setStartLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert('Location Services are not enabled', 'Please enable the location services', [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else {
      setLocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        'Permission denied',
        'Allow the app to use the location services',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]
      );
    } else {
      const { coords } = await Location.getCurrentPositionAsync();
      if (coords) {
        setCurrentLocation(coords);
        const { latitude, longitude } = coords;
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        for (let item of response) {
          let address = `${item.name} ${item.city} ${item.postalCode}`;
          setDisplayCurrentAddress(address);
        }
      }
    }
  };

  const handleDestinationSelect = (data, details = null) => {
    console.log(data, details);
    setDestinationLocation(data.description);
    if (details && details.geometry && details.geometry.location) {
      setDestinationCoordinates(details.geometry.location);
    }
    console.log('Searching for:', startLocation, data.description);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        {currentLocation && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Current Location"
            />
            {destinationCoordinates && (
              <Marker
                coordinate={{
                  latitude: destinationCoordinates.latitude,
                  longitude: destinationCoordinates.longitude,
                }}
                title="Destination Location"
              />
            )}
          </MapView>
        )}
      </View>

      <Text style={styles.locationText}>Current Location:</Text>
      <Text>{displayCurrentAddress}</Text>

      <View style={styles.autocompleteContainer}>
        <Text style={styles.locationText}>Start Location:</Text>
        <GooglePlacesAutocomplete
          placeholder="Enter start location..."
          onPress={(data, details = null) => {
            console.log(data, details);
            setStartLocation(data.description);
          }}
          query={{
            key: 'AIzaSyCd1hIqJYpclBCp-ecrGTpT22fqr_-PbMw',
            language: 'en',
            components: 'country:us', // Adjust this based on your country
          }}
        />
      </View>

      <View style={styles.autocompleteContainer}>
        <Text style={styles.locationText}>Destination Location:</Text>
        <GooglePlacesAutocomplete
          placeholder="Enter destination location..."
          onPress={handleDestinationSelect}
          query={{
            key: 'AIzaSyCd1hIqJYpclBCp-ecrGTpT22fqr_-PbMw',
            language: 'en',
            components: 'country:us', // Adjust this based on your country
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    height: 200,
  },
  map: {
    flex: 1,
  },
  locationText: {
    marginBottom: 10,
    marginTop: 10,
  },
  autocompleteContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default MapScreen;
