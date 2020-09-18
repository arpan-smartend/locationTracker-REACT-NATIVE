import React, { useContext, useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Context as TrackContext } from '../context/TrackContext';
import MapView, { Polyline, Marker } from 'react-native-maps';

const TrackDetailScreen = ({ navigation, route }) => {

    const { state: { tracks } } = useContext(TrackContext);
    const { _id } = route.params;
    const { name, locations } = tracks.find(item => item._id === _id);
    const initialCoords = locations[0].coords;
    const stoppingCoords = locations[locations.length - 1].coords;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: name
        })
    });

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                style={styles.mapContainer}
                initialRegion={{
                    ...initialCoords,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
            >
                <Polyline
                    coordinates={locations.map(({ coords }) => coords)}
                    strokeWidth={5}
                    strokeColor="#f60"
                    lineCap="round"
                    lineJoin="round"
                    geodesic
                    lineDashPattern={[5, 10]} />

                <Marker
                    title="Starting Point"
                    coordinate={{ ...initialCoords }}
                    pinColor="green"
                />
                 <Marker
                    title="Stopping Point"
                    coordinate={{ ...stoppingCoords }}
                />
            </MapView>
        </SafeAreaView>

    );

};

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1
    },
    container: {
        flex: 1
    },
});

export default TrackDetailScreen;