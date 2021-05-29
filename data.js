import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY = "flashcard:app"
   

export const getDecks = ()=>{
    return AsyncStorage.getItem(KEY)
}

export const getDeck = async (id)=>{
    let decks = await getDecks()
    let deck = await JSON.parse(decks)
    return deck[id]
}

export const saveDeckTitle = (title)=>{
    getDecks().then(decks => {
        let data = JSON.parse(decks)
        decks = {...data, [title]: {title, questions: []}}
        AsyncStorage.setItem(KEY, JSON.stringify(decks))
    })
}


export const addCardToDeck = async (title, card)=>{
    let data = await getDeck(title)
    data = { [title]:{title, questions: [...data.questions ,card]}}
    let decks = await getDecks()
    decks = {...JSON.parse(decks),  ...data }
    await AsyncStorage.setItem(KEY, JSON.stringify(decks))
}


export function removeDeck(deckId) {
    return getDecks()
    .then((data) => {
        data = JSON.parse(data)
        if(data.length == 1)
            data = [null]
        else
            delete data[deckId]
        
        AsyncStorage.setItem(KEY, JSON.stringify(data))
    })
}