import React, { useState } from 'react'
import { Text, View, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [showNext, setShowNext] = useState(false);
    const [loading, setLoading] = useState(false);

    if (loading) {
        return <ActivityIndicator size="large" color="#00ff00" />
    }

    const userSignup = async (email, password, name, image) => {
        setLoading(true)
        if (!email || !password || !image || !name) {
            alert("please add all the field")
            setLoading(false)
            return
        }
        try {
            const result = await auth().createUserWithEmailAndPassword(email, password)
            // console.log(result);

            firestore().collection('users').doc(result.user.uid).set({
                name: name,
                email: result.user.email,
                uid: result.user.uid,
                picture: image,
                status: "online"
            }).then(() => navigation.navigate('home'));
            setLoading(false)

            // console.log('hi bahaa');
        } catch (err) {
            alert("something went wrong")
            setLoading(false)
        }
    }

    const pickImageAndUpload = () => {
        launchImageLibrary({ quality: 0.5 }, (fileobj) => {
            // console.log(fileobj.assets[0].uri);
            const uploadTask = storage().ref().child(`/userprofile/${Date.now()}`).putFile(fileobj.assets[0].uri);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (99 >= progress >= 0) setLoading(true)
                    if (progress == 100) {
                        setLoading(false)
                        alert('Image uploaded');
                    }
                },
                (error) => {
                    alert('error uploading image')
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        setImage(downloadURL);
                    });
                }
            );
        });
    };

    return (
        <View style={{ backgroundColor: 'white', height: '100%', paddingTop: '10%' }}>
            <KeyboardAvoidingView behavior='position'>
                <View style={styles.box1}>
                    <Text style={styles.text}>Create New Account</Text>
                    <Image style={styles.img} source={require('../assets/welcome.png')} resizeMode='cover' />
                </View>
                <View style={styles.box2}>
                    {!showNext &&
                        <>
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


                        </>
                    }

                    {showNext ?
                        <>
                            <TextInput
                                label='Name'
                                value={name}
                                onChangeText={(text) => setName(text)}
                                style={styles.input}
                            />
                            <Button
                                mode='contained'
                                onPress={() => { pickImageAndUpload() }}
                                style={{ marginTop: 30 }}>
                                select profile picture
                            </Button>
                            <Button
                                mode='contained'
                                disabled={image ? false : true}
                                onPress={() => userSignup(email, password, name, image)}
                                style={{ marginTop: 30 }}>
                                SignUp
                            </Button>
                        </>
                        :
                        <Button
                            mode='contained'
                            onPress={() => setShowNext(true)}
                            style={{ marginTop: 20 }}>
                            Next
                        </Button>
                    }

                    <TouchableOpacity>
                        <Text
                            onPress={() => navigation.goBack()}
                            style={{ textAlign: 'center', marginTop: 20 }}>
                            Already have an account ? Login
                        </Text>
                    </TouchableOpacity>
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