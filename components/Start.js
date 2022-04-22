import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { TextInput } from "react-native-gesture-handler";

//Background image goes here when i fucking figure it out
import Image from '../assets/bg.png'

export default class Start extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
        }
    }

    // function to change bgColor
    changeBgColor = (newColor) => {
        this.setState({ bgColor: newColor });
    };

    // options of Background Colors
    colors = {
        Green: '#023020',
        Purple: '#301934',
        Blue: '#191970',
        Gray: '#36454F'
    };

    render() {
        this.props.navigation.setOptions({ title: 'Welcome To Obi-Chat' });
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={Image}
                    resizeMode='cover'
                    style={styles.backgroundImage}
                >
                    <View style={styles.container2}>
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
                                onPress={() => this.changeBgColor(this.colors.Green)}>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.color2}
                                onPress={() => this.changeBgColor(this.colors.Purple)}>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.color3}
                                onPress={() => this.changeBgColor(this.colors.Blue)}>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.color4}
                                onPress={() => this.changeBgColor(this.colors.Gray)}>
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
                </ImageBackground>

            </View >
        )
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    container2: {
        backgroundColor: 'white',
        height: '40%',
        width: '70%',
        justifyContent: 'space-around',
        alignItems: 'center',


    },
    backgroundImage: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",

    },
    nameInput: {
        borderColor: 'grey',
        borderWidth: 3,
        borderRadius: 3,
        height: 60,
        width: '75%',
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
        width: '80%'

    },
    color1: {
        backgroundColor: '#023020',
        width: 50,
        height: 50,
        borderRadius: 25
    },

    color2: {
        backgroundColor: '#301934',
        width: 50,
        height: 50,
        borderRadius: 25
    },

    color3: {
        backgroundColor: '#191970',
        width: 50,
        height: 50,
        borderRadius: 25
    },

    color4: {
        backgroundColor: '#36454F',
        width: 50,
        height: 50,
        borderRadius: 25
    },

})