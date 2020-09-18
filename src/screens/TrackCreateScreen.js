import React, { useContext, useCallback } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Context as LocationContext } from '../context/LocationContext';
import Map from '../components/Map';
import useLocation from '../hooks/useLocation';
import ErrorBar from '../components/ErrorBar';
import TrackForm from '../components/TrackForm';
//import '../_mockLocation';

const windowWidth = Dimensions.get('window').width;

const TrackCreateScreen = ({ navigation, route }) => {
    const { addLocation, state: { recording } } = useContext(LocationContext);
    const isFocused = useIsFocused();
    const [error] = useLocation(isFocused || recording, useCallback((location) => {
        addLocation(location, recording);
    }, [recording]));

    return (
        <View style={styles.backface}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
            {/* <SafeAreaView style={styles.container}> */}
            <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}>
                <View style={styles.elementsContainer}>

                    {/* <View style={{ 
                            marginHorizontal: 15,
                            marginTop: Platform.OS === 'android' && 30
                            }}>
                            <Text h1 h1Style={{ color: '#323c41', fontWeight: 'bold' }}>Create a Track</Text>
                        </View> */}

                    {/* <View style={styles.mapContainer}> */}
                    <Map />
                    {/* </View> */}
                    {/* <KeyboardAvoidingView
                            // keyboardVerticalOffset={Platform.OS === 'ios' && 80}
                            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
                            style={{
                                flexBasis: 200
                            }}> */}
                    {/* <View style={styles.inputContainer}> */}
                    <TrackForm inputStyle={styles.trackFormInput} recordButtonStyle={styles.recordButton} saveButtonStyle={styles.saveButton}/>
                    {/* </View> */}
                    {/* </KeyboardAvoidingView> */}
                </View>
            </TouchableWithoutFeedback>
            {error && <ErrorBar message={error} style={styles.error} />}
            {/* </SafeAreaView> */}
        </View >
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backface: {
        backgroundColor: '#fff',
        flex: 1
    },
    elementsContainer: {
        flex: 1,
        display: 'flex'
    },

    trackFormInput: {
        zIndex: 9,
        position: 'absolute',
        padding: 15,
        top: 100,
        borderRadius: 10,
        opacity: 0.9,
        width: windowWidth - 40,
        alignSelf: 'center',
        elevation: 7,
        shadowColor: '#323c41',
        shadowRadius: 5,
        shadowOpacity: 0.5,
        fontSize: 20,
        flexDirection: 'row',
        shadowOffset: {
            width: 1,
            height: 1
        },
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    recordButton: {
        zIndex: 9,
        position: 'absolute',
        bottom: 10,
        opacity: 0.9,
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        elevation: 7,
        shadowColor: '#323c41',
        shadowRadius: 5,
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    saveButton: {
        zIndex: 9,
        position: 'absolute',
        bottom: 10,
        left: 10,
        opacity: 0.9,
        width: 75,
        height: 75,
        borderRadius: 50,
        elevation: 7,
        shadowColor: '#323c41',
        shadowRadius: 5,
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    // mapContainer: {
    //     flex: 1,
    //     marginBottom: 5
    // },
    // inputContainer: {
    //     backgroundColor: Platform.OS === 'android' ? 'transparent' : '#fff'
    // },
    error: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    }
});

export default TrackCreateScreen;