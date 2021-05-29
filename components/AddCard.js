import React, { Component } from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import { addCardToDeck } from '../data'
import { sendNotificationImmediately } from '../Notification'

class AddCard extends Component {
    state = {
        question: '',
        answer: '', 
    }

    handleSubmit = async (title)=>{
        await addCardToDeck(title, {question: this.state.question, answer: this.state.answer})
    }

    render() {
        const { deckName, data } = this.props.route.params
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} value={this.state.question} placeholder="Question" onChangeText={(question)=>this.setState({question})}/>
                <TextInput style={styles.input} value={this.state.answer} placeholder="Answer"  onChangeText={(answer)=>this.setState({answer})}/>
                <TouchableOpacity style={styles.btn} onPress={()=>{this.handleSubmit(deckName);this.props.navigation.navigate('Main Deck', {deckName})}}>
                    <Text style={styles.text}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        margin: 10,
        padding: 10
    },
    btn: {
        alignSelf: 'center',
        backgroundColor: 'blue',
        borderRadius: 10
    },
    text: {
        color: 'white',
        fontSize: 25,
        padding: 15,
    }
})


export default AddCard
