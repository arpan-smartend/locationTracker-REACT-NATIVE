import React, { useContext } from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context } from '../context/AuthContext';
import Spacer from '../components/Spacer';

const AccountScreen = ({ navigation, route }) => {
    
    const { signOut } = useContext(Context);
    return (
        <ImageBackground source={require('../../assets/account.jpg')} style={styles.imageBackground}>
            <View style={styles.backface}>
                <SafeAreaView style={styles.container}>
                    <Spacer>
                        <Text h1 h1Style={{ color: '#f60', fontWeight: 'bold' }}>Sorry to see you go...</Text>
                    </Spacer>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Spacer>
                            <Button title="logOut"
                                buttonStyle={{ backgroundColor: '#f60' }}
                                titleStyle={{ fontWeight: 'bold' }}
                                onPress={() => {
                                    signOut();
                                }} />
                        </Spacer>
                    </View>
                </SafeAreaView>
            </View>
        </ImageBackground>
    );

};

const styles = StyleSheet.create({
    imageBackground: {
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
    }
});

export default AccountScreen;