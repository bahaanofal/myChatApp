import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AccountIconAndText from '../components/AccauntIconAndText';

export default function AccountScreen({ user, route, navigation }) {
    const { profile } = route.params;
    if (!profile) {
        return <ActivityIndicator size="large" color="#00ff00" />
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: profile.picture }} style={styles.img} />
            </View>
            <View style={styles.textContainer}>
                <AccountIconAndText iconName='account-circle' text={profile.name} />
                <AccountIconAndText iconName='email' text={profile.email} />
            </View>
            <View style={styles.rowIcon}>
                <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('edit Profile', {profile: profile})} >
                    <MaterialIcons name='edit' size={30} color='white' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 450,
        justifyContent: "space-evenly",
        marginTop: 30,
    },
    imageContainer: {
        alignItems: 'center'
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: 'white',
    },
    textContainer: {
        height: 150,
        justifyContent: "space-evenly",
        paddingLeft: 30,
    },
    btn: {
        borderColor: "white",
        borderWidth: 3,
        width: '50%',
        marginLeft: '24%',
        backgroundColor: '#707070'
    },
    rowIcon: {
        flexDirection: 'row-reverse',
    },
    editIcon: {
        backgroundColor: 'red',
        padding: 10,
        marginRight: 15,
        backgroundColor: 'gray',
        borderRadius: 10,
    }

});
