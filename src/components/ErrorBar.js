import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorBar = ({ message, style }) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        height: 50,
        backgroundColor: 'red',
        justifyContent: 'center',
        padding: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 1,
    },
    message: {
        fontWeight: 'bold',
        color: '#fff'
    }
});

export default ErrorBar;