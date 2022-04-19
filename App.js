import React, { Component } from 'react';
import { View } from 'react-native';

//import Screens
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';

//import react native gesture handler
import 'react-native-gesture-handler';

//import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class HelloWorld extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Screen1'
        >
          <Stack.Screen
            name='Screen1'
            component={Screen1}
          />
          <Stack.Screen
            name='Screen2'
            component={Screen2}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// const styles = StyleSheet.create({

// });