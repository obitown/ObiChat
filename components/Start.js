import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, } from "react-native";
import { TextInput } from "react-native-gesture-handler";


export default class Start extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
        }
    }

    changeBgColor = (newColor) => {
        this.setState({ bgColor: newColor });
    };

    colors = {
        dark: '#090C08',
        purple: '#474056',
        blue: '#8A95A5',
        green: '#B9C6AE'
    };

    render() {
        this.props.navigation.setOptions({ title: 'Welcome to Obi-Chat' });
        return (
            <View style={styles.container}>
                <View style={styles.nameInput}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ name: text })}
                        value={this.state.name}
                        placeholder="Choose a name"
                    />
                </View>


                <View>
                    <Text style={styles.chooseColor}> Choose Background Color: </Text>
                </View>

                <View style={styles.colorArray}>
                    <TouchableOpacity
                        style={styles.color1}
                        onPress={() => this.changeBgColor(this.colors.dark)}>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.color2}
                        onPress={() => this.changeBgColor(this.colors.purple)}>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.color3}
                        onPress={() => this.changeBgColor(this.colors.blue)}>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.color4}
                        onPress={() => this.changeBgColor(this.colors.green)}>
                    </TouchableOpacity>
                </View>
                <Button
                    title='Start Chatting'
                    onPress={() => this.props.navigation.navigate('Chat', {
                        name: this.state.name,
                        bgColor: this.state.bgColor
                    })}
                />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameInput: {
        borderColor: 'grey',
        borderWidth: 3,
        borderRadius: 3,
        height: 60,
        width: '50%',
        margin: 10
    },
    input: {
        fontSize: 17,
        paddingTop: 10,
        textAlign: 'center'
    },
    chooseColor: {
        fontWeight: '900'
    },
    colorArray: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    color1: {
        backgroundColor: '#090C08',
        width: 50,
        height: 50,
        borderRadius: 25
    },

    color2: {
        backgroundColor: '#474056',
        width: 50,
        height: 50,
        borderRadius: 25
    },

    color3: {
        backgroundColor: '#8A95A5',
        width: 50,
        height: 50,
        borderRadius: 25
    },

    color4: {
        backgroundColor: '#B9C6AE',
        width: 50,
        height: 50,
        borderRadius: 25
    },

})