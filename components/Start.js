import React from "react";
import { View, Text, Pressable, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
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
                                placeholderTextColor='#595959'
                            />
                        </View>


                        <View>
                            <Text style={styles.chooseColor}> Choose Background Color: </Text>
                        </View>

                        <View style={styles.colorArray}>
                            <TouchableOpacity
                                accessibility={true}
                                accessibilityLabel='Green'
                                style={styles.color1}
                                onPress={() => this.changeBgColor(this.colors.Green)}>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessibility={true}
                                accessibilityLabel='Purple'
                                style={styles.color2}
                                onPress={() => this.changeBgColor(this.colors.Purple)}>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessibility={true}
                                accessibilityLabel='Blue'
                                style={styles.color3}
                                onPress={() => this.changeBgColor(this.colors.Blue)}>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessibility={true}
                                accessibilityLabel='Gray'
                                style={styles.color4}
                                onPress={() => this.changeBgColor(this.colors.Gray)}>
                            </TouchableOpacity>
                        </View>
                        <Pressable
                            style={styles.startButton}
                            onPress={() => this.props.navigation.navigate('Chat', {
                                name: this.state.name,
                                bgColor: this.state.bgColor,
                            })}
                        >
                            <Text>Start Chatting</Text>
                        </Pressable>
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
    startButton: {
        height: 48,
        width: '50%',
        backgroundColor: '#d2ffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
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
        textAlign: 'center',
        height: 48,
        color: '#000'
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