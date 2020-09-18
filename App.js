import React, { useState, useEffect, useContext } from 'react';
import { Platform } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as AuthProvider, Context as AuthContext } from './src/context/AuthContext';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import AccountScreen from './src/screens/AccountScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import useSetHttpAuthHeader from './src/hooks/useSetHttpAuthHeader';
import { instance as axios } from './src/axios/axios_tracker';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const { Navigator: TabNavigator, Screen: TabScreen } = createBottomTabNavigator();
const { Navigator: StackNavigator, Screen: StackScreen } = createStackNavigator();

const TrackListDetails = () => {
    return (
        <StackNavigator 
            initialRouteName="TrackList"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f60'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                  },
            }}>
            <StackScreen name="TrackList" component={TrackListScreen} />
            <StackScreen name="TrackDetail" component={TrackDetailScreen} />
        </StackNavigator >
    )
};

const cacheImages = (images) => {
    return images.map(image => Asset.fromModule(image).downloadAsync());
};

const App = () => {
    const [isReady, setIsReady] = useState(false);
    const { state: { token }, autoLogin } = useContext(AuthContext);

    const loadAssets = async () => {
        const imageAssets = cacheImages([require('./assets/signIn.jpg'), require('./assets/signUp.jpg'), require('./assets/account.jpg')]);
        await Promise.all([...imageAssets]);
    };

    useSetHttpAuthHeader(axios, token);

    useEffect(() => {
        autoLogin();
    }, []);

    if (!isReady) {
        return (
            <AppLoading
                startAsync={loadAssets}
                onFinish={() => setIsReady(true)}
                onError={console.warn} />
        )
    };

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {
                    !token ? (
                        <StackNavigator
                            headerMode="none"
                            screenOptions={{ headerShown: false }}
                            initialRouteName="SignIn">
                            <StackScreen name="SignIn" component={SignInScreen} />
                            <StackScreen name="SignUp" component={SignUpScreen} />
                        </StackNavigator>
                    ) : (
                            <TabNavigator
                                initialRouteName="Tracks"
                                screenOptions={({ navigation, route: { name } }) => ({
                                    tabBarIcon: ({ focused, color, size }) => {
                                        size = focused ? 28 : 24;
                                        switch (name) {
                                            case 'Tracks':
                                                return (
                                                    <FontAwesome5 name="map-marked-alt" size={size} color={color} />
                                                )
                                            case 'Create Track':
                                                return (
                                                    <MaterialCommunityIcons name="map-plus" size={size} color={color} />
                                                )
                                            case 'Account':
                                                return (
                                                    <MaterialCommunityIcons name="account-tie" size={size} color={color} />
                                                )
                                            default: return
                                        }
                                    }
                                })}
                                tabBarOptions={{
                                    activeTintColor: '#f60',
                                    tabStyle: {
                                        justifyContent: Platform.OS === 'android' ? 'center' : 'flex-end',
                                        paddingBottom: Platform.OS === 'android' ? 5 : 0
                                    },
                                    style: {
                                        backgroundColor: '#323c41',
                                        borderTopColor: '#f60',
                                        borderTopWidth: 0.3
                                    },
                                    keyboardHidesTabBar: true
                                }}
                            >
                                <TabScreen name="Tracks" component={TrackListDetails} />
                                <TabScreen name="Create Track" component={TrackCreateScreen} />
                                <TabScreen name="Account" component={AccountScreen} />
                            </TabNavigator>
                        )
                }
            </NavigationContainer>
        </SafeAreaProvider>
    )
};

const AppContainer = () => {
    return (
        <AuthProvider>
            <LocationProvider>
                <TrackProvider>
                    <App />
                </TrackProvider>
            </LocationProvider>
        </AuthProvider>
    )
};

export default AppContainer;