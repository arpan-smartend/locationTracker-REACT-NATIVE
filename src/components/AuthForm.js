import React, { useState } from 'react';
import { View, Keyboard } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import Spacer from './Spacer';

const AuthForm = ({ headerText = 'Auth Form', errorMessage = null, submitButtonText = 'Submit', onSubmit = () => { } }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    console.log('AuthForm.js')

    return (
        <View>
            <Spacer>
                <Text h1 h1Style={{ color: '#fff', fontWeight: 'bold' }}>{headerText}</Text>
            </Spacer>
            <Spacer />
            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                labelStyle={{ color: '#fff' }}
                inputStyle={{ color: '#fff' }} />
            <Spacer />
            <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                labelStyle={{ color: '#fff' }}
                inputStyle={{ color: '#fff' }} />
            <Spacer>
                <Button title={submitButtonText}
                    buttonStyle={{ backgroundColor: '#f60' }}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={() => {
                        Keyboard.dismiss();
                        onSubmit({ email, password });
                    }} />
            </Spacer>
        </View>
    );
};


export default AuthForm;


