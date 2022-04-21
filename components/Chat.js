import React from "react";
import { View, Platform, KeyboardAvoidingView } from 'react-native'

//import GiftedChat
import { GiftedChat } from "react-native-gifted-chat";


export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
        }
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
            ],
        })
    }

    //function to send messages
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
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
                    alignItems: 'center',
                    backgroundColor: bgColor
                }}
            >
                <View style={{ flex: 1 }}>
                    <GiftedChat
                        messages={this.state.messages}
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: 1,
                        }}
                    />
                    {/* {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null} */}
                </View>
            </View>
        )
    }
}
