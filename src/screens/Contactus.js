import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Contactus() {

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/contact-us.png')} style={styles.img} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
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
