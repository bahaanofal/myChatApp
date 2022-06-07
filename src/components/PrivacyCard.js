import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const PrivacyCard = ({ title, text }) => {
    return (
        <TouchableOpacity style={styles.myCard}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

export default PrivacyCard;

const styles = StyleSheet.create({
    myCard: {
        marginTop: 25,
    },
    title: {
        fontSize: 17,
        color: 'black'
    },
    text: {
        fontSize: 14,
        
    },

});