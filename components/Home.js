import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import MainDeck from './MainDeck'
import Tabs from './Tabs'
import {askPermissions, setLocalNotification} from '../Notification'

const Stack = createStackNavigator()
function MyStack(){
    return(
            <Stack.Navigator headerMode='none'>
                <Stack.Screen name="Decks" component={Tabs} />
                <Stack.Screen name="Main Deck" component={MainDeck} />
            </Stack.Navigator>
    )
}

export class Home extends Component {
    componentDidMount(){
        setLocalNotification()
    }
    render() {
        return (
            <NavigationContainer>
                <MyStack />
            </NavigationContainer>
        )
    }
}

export default Home
