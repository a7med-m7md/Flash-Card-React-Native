import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import {saveDeckTitle } from '../data'


class AddDeck extends Component {
    state = {
        title: ''
    }

    handleDeck = async()=>{
        await saveDeckTitle(this.state.title)
        this.props.navigation.navigate("Main Deck",{deckName: this.state.title, cards: []})
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>What is the title of your new deck?</Text>
                <TextInput  style={styles.input} onChangeText={(title)=>this.setState({title})}/>
                <TouchableOpacity style={styles.btn} onPress={this.handleDeck}>
                    <Text style={[styles.text, {color: 'white'}]}>Create Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'black',
        fontSize: 20,
        alignSelf: 'center'
    },
    input: {
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        margin: 10,
        padding: 10
    },
    btn: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
})

export default AddDeck
