import React, { useContext, useCallback, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { ListItem, Text, Button } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { Context as TrackContext } from '../context/TrackContext';
import Spacer from '../components/Spacer';

const TrackListScreen = ({ navigation, route }) => {


    const { state: { tracks }, fetchTracks } = useContext(TrackContext);

    useFocusEffect(
        useCallback(() => {
            fetchTracks();
        }, [])
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "My tracks"
        })
    });

    return (
        <SafeAreaView>
            {tracks.length ? (
                <FlatList
                    data={tracks}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => {
                        return (
                            <ListItem
                                bottomDivider
                                onPress={() => navigation.navigate('TrackDetail', { _id: item._id })}>
                                <ListItem.Content>
                                    <ListItem.Title>{item.name}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        )
                    }} />
            ) : (
                    <Spacer>
                        <Text h2>Create your Tracks</Text>
                        <Button title=">"
                            buttonStyle={{ backgroundColor: '#f60' }}
                            titleStyle={{ fontWeight: 'bold' }}
                            onPress={() => {
                                navigation.jumpTo('Create Track')
                            }} />
                    </Spacer>
                )}

        </SafeAreaView>
    );

};

const styles = StyleSheet.create({

});

export default TrackListScreen;