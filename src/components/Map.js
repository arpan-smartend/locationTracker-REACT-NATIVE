import React, { useContext, Fragment, useRef } from 'react';
import { StyleSheet, ActivityIndicator, Keyboard, View } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';
import { Context as LocationContext } from '../context/LocationContext';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Map = () => {

    const { state: { currentLocation, locations } } = useContext(LocationContext);
    const map = useRef(null);

    const centerCurrentLocation = () => {
        
        map.current.animateToRegion({
            ...currentLocation.coords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        }, 1000);
    };

    return (
        currentLocation
            ? (
                <Fragment>
                    <MapView
                        ref={map}
                        style={styles.mapStyle}
                        initialRegion={{
                            ...currentLocation.coords,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01
                        }}
                        region={{
                            ...currentLocation.coords,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01
                        }}
                        userLocationPriority="high"
                        tintColor="#f60"
                        showsUserLocation
                        showsTraffic
                        showsCompass
                        showsScale
                        showsBuildings
                        followsUserLocation
                        onPress={() => Keyboard.dismiss()}>
                        <Circle
                            center={currentLocation.coords}
                            radius={100}
                            strokeColor="rgba(255, 102, 0, 1.0)"
                            fillColor="rgba(255, 102, 0, 0.3)" />

                        <Polyline
                            coordinates={locations.map(({ coords }) => coords)}
                            strokeWidth={5}
                            strokeColor="#f60"
                            lineCap="round"
                            lineJoin="round"
                            geodesic
                            lineDashPattern={[5, 10]} />
                    </MapView >
                    <View style={styles.button}>
                        <TouchableOpacity onPress={centerCurrentLocation} >
                            <MaterialIcons name="my-location" size={24} color="#f60" />
                        </TouchableOpacity>
                    </View>
                </Fragment>)

            : (<ActivityIndicator size="large" />)
    );

};

const styles = StyleSheet.create({
    mapStyle: {
        flex: 1
    },
    button: {
        zIndex: 9,
        position: 'absolute',
        width: 45,
        height: 45,
        backgroundColor: '#fff',
        right: 10,
        bottom: 10,
        borderRadius: 50,
        shadowColor: '#000000',
        elevation: 7,
        shadowColor: '#323c41',
        shadowRadius: 5,
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});

export default Map;