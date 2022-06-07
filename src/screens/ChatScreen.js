import React, { useState, useEffect } from 'react';
import { View, ImageBackground } from 'react-native';
import { GiftedChat, Bubble, Day, InputToolbar } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

export default function ChatScreen({ user, route }) {
    const [messages, setMessages] = useState([]);
    const { uid } = route.params;

    // const getAllMessages = async () => {
    //     const docid = uid > user.uid ? user.uid + "-" + uid : uid + "-" + user.uid
    //     const querySanp = await firestore().collection('chatrooms')
    //         .doc(docid)
    //         .collection('messages')
    //         .orderBy('createdAt', "desc")
    //         .get()
    //     const allmsg = querySanp.docs.map(docSanp => {
    //         return {
    //             ...docSanp.data(),
    //             createdAt: docSanp.data().createdAt.toDate()
    //         }
    //     })
    //     setMessages(allmsg)


    // }

    useEffect(() => {
        // getAllMessages()  // not real time, you must refresh

        // to make chat in real time
        const docid = uid > user.uid ? user.uid + "-" + uid : uid + "-" + user.uid
        const messageRef = firestore().collection('chatrooms')
            .doc(docid)
            .collection('messages')
            .orderBy('createdAt', "desc")

        const unSubscribe = messageRef.onSnapshot((querySnap) => {
            const allmsg = querySnap.docs.map(docSanp => {
                const data = docSanp.data()
                if (data.createdAt) {
                    return {
                        ...docSanp.data(),
                        createdAt: docSanp.data().createdAt.toDate(),
                    }
                } else {
                    return {
                        ...docSanp.data(),
                        createdAt: new Date()
                    }
                }
            })
            setMessages(allmsg)
        })

        return () => unSubscribe()
    }, [])

    const onSend = (messageArray) => {
        const msg = messageArray[0]
        const mymsg = {
            ...msg,
            sentBy: user.uid,
            sentTo: uid,
            createdAt: new Date()
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
        const docid = uid > user.uid ? user.uid + "-" + uid : uid + "-" + user.uid

        firestore().collection('chatrooms')
            .doc(docid)
            .collection('messages')
            .add({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() })
    }



    const renderDay = (props) => {
        return <Day {...props} textStyle={{ backgroundColor: 'white', padding: 7, borderRadius: 8, color: 'gray' }} />
    }



    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../assets/chat-cover2.png')}
                resizeMode="cover"
                style={{ flex: 1, justifyContent: "center" }}>
                <GiftedChat
                    messages={messages}
                    onSend={text => onSend(text)}
                    user={{
                        _id: user.uid,
                    }}
                    renderDay={renderDay}

                    // to change the message box color
                    renderBubble={(props) => {
                        return (
                            <Bubble
                                {...props}
                                wrapperStyle={{
                                    right: {
                                        backgroundColor: '#25d366',
                                    },
                                    left: {
                                        backgroundColor: 'white'
                                    }
                                }}
                            />
                        )
                    }}

                    renderInputToolbar={(props) => {
                        return <InputToolbar {...props}
                            containerStyle={{
                                marginLeft: 15,
                                marginRight: 15,
                                borderRadius: 25
                            }} />
                    }}
                />
            </ImageBackground>
        </View>
    )
}
