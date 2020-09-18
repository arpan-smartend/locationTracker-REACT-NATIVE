import React, { useContext, useCallback } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, StatusBar, ImageBackground } from 'react-native';
import ErrorBar from '../components/ErrorBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavButton from '../components/NavButton';
import { useFocusEffect } from '@react-navigation/native';

const SignUpScreen = () => {

    const { state, signUp, clearError } = useContext(Context);
   
    useFocusEffect(
        useCallback(() => {
            clearError();
        }, [])
    );

    return (
        <ImageBackground source={require('../../assets/signUp.jpg')} style={styles.image}>
            <View style={styles.backface}>
                <SafeAreaView style={styles.container}>
                    <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
                    <TouchableWithoutFeedback
                        onPress={() => Keyboard.dismiss()}>
                        <View style={styles.elementsContainer}>
                            <AuthForm
                                headerText="SignUp"
                                errorMessage={state.error}
                                submitButtonText="Sign Up"
                                onSubmit={signUp} />
                            <NavButton
                                title="Already a User? Sign In"
                                buttonStyle={{ borderColor: '#f60' }}
                                titleStyle={{ color: '#f60', fontWeight: 'bold' }}
                                navRoute="SignIn" />
                            {state.error && <ErrorBar message={state.error} style={styles.error} />}

                        </View>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </View>
        </ImageBackground>
    );

};

const styles = StyleSheet.create({

    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center'
    },
    backface: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        flex: 1
    },
    container: {
        flex: 1,
        marginTop: 25,
    },
    elementsContainer: {
        flex: 1
    },
    error: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    }
});

export default SignUpScreen;