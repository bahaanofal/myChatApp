import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import HomeCard from '../components/HomeCard';

export default function HomeScreen({ user, navigation }) {
    // console.log(user);
    const [users, setUsers] = useState(null);
    const getUsers = async () => {
        const querySnap = await firestore().collection('users').where('uid', '!=', user.uid).get();
        const allUsers = querySnap.docs.map(docSnap => docSnap.data());
        setUsers(allUsers);
        // console.log(allUsers);
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <FlatList
                data={users}
                renderItem={({ item }) => <HomeCard item={item} navigation={navigation} />}
                keyExtractor={(item) => item.uid}
            />
        </View>
    )
}

