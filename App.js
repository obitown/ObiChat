import React from 'react';

//import Screens
import Start from './components/Start';
import Chat from './components/Chat';

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
          initialRouteName='Start'
        >
          <Stack.Screen
            name='Start'
            component={Start}
            options={{ title: 'Welcome To Obi-Chat' }}
          />
          <Stack.Screen
            name='Chat'
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}