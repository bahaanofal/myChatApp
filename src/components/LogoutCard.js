import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const LogoutCard = ({ user }) => {
    return (
        <TouchableOpacity onPress={() => {
            firestore().collection('users').doc(user.uid).update({
                status: firestore.FieldValue.serverTimestamp()
            }).then(() => {
                auth().signOut()
            })
        }}>
            <View style={styles.setting}>
                <MaterialIcons name='logout' size={30} />
                <Text style={styles.title}>Logout</Text>
            </View>
        </TouchableOpacity>
    );
}

export default LogoutCard;

const styles = StyleSheet.create({
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
    title: {
        color: 'black',
        fontSize: 19,
        marginLeft: 20,
    },
});