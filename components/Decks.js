import React, { Component } from 'react'
import {Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, View} from 'react-native'
import { addCardToDeck, getDeck, getDecks, saveDeckTitle } from '../data'



class Decks extends Component {
    state={
        data: []
    }


    componentDidMount(){
        this.handle()

        this.unsubscribe = this.props.navigation.addListener('tabPress', e => {
            this.handle()
      });
      this.unsubscribe2 = this.props.navigation.addListener('focus', e => {
            this.handle()
      });
    }

    componentWillUnmount(){
        this.unsubscribe()
        this.unsubscribe2()
    }


    handle = async ()=>{
        let decks = await getDecks()
        this.setState(()=>({data: [JSON.parse(decks)]}))
    }

    
    render() {
        const {data} = this.state 
        console.log(data)
        const keys = data[0] ? Object.keys(data[0]) : null
        return data[0] ? 
                ( <ScrollView>
                    {keys.map(key=> (<TouchableOpacity key={key} style={styles.container} 
                                                onPress={()=> this.props.navigation.push("Main Deck", 
                                                {deckName: key, cards: data[0][key].questions, animations: {push: {content: {translationX: {from: require('react-native').Dimensions.get('window').width,to: 0, duration: 300}}}}},
                                                
                                                )}>
                                        <Text  style={styles.name}>{key}</Text>
                                        <Text  style={styles.name}>{data[0][key].questions.length}</Text>
                                    </TouchableOpacity>
                                            )
                                        )
                    }               
                </ScrollView> )
                : (<View style={styles.noItems}><Text>No decks yet, Add your decks</Text></View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        backgroundColor: 'gray',
        alignItems: 'center',
        borderRadius: 10,
        padding: 25
    },
    name: {
        fontSize: 25,
        color: 'white',
    },
    number: {
        fontSize: 18,
    },
    noItems: {
        fontSize: 25, 
        flex: 1, justifyContent: 'center',
         alignContent: 'center'}
})

export default Decks
