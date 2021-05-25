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
      const unsubscribe = this.props.navigation.addListener('focus', e => {
            this.handle()
      });
    }


    handle = async ()=>{
        let decks = await getDecks()
        this.setState(()=>({data: [JSON.parse(decks)]}))
    }

    
    render() {
        const {data} = this.state 
        const keys = data[0] ? Object.keys(data[0]) : null
        return data[0] ? 
                ( <ScrollView>
                    {keys.map(key=> (<TouchableOpacity key={key} style={styles.container} 
                                                onPress={()=> this.props.navigation.push("Main Deck", {deckName: key, cards: data[0][key].questions})}>
                                        <Text  style={styles.name}>{key}</Text>
                                        <Text  style={styles.name}>{data[0][key].questions.length}</Text>
                                    </TouchableOpacity>
                                            )
                                        )
                    }               
                </ScrollView> )
                : (<View><Text>Error</Text></View>)
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
    }
})

export default Decks
