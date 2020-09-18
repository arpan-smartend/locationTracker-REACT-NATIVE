import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import Spacer from './Spacer';

const NavButton = ({ title, navRoute, buttonStyle, titleStyle }) => {
    const navigation = useNavigation();
    
    return (
        <Spacer>
            <Button title={title}
                type="outline"
                buttonStyle={buttonStyle}
                titleStyle={titleStyle}
                onPress={() => navigation.navigate(navRoute)} />
        </Spacer>
    );
};

export default NavButton;