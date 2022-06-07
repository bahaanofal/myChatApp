import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import ChatScreen from '../screens/ChatScreen';
import firestore from '@react-native-firebase/firestore';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import BottomTab from './BottomTab';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import AccountScreen from '../screens/AccountScreen';
import Privacy from '../screens/Privacy';
import Security from '../screens/Security';
import Contactus from '../screens/Contactus';
import EditProfileScreen from '../screens/EditProfileScreen';


const Stack = createStackNavigator();

const StackNavigation = () => {
    const [user, setuser] = useState('')
    useEffect(() => {
        const unregister = auth().onAuthStateChanged(userExist => {
            if (userExist) {
                firestore().collection('users')
                    .doc(userExist.uid)
                    .update({
                        status: "online"
                    })
                setuser(userExist)
            }
            else setuser("")
        })
        return () => {unregister()}
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerTintColor: '#0C6157', headerTitleStyle: { fontWeight: 'bold' } }}>
                {user ?
                    <>
                        <Stack.Screen name="Chats">
                            {props => <BottomTab {...props} user={user} />}
                        </Stack.Screen>
                        <Stack.Screen name='chat' options={({ route }) => ({
                            title:
                                <View style={styles.chatTitle}>
                                    <Image source={{ uri: route.params.pic }} style={styles.img} />
                                    <View>
                                        <Text style={styles.title}>{route.params.name}</Text>
                                        <Text>{route.params.status == 'online' ? 'online' : 'last seen: ' + route.params.status}</Text>
                                    </View>
                                </View>
                        })}>
                            {props => <ChatScreen {...props} user={user} />}
                        </Stack.Screen>
                        <Stack.Screen name='profile'>
                            {props => <AccountScreen {...props} user={user} />}
                        </Stack.Screen>
                        <Stack.Screen name="privacy" component={Privacy} />
                        <Stack.Screen name="security" component={Security} />
                        <Stack.Screen name="contact us" component={Contactus} />
                        <Stack.Screen name="edit Profile" component={EditProfileScreen} />
                    </>
                    :
                    <>
                        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="signup" component={SignupScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="forgot Password" component={ForgotPasswordScreen} />
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    img: {
        width: 40,
        height: 40,
        marginLeft: -20,
        marginRight: 20,
        borderRadius: 20,
        backgroundColor: '#0C6157'
    },
    chatTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        color: 'black',
        fontSize: 19,
    },
});

export default StackNavigation;