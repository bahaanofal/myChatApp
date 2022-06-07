import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import SettingCard from '../components/SettingCard';
import LogoutCard from '../components/LogoutCard';

export default function SettingScreen({ user, navigation }) {
    const [profile, setProfile] = useState('');
    useEffect(() => {
        firestore().collection('users').doc(user.uid).get().then(docSnap => {
            setProfile(docSnap.data())
        });
    }, []);

    if (!profile) {
        return <ActivityIndicator size="large" color="#00ff00" />
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <TouchableOpacity onPress={() => navigation.navigate('profile', { profile: profile })}>
                <View style={styles.myCard}>
                    <Image source={{ uri: profile.picture }} style={styles.img} />
                    <View style={styles.containerText}>
                        <Text style={styles.title}>{profile.name}</Text>
                        <Text style={styles.text}>{profile.email}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <SettingCard item='privacy' icon='lock' navigation={navigation} />
            <SettingCard item='security' icon='security' navigation={navigation} />
            <SettingCard item='contact us' icon='quick-contacts-dialer' navigation={navigation} />
            <LogoutCard user={user} />
        </View>
    )
}

const styles = StyleSheet.create({
    myCard: {
        display: 'flex',
        flexDirection: 'row',
        padding: 20,
        backgroundColor: 'white',
    },
    img: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#0C6157'
    },
    containerText: {
        justifyContent: 'center'
    },
    title: {
        color: 'black',
        fontSize: 19,
        marginLeft: 20,
    },
    text: {
        fontSize: 17,
        marginLeft: 20
    },
    setting: {
        flexDirection: 'row',
        height: 70,
        paddingLeft: 20,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        opacity: 1,
        borderRadius:20,
        marginTop: 10,
        width: '90%',
        alignSelf: 'center'
    },
});