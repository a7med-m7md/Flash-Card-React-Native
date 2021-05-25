import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import AddCard from './AddCard'
import Quiz from './Quiz'
import { createStackNavigator } from '@react-navigation/stack'
import DeckView from './DeckView'

const Stack = createStackNavigator()
const MyStack = ({deckName, cards})=>{

    return (
        <Stack.Navigator>
            <Stack.Screen name="Main Deck" component={DeckView} options={{title: deckName}} initialParams={{deckName, cards}}/>
            <Stack.Screen name="Add Card" component={AddCard}/>
            <Stack.Screen name="Start Quiz" component={Quiz}/>
        </Stack.Navigator>
    )
}


class MainDeck extends Component {
    render() {
        return <MyStack deckName={this.props.route.params.deckName} cards={this.props.route.params.cards} />
    }
}


export default MainDeck
