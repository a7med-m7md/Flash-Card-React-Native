import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native'
import { getDeck, removeDeck } from '../data'

class DeckView extends Component {

    state = {
        cards: [],
        deckName: '',
        pos: new Animated.ValueXY({x: -300, y: 0})
    }

    componentDidMount(){
        const unsubscribe = this.props.navigation.addListener('focus', () => {
            getDeck(this.props.route.params.deckName).then(deck=> {
                this.setState({cards: deck.questions, deckName: this.props.route.params.deckName})
            })
          });
          Animated.spring(this.state.pos, {
              toValue: {x: 0, y: 0},
              delay: 300,
              friction: 10,
              tension: 15,
              useNativeDriver: false
          }).start()

    }



    render() {
        const { deckName, cards } = this.state
        return (
            <Animated.View style={[styles.container, this.state.pos.getLayout()]}>
                <View style={styles.card} >
                    <Text style={[styles.text, {fontSize: 25, padding: 20}]}>{deckName}</Text>
                    <Text style={[styles.text, {padding: 20, alignSelf: 'center'}]}>{cards.length} Cards</Text>                    
                </View>
                <View style={{flex: 3}}>
                    <TouchableOpacity style={styles.btn} onPress={()=> this.props.navigation.navigate("Add Card", {deckName})}>
                        <Text style={styles.text}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, {backgroundColor: 'blue'}]} onPress={()=> this.props.navigation.navigate("Start Quiz", {cards})}>
                        <Text style={styles.text}>Start Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, {backgroundColor: 'red'}]} onPress={()=> {removeDeck(deckName); this.props.navigation.navigate("Decks")}} >
                        <Text style={styles.text}>Delete Deck</Text>                    
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        flex: 1,
        backgroundColor: 'purple',
        margin: 40,
        padding: 30,
        justifyContent: 'center',
        borderRadius: 10,
        textAlign: 'center'
    },
    cardName: {
        fontSize: 25
    },
    btn: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 6,
        margin: 10
    },
    text: {
        color: 'white',
        alignSelf: 'center'
    }
})


export default DeckView
