import React, { useState } from 'react'
import { View, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function EditProfileScreen({ navigation, route }) {
    const { profile } = route.params;
    const [email, setEmail] = useState(profile.email);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(profile.name);
    const [image, setImage] = useState(profile.picture);


    if (loading) {
        return <ActivityIndicator size="large" color="#00ff00" />
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

    const uploadEditing = (email, name, image) => {
        setLoading(true)
        if (!email || !image || !name) {
            alert("please add all the field")
            setLoading(false)
            return
        }
        try {
            firestore().collection('users').doc(profile.uid).update({
                name: name,
                email: email,
                picture: image,
            }).then(() => navigation.navigate('profile'));
            setLoading(false)
        } catch (err) {
            alert(err)
            setLoading(false)
        }
    }

    return (
        <View style={{ backgroundColor: 'white', height: '100%', paddingTop: '10%' }}>
            <KeyboardAvoidingView behavior='position'>
                <TouchableOpacity style={styles.box1} onPress={() => { pickImageAndUpload() }}>
                    <View style={styles.cameraIcon}>
                        <MaterialIcons name='photo-camera' size={30} />
                    </View>
                    <Image style={styles.img} source={{ uri: image }} resizeMode='cover' />
                </TouchableOpacity>
                <View style={styles.box2}>
                    <TextInput
                        label='Name'
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={styles.input}
                    />
                    <TextInput
                        label='Email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={styles.input}
                    />
                    <Button
                        mode='contained'
                        onPress={() => uploadEditing(email, name, image)}
                        style={{ marginTop: 20 }}>
                        Save
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
        borderRadius: 90
    },
    box1: {
        alignItems: 'center',
        position: 'relative'
    },
    box2: {
        paddingHorizontal: 40,
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    cameraIcon: {
        position: 'absolute',
        zIndex: 1,
        left: 130,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#f5f5f5',
        borderRadius: 25,
        padding: 3,
        alignItems: 'center'
    },
    input: {
        borderBottomColor: '#0C6157',
        backgroundColor: 'white',
        marginTop: 10,
    }
});