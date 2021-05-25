import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { checkForToday, clearLocalNotification, setLocalNotification } from '../Notification'

class Quiz extends Component {
    state = {
        cards: [],
        currentQuestion: 0,
        score: 0,
        displayAnswer: false
    }

    componentDidMount(){
        this.setState({cards: this.props.route.params.cards})
    }

    handleQuestion = (isCorrect)=>{
        isCorrect? 
            this.setState({currentQuestion: this.state.currentQuestion+1, score: this.state.score +1, displayAnswer: false}) :
                this.setState({currentQuestion: this.state.currentQuestion+1, displayAnswer: false}) 
        checkForToday && clearLocalNotification().then(setLocalNotification)
    }

    startOver = ()=>{
        this.setState({  
            currentQuestion: 0,
            score: 0,
            displayAnswer: false}
        )
    }

    render() {
        const { cards, currentQuestion, score, displayAnswer } = this.state
        const { navigation } = this.props
        if(cards.length == 0){
            return(
                <View style={styles.container}>
                    <Text style={styles.message}>
                        Sorry, you can't take a quiz because there are no cards in the deck
                    </Text>
                </View>
            )
        }
        return (
            currentQuestion!==cards.length?
                <View style={styles.container}>
                    <Text>{currentQuestion} / {cards.length}</Text>
                    <Text style={{fontSize: 30, margin: 45 }}>{cards[currentQuestion].question}</Text>
                    <TouchableOpacity style={[styles.btn, {backgroundColor: 'purple'}]} onPress={()=> this.setState({displayAnswer: true})}>
                        <Text style={styles.text}>
                            Show Answer
                        </Text>
                    </TouchableOpacity>
                    {displayAnswer && <View><Text>{cards[currentQuestion].answer}</Text></View>}
                    <TouchableOpacity style={[styles.btn, {backgroundColor: 'blue'}]} onPress={()=>this.handleQuestion(true)}>
                        <Text style={styles.text}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}  onPress={()=>this.handleQuestion(false)}>
                        <Text style={styles.text}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.container}>
                    <Text style={styles.message}>
                        {`Your score is ${(score/cards.length)*100} % `}
                    </Text>
                    <TouchableOpacity onPress={this.startOver} style={[styles.btn, {backgroundColor: 'blue'}]}>
                        <Text style={styles.text}>
                            Start Over
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> navigation.goBack()} style={[styles.btn, {backgroundColor: 'red'}]}>
                        <Text style={styles.text}>
                            Go current deck
                        </Text>
                    </TouchableOpacity>
                </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        backgroundColor: 'red',
        padding: 15,
        margin: 10,
        borderRadius: 8
    },
    text: {
        color: 'white',
        fontSize: 25
    },
    message:{
        color: 'black',
        fontSize: 25,
        textAlign: 'center'
    }
})


export default Quiz
