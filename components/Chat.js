import React from "react";
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

//import GiftedChat
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";

//import Firebase V7.9.0
const firebase = require('firebase');
require('firebase/firestore');
require('firebase/auth')


export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: '',
                name: '',
                avatar: '',
            },
            isConnected: false,
        };

        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: "AIzaSyDW87P7jvztJ-mrumQJsoVROTz6DTOg8dw",
            authDomain: "obichat-4a6bc.firebaseapp.com",
            projectId: "obichat-4a6bc",
            storageBucket: "obichat-4a6bc.appspot.com",
            messagingSenderId: "707201180125",
            appId: "1:707201180125:web:58fdc0ec9abc07977a9634",
            measurementId: "G-N3M52XY5ML"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        this.referenceChatMessages = firebase.firestore().collection('messages');

        this.referenceChatMessagesUser = null
    }

    componentDidMount() {
        const name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });

        NetInfo.fetch().then(connection => {
            if (connection.isConnected) {
                this.setState({ isConnected: true });
                console.log('online')

                this.unsubscribe = this.referenceChatMessages
                    .orderBy('createdAt', 'desc')
                    .onSnapshot(this.onCollectionUpdate);

                this.authUnsubscribe = firebase.auth().onAuthStateChanged
                    ((user) => {
                        if (!user) {
                            firebase.auth().signInAnonymously();
                        }
                        this.setState({
                            uid: user.uid,
                            message: [],
                            user: {
                                _id: user.uid,
                                name: name,
                                avatar: 'https://placeimg.com/140/140/animals'
                            }
                        })

                        this.referenceChatMessagesUser = firebase
                            .firestore()
                            .collection('messages')
                            .where('uid', '==', this.state.uid)
                    })

                this.saveMessages();

            } else {
                console.log('offline')
                this.setState({ isConnected: false });
                this.getMessages();
            }
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
        this.authUnsubscribe();
    }

    // get messages from AsyncStorage
    async getMessages() {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    //function to send messages
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            this.addMessage();
            this.saveMessages();
        })
    }

    async saveMessages() {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch (error) {
            console.log(error.message);
        }
    }

    async deleteMessages() {
        try {
            await AsyncStorage.removeItem('messages');
            this.setState({
                messages: []
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    addMessage() {
        const message = this.state.messages[0];

        this.referenceChatMessages.add({
            uid: this.state.uid,
            _id: message._id,
            text: message.text || '',
            createdAt: message.createdAt,
            user: this.state.user,
        });
    }

    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // go through each doc
        querySnapshot.forEach((doc) => {
            // get the QueryDocumentSnapshot's data
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: data.user
            });
        });
        this.setState({
            messages,
        })
        this.saveMessages();
    }

    //function to edit bubble (backgroundColor for now)
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#0008ff'
                    },
                    left: {
                        backgroundColor: '#fff'
                    }
                }}
            />
        )
    }

    renderInputToolbar(props) {
        if (this.state.isConnected == false) {

        } else {
            return (
                <InputToolbar
                    {...props}
                />
            );
        }
    }

    render() {
        // let name = this.props.route.params.name;
        // this.props.navigation.setOptions({ title: name });

        const { bgColor } = this.props.route.params
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: bgColor
                }}
            >
                <View style={{ flex: 1 }}>
                    <GiftedChat
                        renderUsernameOnMessage={true}
                        renderBubble={this.renderBubble.bind(this)}
                        renderInputToolbar={this.renderInputToolbar.bind(this)}
                        messages={this.state.messages}
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: this.state.user._id,
                            name: this.state.name,
                            avatar: this.state.user.avatar
                        }}
                    />
                    {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
                </View>
            </View>
        )
    }
}
