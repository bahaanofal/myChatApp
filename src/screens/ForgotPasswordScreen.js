import React, { useState } from 'react'
import { View, Image, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth'


export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');

    const sendEmail = () => {
        if (!email) {
            alert('please add the email field!!');
            return;
        }
        try {
            const result = auth().sendPasswordResetEmail(email).then(() => navigation.navigate('login'));
            alert('Check your email');
        } catch (error) {
            alert('something went wrong!');
        }
    }

    return (
        <View style={{ backgroundColor: 'white', height: '100%', paddingTop: '10%' }}>
            <KeyboardAvoidingView behavior='posision'>
                <View style={styles.box1}>
                    <Image style={styles.img} source={require('../assets/forgotPassword.png')} resizeMode='cover' />
                </View>
                <View style={styles.box2}>
                    <TextInput
                        label='Email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={styles.input}
                    />
                    <Button
                        mode='contained'
                        onPress={() => sendEmail()}
                        style={{ marginTop: 20 }}>
                        send message
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}


const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        color: '#0C6157',
        margin: 10
    },
    img: {
        width: 180,
        height: 180,
        marginTop: 10
    },
    box1: {
        alignItems: 'center',

    },
    box2: {
        paddingHorizontal: 40,
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    input: {
        borderBottomColor: '#0C6157',
        backgroundColor: 'white',
        marginTop: 10,
    }
});