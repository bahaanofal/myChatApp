import React, { useState } from 'react'
import { Text, View, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth'
import ForgotPassword from '../components/ForgotPassword';


export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    if (loading) {
        return <ActivityIndicator size="large" color="#00ff00" />
    }
    const userLogin = async () => {
        setLoading(true);
        if (!email || !password) {
            alert('please add the all fields!!');
            setLoading(false);
            return;
        }

        try {
            const result = await auth().signInWithEmailAndPassword(email, password);
            setLoading(false);
        } catch (error) {
            alert('something went wrong!');
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='position'>
                <View style={styles.box1}>
                    <Text style={styles.text}>Welcome To Chats App</Text>
                    <Image style={styles.img} source={require('../assets/welcome.png')} resizeMode='cover' />
                </View>
                <View style={styles.box2}>
                    <TextInput
                        label='Email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={styles.input}
                    />
                    <TextInput
                        label='Password'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                        style={styles.input}
                    />
                    <Button
                        mode='contained'
                        onPress={() => userLogin()}
                        style={{ marginTop: 20 }}>
                        Login
                    </Button>
                    <TouchableOpacity>
                        <Text
                            onPress={() => navigation.navigate('signup')} style={{ textAlign: 'center', marginTop: 20 }}>
                            Dont have an account ? Sign up
                        </Text></TouchableOpacity>
                    <ForgotPassword navigation={navigation} />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        paddingTop: '10%'
    },
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