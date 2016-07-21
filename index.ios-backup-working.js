/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';
import React, { Component } from 'react';
import {AsyncStorage, AppRegistry, StyleSheet, Text, View, Image} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

let Card = React.createClass({
  render() {
    return (
      <View style={[styles.card, {backgroundColor:this.props.backgroundColor || 'white', borderColor:this.props.borderColor || 'grey'}]}>
        <Text style={styles.text}>{this.props.name}</Text>
        {this.props.image && <Image style={styles.thumbnail} source={{uri:this.props.image}}/>}
        {this.props.text && <Text style={styles.cardMainText}>{this.props.text}</Text>}
      </View>
    )
  }
})

let NoMoreCards = React.createClass({
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>
        You've completed the cards for the day, congratulations!
        We'll see you tomorrow for more fun activities :)
        </Text>
      </View>
    )
  }
})


var STORAGE_KEY = 'mindsprout:cardState'

const Cards = [
  {name: 'this is activity 1', text: 'this is an activity text test', backgroundColor:'white', borderColor:'grey'},
  {name: '2', image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif', text: 'this is text test 2'},
  {name: '3', image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif'},
  {name: '4', image: 'https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif'},
  {name: '5', image: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif'},
  {name: '6', image: 'https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif'},
  {name: '7', image: 'https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif'},
  {name: '8', image: 'https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif'},
  {name: '9', image: 'https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif'}
]

const Cards2 = [
  {name: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif'},
  {name: '11', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif'},
  {name: '12', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif'},
  {name: '13', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif'}
]

let CardComponent = React.createClass({

  componentDidMount() {
    this._loadInitialState().done();
  },

  async _loadInitialState() {
    try {
      var val_from_mem = await AsyncStorage.getItem(STORAGE_KEY);
      if (val_from_mem !== null){
        this.setState({cardState: JSON.parse(val_from_mem)});
        console.log('Recovered selection from disk: ' + val_from_mem);
      } else {
        console.log('Initialized with no selection on disk.');
      }
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }

    this.refreshCardsFromState();

  },

  async _onValueChange(cardState) {
    this.setState({cardState});
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cardState));
      console.log('Saved selection to disk: ' + cardState);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  },

  getInitialState() {
    return {
      cardState: [{num: 0}, {num: 0}],
      NextCardBin: [],
      cards: [{name:'Welcome back to MindTinder!  Swipe to Start', from:'starter'}]
    }
  },

  refreshCardsFromState(){
    console.log('REFRESHCARDSFROMSTATE');
    console.log('cardstate:' + JSON.stringify(this.state.cardState));
    console.log('nextcardbin:' + JSON.stringify(this.state.NextCardBin));
    console.log('cards:' + JSON.stringify(this.state.cards));

    if (this.state.cardState[0]['num']<Cards.length){
      let el = Cards[this.state.cardState[0]['num']];
      el['from']='cards';
      this.setState({ NextCardBin: this.state.NextCardBin.concat([el]),
                      outOfCards: false});
    }
    if (this.state.cardState[1]['num']<Cards2.length){
      let el = Cards2[this.state.cardState[1]['num']];
      el['from']='cards2';
      this.setState({ NextCardBin: this.state.NextCardBin.concat([el]),
                      outOfCards: false});
    }

    this.pickNextCard();
  },

  pickNextCard(in_place=true){
    console.log('PICKNEXTCARD');
    console.log('cardstate:' + JSON.stringify(this.state.cardState));
    console.log('nextcardbin:' + JSON.stringify(this.state.NextCardBin));
    console.log('cards:' + JSON.stringify(this.state.cards));

    if (this.state.NextCardBin.length > 0){
      if (in_place){
        this.setState({cards: this.state.cards.concat([this.state.NextCardBin[Math.floor(Math.random()*this.state.NextCardBin.length)]])});
      }
      else{
        return this.state.NextCardBin[Math.floor(Math.random()*this.state.NextCardBin.length)];
      }
    }
    console.log('new cards:' + JSON.stringify(this.state.cards));

  },

  handleYup (card) {
    console.log("Success!")

    console.log('--------------------------------------------------------------------');
    console.log('success-remove card start');
    console.log('card:' + JSON.stringify(card))
    console.log('nextcardbin:' + JSON.stringify(this.state.NextCardBin));
    console.log('cards:' + JSON.stringify(this.state.cards));

    let tempNextCardBin = this.state.NextCardBin;
    let tempCards = this.state.cards;
    let tempCardState = this.state.cardState;

    let i;
    while ((i = tempNextCardBin.indexOf(card)) != -1) {
      tempNextCardBin.splice(i, 1);
    }
    while ((i = tempCards.indexOf(card)) != -1) {
      tempCards.splice(i, 1);
    }

    console.log('--------------------------------------------------------------------');
    console.log('success-add cards start');
    console.log('cardwasdeleted:' + JSON.stringify(card))
    console.log('nextcardbin:' + JSON.stringify(tempNextCardBin));
    console.log('cards:' + JSON.stringify(tempCards));

    if (card['from']=='cards') {
      console.log('___CARD FROM CARDS____');
      if (tempCardState[0]['num'] + 1 < Cards.length){
        console.log('adding element');
        tempCardState[0]['num'] += 1;
        let el = Cards[tempCardState[0]['num']];
        el['from']='cards';
        tempNextCardBin.push(el);
      }
    }
    else if (card['from']=='cards2'){
      console.log('___CARD FROM CARDS2____');
      if (tempCardState[1]['num'] + 1 < Cards2.length){
        console.log('adding element');
        tempCardState[1]['num'] += 1;
        let el = Cards2[tempCardState[1]['num']];
        el['from']='cards2';
        tempNextCardBin.push(el);
      }
    }
    else if (card['from']=='starter'){
      tempCardState = [{num: 0}, {num: 0}];
    }

    tempCards.push(tempNextCardBin[Math.floor(Math.random()*tempNextCardBin.length)]);
    console.log('--------------------------------------------------------------------');
    console.log('success-final_state');
    console.log('cardwasdeleted:' + JSON.stringify(card))
    console.log('nextcardbin:' + JSON.stringify(tempNextCardBin));
    console.log('cards:' + JSON.stringify(tempCards));

    this.setState({
      cards: tempCards,
      NextCardBin: tempNextCardBin,
      cardState: tempCardState
    });

    this._onValueChange(this.state.cardState);
  },

  handleNope (card) {
    console.log("Nope.")
    let index_cards = this.state.cards.indexOf(card);
    if (index_cards > -1){
      this.setState({ index_cards: this.state.cards.splice(index_cards, 1)});
    }
    this.pickNextCard();
  },

  cardRemoved (index) {
    //console.log(`The index is ${index}`);
  },

  render() {
    console.log('in main render');
    console.log('card:' + JSON.stringify(this.state.cards[0]));

    return (
      <SwipeCards
        cards={this.state.cards}
        loop={true}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved}
      />
    )
  }
})

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 15,
    width: 300,
    height: 500,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 5,
    elevation: 1,
  },
  thumbnail: {
    justifyContent: 'space-around',
    paddingTop: 50,
    paddingBottom: 50,
    width: 250,
    height: 250,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  cardMainText: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

class testTinder2 extends Component {
  render() {
    return (
            <CardComponent />
    );
  }
}

AppRegistry.registerComponent('testTinder2', () => testTinder2);
