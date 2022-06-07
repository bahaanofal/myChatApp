import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Security() {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/security.png')} style={styles.img} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Messages and calls in end-to-end encrypted chats stay between you and the people you choose.
                    Not even Chats App can read or listen to them.
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
    },
    imageContainer: {
        alignItems: 'center'
    },
    img: {
        width: 150,
        height: 150,
    },
    textContainer: {
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        marginTop: 10,
    },
});
