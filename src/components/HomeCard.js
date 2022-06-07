import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const HomeCard = ({ item, navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('chat', {
            name: item.name,
            uid: item.uid,
            pic: item.picture,
            // status: typeof(item.status) == "string" ? item.status : 'not online'
            status: typeof (item.status) == "string" ? item.status : JSON.stringify(item.status.toDate())
        })}>
            <View style={styles.myCard}>
                <Image source={{ uri: item.picture }} style={styles.img} />
                <View>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.text}>{item.email}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default HomeCard;

const styles = StyleSheet.create({
    img: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#0C6157'
    },
    text: {
        fontSize: 17,
        marginLeft: 15
    },
    title: {
        color: 'black',
        fontSize: 19,
        marginLeft: 15,
    },
    myCard: {
        display: 'flex',
        flexDirection: 'row',
        margin: 3,
        padding: 4,
        backgroundColor: 'white',
    },
});