import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

const BottomTab = ({ user }) => {

    return (
        <Tab.Navigator 
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 10,
                    right: 15,
                    left: 15,
                    backgroundColor: '#0C6157',
                    borderRadius: 15,
                    height: 60
                }
            }}
        >
            <Tab.Screen name="home" options={{
                tabBarIcon: ({focused}) => (
                    <MaterialIcons name='chat' size={28} color={focused ? 'white' : '#fff7'} />
                ),
            }}>
                {props => <HomeScreen {...props} user={user} />}
            </Tab.Screen>
            <Tab.Screen name='setting' options={{
                tabBarIcon: ({focused}) => (
                    <MaterialIcons name='account-circle' size={30} color={focused ? 'white' : '#fff7'} />
                ),
            }}>
                {props => <SettingScreen {...props} user={user} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

export default BottomTab;