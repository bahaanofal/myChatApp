import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SettingCard = ({ item, icon, navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate(item)}>
            <View style={styles.setting}>
                <MaterialIcons name={icon} size={30} />
                <Text style={styles.title}>{item}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default SettingCard;

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