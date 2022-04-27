import React from "react";
import { View, Platform, KeyboardAvoidingView } from 'react-native'

//import GiftedChat
import { GiftedChat, Bubble } from "react-native-gifted-chat";


export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
        }

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

    }

    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any'
                    },
                },
                {
                    _id: 2,
                    text: `Welcome to Obi-Chat!`,
                    createdAt: new Date(),
                    system: true,
                },
            ],
        })
    }

    //function to send messages
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
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
        this.props.navigation.setOptions({ title: name });

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
                        }}
                    />
                    {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
                </View>
            </View>
        )
    }
}
