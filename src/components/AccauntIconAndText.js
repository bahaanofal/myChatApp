import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AccountIconAndText = ({ iconName, text }) => {
    return (
        <View style={styles.row}>
            <MaterialIcons name={iconName} size={30} />
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

export default AccountIconAndText;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 23,
        marginLeft: 15,
    },
});
