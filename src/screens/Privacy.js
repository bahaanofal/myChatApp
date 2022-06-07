import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrivacyCard from '../components/PrivacyCard';

export default function Privacy() {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Who can see my personal info</Text>
                <Text style={styles.text}>
                    if you dont share your Last Seen, you wont be able to see other peoples Last Seen.
                </Text>
            </View>
            <PrivacyCard title='Last seen' text='Everyone' />
            <PrivacyCard title='Profile photo' text='My contacts' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 450,
        padding: 25,
    },
    textContainer: {
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 13,
        marginTop: 10,
    },
});
