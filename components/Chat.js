import React from "react";
import { View, Platform, KeyboardAvoidingView } from 'react-native'

//import GiftedChat
import { GiftedChat, Bubble } from "react-native-gifted-chat";

//import Firebase V7.9.0
const firebase = require('firebase');
require('firebase/firestore');


export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: '',
                name: '',

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

        this.referenceMessages = firebase.firestore().collection('messages');

    }

    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 2,
                    text: `Welcome to Obi-Chat!`,
                    createdAt: new Date(),
                    system: true,
                },
            ],
        })

        this.referenceChatMessages = firebase.firestore().collection('messages');

    }

    componentWillUnmount() {
        // this.unsubscribe();
    }

    //function to send messages
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // go through each doc
        querySnapshot.forEach((doc) => {
            // get the QueryDocumentSnapshot's data
            let data = doc.data();
            messages.push({
                _id: data._id,
                test: data.text,
                createdAt: data.createdAt.toDate(),
                user: data.user,
            });
        });
        this.setState({
            messages,
        })
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

    render() {
        let name = this.props.route.params.name;
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
                        renderBubble={this.renderBubble.bind(this)}
                        messages={this.state.messages}
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: 1,
                            name: this.state.name,

                        }}
                    />
                    {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
                </View>
            </View>
        )
    }
}
