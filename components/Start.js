import React from "react";
import { View, Text, Button } from "react-native";

export default class Start extends React.Component {
    render() {
        let { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name })
        return (
            <View>
                {/** Rest of UI */}
            </View>
        )
    }
}