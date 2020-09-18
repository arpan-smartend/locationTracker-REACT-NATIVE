import React, { useContext } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';


const TrackForm = ({ inputStyle, recordButtonStyle, saveButtonStyle }) => {

    const { state: { locationTitle, recording, locations },
        startRecording,
        stopRecording,
        setLocationTitle } = useContext(LocationContext);

    const [saveTrack] = useSaveTrack();

    return (
        <>
            {
                recording
                    ? (<TouchableOpacity onPress={stopRecording} style={recordButtonStyle}>
                        <View style={[styles.recordStartStopButton, { backgroundColor: '#323c41' }]}>
                            <MaterialCommunityIcons name="stop-circle" size={50} color="#fff" />
                        </View>
                    </TouchableOpacity>)

                    : (<TouchableOpacity onPress={startRecording} style={recordButtonStyle}>
                        <View style={[styles.recordStartStopButton, { backgroundColor: '#f60' }]}>
                            <MaterialCommunityIcons name="record-rec" size={50} color="#fff" />
                        </View>
                    </TouchableOpacity>)
            }
            <View style={inputStyle}>
                <Ionicons name="ios-navigate" size={30} color="#323c41" style={{ marginRight: 10 }} />
                <TextInput placeholder="Enter Track Name" onChangeText={setLocationTitle} value={locationTitle} style={{ flex: 1, fontSize: 20 }} />
                {
                    (!recording && locations.length)
                        ? (<TouchableOpacity onPress={saveTrack} style={{ width: 30, height: 30 }}>
                            <View style={{ marginLeft: 10 }}>
                                <MaterialCommunityIcons name="content-save" size={24} color="#f60" />
                            </View>
                        </TouchableOpacity>)
                        : null
                }
            </View>

            {
                (!recording && locations.length)
                    ? (<TouchableOpacity onPress={saveTrack} style={saveButtonStyle}>
                        <View>
                            <MaterialCommunityIcons name="content-save" size={30} color="#f60" />
                        </View>
                    </TouchableOpacity>)
                    : null
            }
        </>
    );

};

const styles = StyleSheet.create({
    recordStartStopButton: {
        borderRadius: 50,
        height: 100,
        width: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'

    }
});


export default TrackForm;