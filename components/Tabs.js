import React, { Component } from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Decks from './Decks'
import AddDeck from './AddDeck'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()
function MyTab(){
    return(
        <Tab.Navigator  screenOptions={({route})=>({
            tabBarIcon: ()=> {
                if(route.name === "Decks")
                    return <MaterialCommunityIcons name="bookshelf" size={24} color="black" />
                else if (route.name === "Add Deck")
                    return <Ionicons name="add-outline" size={24} color="black" />
            }})} tabBarOptions={{activeTintColor: 'white', inactiveTintColor: 'blue', activeBackgroundColor: 'blue', inactiveBackgroundColor: 'white'}}>
            <Tab.Screen name="Decks" component={Decks}/>
            <Tab.Screen name="Add Deck" component={AddDeck} />
        </Tab.Navigator>
    )
}

class Tabs extends Component {

    render() {
        return (
                <MyTab />
        )
    }
}




export default Tabs
