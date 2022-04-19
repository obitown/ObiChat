import React from "react";
import { View, Text, Button } from "react-native";

export default class Start extends React.Component {
    render() {
        // let name = this.props.route.params.name;
        // this.props.navigation.setOptions({ title: name })
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text>Hello Chat Screen</Text>
                <Button
                    title='Go to Screen 2'
                    onPress={() => this.props.navigation.navigate('Chat')}
                />
            </View>
        )
    }
}