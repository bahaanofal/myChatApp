import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const ForgotPassword = ({navigation}) => {
    return (
        <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }}>
            <Text onPress={() => navigation.navigate('forgot Password')}>Fogot Password?</Text>
        </TouchableOpacity >
    );
}

export default ForgotPassword;