/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';
import React, { Component } from 'react/addons';
import {AsyncStorage, AppRegistry, StyleSheet, Text, View, Image} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

import Video from 'react-native-video';
import YouTube from 'react-native-youtube';
var _ = require('lodash');

let Card = React.createClass({
  render() {
    return (
      <View style={[styles.card, {backgroundColor:this.props.backgroundColor || 'white', borderColor:this.props.borderColor || 'grey'}]}>
        <Text style={styles.text}>{this.props.name}</Text>

        {this.props.image && <Image style={styles.thumbnail} source={{uri:this.props.image}}/>}

        {this.props.video && <Video source={{uri: this.props.video}} // Can be a URL or a local file. 
            rate={1.0}                   // 0 is paused, 1 is normal. 
            volume={1.0}                 // 0 is muted, 1 is normal. 
            muted={false}                // Mutes the audio entirely. 
            paused={false}               // Pauses playback entirely. 
            resizeMode="cover"           // Fill the whole screen at aspect ratio. 
            repeat={false}                // Repeat forever. 
            style={styles.backgroundVideo} />}

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

const activities = [

{id: 'gmi', name: 'Gross Motor Imitation', prereqs:[], max_daily_cards: 20,
 progression:[
      {
      id: 'probe', num_presentations: 3, day_break_if_no_move: true,
      card: {name: 'GMI 1', text: 'this is an activity text test', backgroundColor:'white', borderColor:'grey'},
      logic:[ {total_errors: 3, consec_errors: 2, goto: null, day_break: false},
              {total_success: 3, consec_success: null, goto: 'ppromt1', day_break:false} ]
      },

      {
      id: 'pprompt1', num_presentations: 4, day_break_if_no_move: false,
      card: {name: 'GMI 2', text: 'this is an activity text test 2', backgroundColor:'white', borderColor:'grey'},
      logic:[ {total_errors: 3, consec_errors: null, goto: 'probe', day_break: false},
              {total_success: null, consec_success: 2, goto: 'pprompt2', day_break:false} ]
      },

      {
      id: 'pprompt2', num_presentations: 5, day_break_if_no_move: false,
      card: {name: 'GMI 3', text: 'this is an activity text test 3', backgroundColor:'white', borderColor:'grey'},
      logic:[ {total_errors: null, consec_errors: 2, goto: 'pprompt1', day_break: false},
              {total_success: 4, consec_success: null, goto: 'indep', day_break:false} ]
      },

      {
      id: 'indep', num_presentations: 2, day_break_if_no_move: false,
      card: {name: 'GMI Mastery', text: 'this is mastery activity', backgroundColor:'white', borderColor:'grey'},
      logic:[ {total_errors: null, consec_errors: 2, goto: 'pprompt2', day_break: true},
              {total_success: 2, consec_success: null, goto: null, day_break:false} ]
      }
 ]},

{id: 'gmi2', name: 'Gross Motor Imitation 2', prereqs:['gmi'], max_daily_cards: 20,
 progression:[
      {
      id: 'probe', num_presentations: 3, day_break_if_no_move: true,
      card: {name: 'GMI2 1', text: 'this is an activity text test', backgroundColor:'white', borderColor:'grey'},
      logic:[ {total_errors: 3, consec_errors: 2, goto: null, day_break: false},
              {total_success: 3, consec_success: null, goto: 'ppromt1', day_break:false} ]
      },

      {
      id: 'pprompt1', num_presentations: 4, day_break_if_no_move: false,
      card: {name: 'GMI2 2', text: 'this is an activity text test 2', backgroundColor:'white', borderColor:'grey'},
      logic:[ {total_errors: 3, consec_errors: null, goto: 'probe', day_break: false},
              {total_success: null, consec_success: 2, goto: 'pprompt2', day_break:false} ]
      },

      {
      id: 'pprompt2', num_presentations: 5, day_break_if_no_move: false,
      card: {name: 'GMI2 3', text: 'this is an activity text test 3', backgroundColor:'white', borderColor:'grey'},
      logic:[ {total_errors: null, consec_errors: 2, goto: 'pprompt1', day_break: false},
              {total_success: 4, consec_success: null, goto: 'indep', day_break:false} ]
      },

      {
      id: 'indep', num_presentations: 2, day_break_if_no_move: false,
      card: {name: 'GMI2 Mastery', text: 'this is mastery activity', backgroundColor:'white', borderColor:'grey'},
      logic:[ {total_errors: null, consec_errors: 2, goto: 'pprompt2', day_break: true},
              {total_success: 2, consec_success: null, goto: null, day_break:false} ]
      }
 ]},

{id: 'vowels', name: 'Gross Motor Imitation', prereqs:[], max_daily_cards: 20,
 progression:[
      {
      id: 'probe', num_presentations: 3, day_break_if_no_move: true,
      card: {name: 'V 1', text: 'this is an activity text test', backgroundColor:'white', borderColor:'grey'},
      logic:[ {total_errors: 3, consec_errors: 2, goto: null, day_break: false},
              {total_success: 3, consec_success: null, goto: 'ppromt1', day_break:false} ]
      },

      {
      id: 'pprompt1', num_presentations: 4, day_break_if_no_move: false,
      card: {name: 'V 2', text: 'this is an activity text test 2', backgroundColor:'white', borderColor:'grey'},
      logic:[ {total_errors: 3, consec_errors: null, goto: 'probe', day_break: false},
              {total_success: null, consec_success: 2, goto: 'pprompt2', day_break:false} ]
      },

      {
      id: 'pprompt2', num_presentations: 5, day_break_if_no_move: false,
      card: {name: 'V 3', text: 'this is an activity text test 3', backgroundColor:'white', borderColor:'grey'},
      logic:[ {total_errors: null, consec_errors: 2, goto: 'pprompt1', day_break: false},
              {total_success: 4, consec_success: null, goto: 'indep', day_break:false} ]
      },

      {
      id: 'indep', num_presentations: 2, day_break_if_no_move: false,
      card: {name: 'V Mastery', text: 'this is mastery activity', backgroundColor:'white', borderColor:'grey'},
      logic:[ {total_errors: null, consec_errors: 2, goto: 'pprompt2', day_break: true},
              {total_success: 2, consec_success: null, goto: null, day_break:false} ]
      }
 ]}
]

const independent_activities = [
  {
  id: 'ind_act_1', mastered_skills: ['gmi'], active_skills: ['gmi2'],
  partial_skills: [{progression_id: 'gmi2', card_id: 'pprompt2'}],
  frequency_days: 3,
  card: {name: 'independent activity', text: 'this is independent gmi2 activity', backgroundColor:'white', borderColor:'grey'}
  },
  {
  id: 'ind_act_2', mastered_skills: [], active_skills: [],
  partial_skills: [],
  frequency_days: 4,
  card: {name: 'independent activity', text: 'this is independent anytime activity', backgroundColor:'white', borderColor:'grey'}
  }
]

//////////////////////////HELPER FUNCTIONS/////////////////////////////////
//
//////////////////////////////////////////////////////////////////////////
function get_card_index(activity_id, card_id) {
  //return card index in activity.[id = activity_id].progression

  var activity = get_activity(activity_id);

  for (var i in activity.progression) {
    if (activity.progression[i].id == card_id) {
        //found the card

        return i;
    }
  }

  return null;
}


function get_card_id_from_index(activity_id, index) {
  //return card_id for an activity and index number in the progression
  var activity = get_activity(activity_id);
  return activity.progression[index].id;
}


function get_activity(activity_id, copy=false){
  //return the card object from the activities array.  Careful this will
  //mutate original if you edit the returned object with copy=false.

  for (var i in activities){
    if (activities[i].id == activity_id){
      //found the activity

      if (copy) {
        return Object.assign({}, activities[i]);
      } else {
        return activities[i];
      }

    }
  }

  return null;
}


function get_card(activity_id, card_id, copy=false){
  //return the card object from the activities array.  Careful this will
  //mutate original if you edit the returned object with copy=false.

  var activity = get_activity(activity_id);

  for (var i in activity.progression) {
    if (activity.progression[i].id == card_id) {
        //found the card

      if (copy) {
        return Object.assign({}, activity.progression[i]);
      } else {
        return activity.progression[i];
      }
    }
  }

  return null;
}


function get_independent_activity(id, copy=false){
  //return the card object from the activities array.  Careful this will
  //mutate original if you edit the returned object with copy=false.

  for (var i in independent_activities){
    if (independent_activities[i].id == id){
      //found the activity

      if (copy) {
        return Object.assign({}, independent_activities[i]);
      } else {
        return independent_activities[i];
      }

    }
  }

  return null;
}


function activity_to_cardbin_obj(activity_id, card_id, probability_rank) {
  //take a card object from a progression and put it in the form for cardBin

  var card = get_card(activity_id, card_id, true);

  if (card != null){
    //edit the card for the right format
    card.activity_id = activity_id;
    card.card_id = card_id;
    card.probability_rank = probability_rank;
    card.prev_trial_success = [];
    card.still_to_show = card.num_presentations;

    delete card.num_presentations;
    delete card.logic;
    delete card.day_break_if_no_move;
    delete card.id;

    return card;
  }

  return null;
}


function independent_activity_to_cardbin_obj(independent_card_id, probability_rank){
  //take a card object from an independent activity and put it in the form for cardBin

  var card = get_independent_activity(independent_card_id, true);

  if (card != null){
  //edit the card for the right format
    card.activity_id = 'independent';
    card.card_id = independent_card_id;
    card.probability_rank = probability_rank;
    card.prev_trial_success = [];
    card.still_to_show = 1;

    delete card.frequency_days;
    delete card.mastered_skills;
    delete card.active_skills;
    delete card.partial_skills;
    delete card.id;

    return card;
  }

  return null;
}


function get_progression_length(activity_id) {
   //returns length of activity progression of progression id in activity
   //array, otherwise returns zero
   for (var i in activities) {
       if (activities[i].id == activity_id){
          return activities[i].progression.length;
       }
   }

   return 0;
}


function consec_number(array_to_check, number){
    //return length of longest streak of consecutive occurances of
    //number in array_to_check
    let maxLength = 0;
    let tempLength = 0;

    for (let i in array_to_check){
        if (array_to_check[i] == number){
            tempLength += 1;
        } else {
            tempLength = 0;
        }

        if (tempLength > maxLength) {
            maxLength = tempLength;
        }
    }

    return maxLength;
}

/*
var cardState = [
  {activity_id: 'gmi', state: 'mastered', curr_card_id: null,
    last_active_date: null, num_cards_on_last_active_date: 0,
    prev_card_id: null, prev_activity_complete_date: null, mastery_date: null,
    num_skipped: [5,2,0,1], num_failed: [1,2,6,1], num_success: [3,2,4,3]
  },

  {activity_id: 'gmi2', state: 'not_active', curr_card_id: null,
    last_active_date: null, num_cards_on_last_active_date: 0,
    prev_card_id: null, prev_activity_complete_date: null, mastery_date: null,
    num_skipped: [0,0,0,0], num_failed: [0,0,0,0], num_success: [0,0,0,0]
  },

  {activity_id: 'vowels', state: 'active', curr_card_index: 'pprompt2',
    last_active_date: null, num_cards_on_last_active_date: 0,
    prev_card_id:'pprompt1',  prev_activity_complete_date: null, mastery_date: null,
    num_skipped: [4,2,0,0], num_failed: [0,4,0,0], num_success: [3,2,0,0]
  },
  {activity_id: 'independent',
    card_ids: ['ind_act_1', 'ind_act_2'],
    last_date_shown: [null, null]
  }
]
    //new Date() gives date of now

var cardBin = [
  { activity_id: 'gmi', card_id: 'probe',
    probability_rank: 1, still_to_show: 1, prev_trial_success: [1, 0, 1],
    card: {name: 'V 1', text: 'this is an activity text test', backgroundColor:'white', borderColor:'grey'},
  },

  { activity_id: 'gmi2', card_id: 'probe',
    probability_rank: 3, still_to_show: 3, prev_trial_success: [0],
    card: {name: 'V 1', text: 'this is an activity text test', backgroundColor:'white', borderColor:'grey'},
  },

  { activity_id: 'vowels', card_id: 'probe',
    probability_rank: 1, still_to_show: 5, prev_trial_success: [],
    card: {name: 'V 1', text: 'this is an activity text test', backgroundColor:'white', borderColor:'grey'},
  }
]
*/

let CardComponent = React.createClass({

  componentDidMount() {
    this._loadInitialState().done();
  },


  async _loadInitialState() {

    try {
      var val_from_mem = await AsyncStorage.getItem(STORAGE_KEY);

      if (val_from_mem !== null){
          var newState = React.addons.update(this.state, {
                cardState: {$merge: JSON.parse(val_from_mem)}
          });

      this.setState(newState);

      console.log('cardState after load: ' + JSON.stringify(this.state.cardState));

      this.initCardBin();
      console.log('cardBin after init: ' + JSON.stringify(this.state.cardBin));

      var newState = React.addons.update(this.state, {
        cards:  {$push: this.pickNextCards(2)}
      });

      this.setState(newState);

      //console.log('Recovered selection from disk: ' + val_from_mem);

      } else {
        console.log('Initialized with no selection on disk.');
      }

    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }

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
      timer: Date.now(),
      cardState: this.initCardState(),
      cardBin: [],
      cards: [{name:'Welcome back to MindTinder!  Swipe to Start', video:'/Users/davidramsay/mindsproutOther/Fill-in-blank.mov'}]
    }
  },


  initCardState() {
    console.log('--init cardState');
    //create empty cardState array by looking at activity progressions in
    //activty array

    let cardState = [];

    //create all activities
    activities.forEach( function(activity) {

        //create zero array of proper length
        let progression_length = get_progression_length(activity.id);
        let zeroArray = Array.apply(null, Array(progression_length)).fill(0);

        cardState.push({activity_id: activity.id,
                        state: 'not_active',
                        curr_card_id: null,
                        last_active_date: null,
                        num_cards_on_last_active_date: 0,
                        prev_card_id: null,
                        prev_activity_complete_date: null,
                        mastery_date: null,
                        num_skipped: zeroArray,
                        num_failed: zeroArray,
                        num_success: zeroArray
        });
    });

    //create independent activities
    var card_ids = [];
    independent_activities.forEach( function(activity) {
        card_ids.push(activity.id);
    });

    cardState.push({activity_id: 'independent', card_ids: card_ids,
                    last_dates_shown: Array.apply(null, Array(card_ids.length)).fill(null)});


    return cardState;
  },


  getCardStateActivity(activity_id, copy=false){
    //return the card object from the activities array.  Careful this will
    //mutate original if you edit the returned object with copy=false.

    for (let i in this.state.cardState){
        if (this.state.cardState[i].activity_id == activity_id){
        //found the activity

        if (copy) {
            return Object.assign({}, this.state.cardState[i]);
        } else {
            return this.state.cardState[i];
        }

        }
    }

    return null;
  },

  getCardStateActivityWithIndex(activity_id){
    //return a copy of the card object from the activities array.
    //and its index, so it can be $merged over top

    for (let i in this.state.cardState){
        if (this.state.cardState[i].activity_id == activity_id){
            //found the activity
            return [i, Object.assign({}, this.state.cardState[i])];
        }
    }

    return null;
  },


  getSkills(state='mastered'){
    //return array of mastered, active, or not_active skill activity ids
    //depending on what state is passed ('mastered', 'active', 'not_active'
    let return_array = [];
    for (let i in this.state.cardState){
        if (this.state.cardState[i].state == 'mastered') {
            return_array.push(this.state.cardState[i].activity_id);
        }
    }

    return return_array;
  },


  comparePartialActiveSkills(partialActiveSkillArray){
    //return true if we have the partially active skills required.
    //expects [{activity_id: 'gmi2', card_id: 'pprompt2'}, {}]
    let have_reqs = true;

    for (let i in partialActiveSkillArray) {
      cardStateActivity = this.getCardStateActivity(partialActiveSkillArray[i].activity_id)
      //check if we haven't started the skill
      if (cardStateActivity.state == 'not_active') {have_reqs = false;}
      //compare where we are in the progression if it is active
      if (cardStateActivity.state == 'active' &&
          get_card_index(partialActiveSkillArray[i].activity_id, partialActiveSkillArray[i].card_id) <
          get_card_index(partialActiveSkillArray[i].activity_id, cardStateActivity.curr_card_id)) {

            have_reqs = false;
      }
    }

    return have_reqs;
  },


  rankProb(activity_id, card_id){
    //return a number (1-10) giving the priority of this card.
    //for now, look at how many times the skill has been skipped away and dock
    //a point for each one

    return 1;
  },


  skillNotDailyMax(activity_id){
    //check if a skill is at it's daily max or not, True if not at max, False
    //if maxed out for the day
    //also tracks day breaks- day breaks automatically set # of cards 'seen' for
    //skill for the day to max_daily_allowed

    for (let i in this.state.cardState){
        if (this.state.cardState[i].activity_id == activity_id) {

            let today = new Date();

            if (this.state.cardState[i].last_active_date == null) {
                return true; //no date last used, so not maxed out
            }
            else if (this.state.cardState[i].last_active_date.toDateString() ==
                     today.toDateString()) {

                if (this.state.cardState[i].num_cards_on_last_active_date <
                    get_activity(activity_id).max_daily_cards) {
                    return true; //used today, not maxed out today
                } else { return false;} //used today, maxed out today

            }
            else { return true;} //used another day, not today
        }
    }

    return null;
  },


  checkPassedCardStateObj_NotDailyMax(cardStateObj){
    //check if a skill is at it's daily max or not, True if not at max, False
    //if maxed out for the day
    //also tracks day breaks- day breaks automatically set # of cards 'seen' for //skill for the day to max_daily_allowed

    let today = new Date();

    if (cardStateObj.last_active_date == null) {
        return true; //no date last used, so not maxed out
    }
    else if (cardStateObj.last_active_date.toDateString() ==
                today.toDateString()) {

        if (cardStateObj.num_cards_on_last_active_date <
            get_activity(cardStateObj.activity_id).max_daily_cards) {
            return true; //used today, not maxed out today
        } else { return false;} //used today, maxed out today

    }
    else { return true;} //used another day, not today

    return null;
  },


  initCardBin(){
    console.log('--init cardBin');
    let cardBin = [];

    let mastered_skills = this.getSkills('mastered');
    let active_skills = this.getSkills('active');

    console.log('mastered skills: ' + JSON.stringify(mastered_skills));
    console.log('active skills: ' + JSON.stringify(active_skills));

    //pull activities that are not mastered that we have mastered skills for
    for (let i in this.state.cardState) {
        //add active skill cards
        if (this.state.cardState[i].state == 'active') {
            let a_id = this.state.cardState[i].activity_id;
            let c_id = this.state.cardState[i].curr_card_id;

            if (this.skillNotDailyMax(a_id)) {
                cardBin.push(activity_to_cardbin_obj(a_id, c_id, this.rankProb(a_id, c_id)));
            }
        }
        //add not_active skills that we have the prereqs for to cards
        if (this.state.cardState[i].state == 'not_active'){

            let a_id = this.state.cardState[i].activity_id;
            let c_id = get_card_id_from_index(a_id, 0);

            console.log('found not_active activity and first card: ' + a_id + ' ' + c_id);

            //check prereqs
            let prereqs = get_activity(this.state.cardState[i].activity_id).prereqs;
            if(prereqs.length === _.intersection(prereqs, mastered_skills).length) {

              console.log('len prereqs match mastered skills');

              if (this.skillNotDailyMax(a_id)){
                console.log('not at daily max');
                cardBin.push(activity_to_cardbin_obj(a_id, c_id, this.rankProb(a_id, c_id)));
              }
            }
        }

        //independent activities we have prereqs for
        if (this.state.cardState[i].activity_id == 'independent') {
            for (let j in this.state.cardState[i].card_ids){

                let activity = get_independent_activity(this.state.cardState[i].card_ids[j]);
                let last_date_presented = this.state.cardState[i].last_dates_shown[j];
                let today = new Date();

                if ((activity.mastered_skills.length === _.intersection(activity.mastered_skills, mastered_skills).length)
                    && (activity.active_skills.length === _.intersection(activity.active_skills, active_skills).length)
                    && this.comparePartialActiveSkills(activity.partial_skills)
                    && (activity.frequency_days*24*60*60*1000 < (today-last_date_presented))){

                    cardBin.push(independent_activity_to_cardbin_obj(this.state.cardState[i].card_ids[j], 3));
                }
            }
        }
    }

    var newState = React.addons.update(this.state, {
        cardBin: {$set: cardBin},
        cards:  {$push: this.pickNextCards(2)}
    });

    this.setState(newState);
    console.log('after cardBin init, cardBin: ' + this.state.cardBin);
  },

  getIndependentActivitiesNotInCardBin(){

    let toCardBin = [];

    let mastered_skills = this.getSkills('mastered');
    let active_skills = this.getSkills('active');
    let indepCardState = this.getCardStateActivity('independent');

    //independent activities we have prereqs for
    for (let i in indepCardState.card_ids){

        let activity = get_independent_activity(indepCardState.card_ids[i]);
        let last_date_presented = indepCardState.last_dates_shown[i];
        let today = new Date();

        if ((activity.mastered_skills.length === _.intersection(activity.mastered_skills, mastered_skills).length)
            && (activity.active_skills.length === _.intersection(activity.active_skills, active_skills).length)
            && this.comparePartialActiveSkills(activity.partial_skills)
            && (activity.frequency_days*24*60*60*1000 < (today-last_date_presented))){

            let matchedCard = independent_activity_to_cardbin_obj(indepCardState.card_ids[i], 3);

            let newCard = true;
            for (let j in this.state.cardBin){
                if (this.state.cardBin[j].activity_id == matchedCard.activity_id
                    && this.state.cardBin[j].card_id == matchedCard.card_id) {
                    newCard = false;
                }
            }

            if (newCard){
                toCardBin.push(matchedCard);
            }
        }
    }
  return toCardBin;
  },


  getCardBinObjFromCard(card){
    //return index of card in cardBin, and cardBin copy, given card
    //so it can be $merged later
    console.log(card);

    for (let i in this.state.cardBin){
        if (this.state.cardBin[i].card == card){
            //found the card
            return [i, Object.assign({}, this.state.cardBin[i])];
        }
    }

    return null;
  },

  updatePassedCardStateObj_activeDate(cardStateObj){
    //takes passed cardState entry and in-place updates
    //last_active_date and num_cards_on_last_active_date
    let today = new Date();

    if (cardStateObj.last_active_date == null){
        cardStateObj.last_active_date = new Date();
        cardStateObj.num_cards_on_last_active_date = 1;
    } else if (cardStateObj.last_active_date.toDateString() == today.toDateString()){
        cardStateObj.num_cards_on_last_active_date += 1;
    } else {
        cardStateObj.last_active_date = new Date();
        cardStateObj.num_cards_on_last_active_date = 1;
    }
  },

  updatePassedCardStateObj_cardId(cardStateObj, card_id){
    //takes passed cardState entry and in-place updates
    //curr_card_id, prev_card_id, and prev_card_complete_date

    if (cardStateObj.curr_card_id != card_id){
      cardStateObj.prev_card_id = cardStateObj.curr_card_id;
      cardStateObj.prev_activity_complete_date = new Date();
      cardStateObj.curr_card_id = card_id;
    }
  },


  updatePassedCardStateObj_successFail(cardStateObj, card_id, successFail){
    //takes passed cardState entry and in-place updates
    //curr_card_id, prev_card_id, prev_card_complete_date, and
    //num_skipped, num_success, num_failed
    //change state to active if not

    this.updatePassedCardStateObj_activeDate(cardStateObj);
    this.updatePassedCardStateObj_cardId(cardStateObj, card_id);

    if (cardStateObj.state == 'not_active') {
        cardStateObj.state = 'active';
    }

    let index = get_card_index(cardStateObj.activity_id, card_id);

    switch(successFail){
        case 'success':
            cardStateObj.num_success[index] +=1;
            break;
        case 'failed':
            cardStateObj.num_failed[index] +=1;
            break;
        case 'skipped':
            cardStateObj.num_skipped[index] +=1;
            break;
        default:
            console.log('ERROR- improper request, cardState not updated');
    }

  },

  updatePassedCardBinObj_successFail(cardBinObj, successFail){
    //takes passed cardBin entry and in-place updates
    //prev_trial_success, still_to_show, and prob_rank
    //based on card action

    switch(successFail){
        case 'success':
            cardBinObj.prev_trial_success.push(1);
            cardBinObj.still_to_show -= 1;
            break;
        case 'failed':
            cardBinObj.prev_trial_success.push(0);
            cardBinObj.still_to_show -= 1;
            break;
        case 'skipped':
            cardBinObj.probability_rank +=1;
            break;
        default:
            console.log('ERROR- improper request, cardBin not updated');
    }

  },

  cardLogic(cardBinObj, cardStateObj){
    //update cardStateObj given cardBinObj and logic
    //return True if mastered skill, return False if just changed card

    a_id = cardBinObj.activity_id;
    c_id = cardBinObj.card_id;
    trials = cardBinObj.prev_trial_success;

    let total_successes = trials.reduce(function(a, b) { return a + b; }, 0);
    let total_errors = trials.length - total_success;
    let consec_success = consec_number(trials, 1);
    let consec_errors = consec_number(trials, 0);

    let curr_card = get_card(a_id, c_id);
    let logic = curr_card.logic;
    let last_card = (get_progression_length(a_id) - 1  == get_card_index(a_id, c_id));
    let first_card = (0 == get_card_index(a_id, c_id));

    let next_card = c_id;
    let day_break = curr_card.day_break_if_no_move;

    if ((total_errors >= logic[0].total_errors && logic[0].total_errors != null)
        || (consec_errors >= logic[0].consec_errors && logic[0].consec_errors != null)) {
       next_card = logic[0].goto;
       day_break = logic[0].day_break;
    }
    if ((total_success >= logic[1].total_success && logic[1].total_success != null)
        || (consec_success >= logic[1].consec_success && logic[1].consec_success != null)) {
       next_card = logic[1].goto;
       day_break = logic[1].day_break;
    }

    //update cardStateObj - if day_break, set day to today and num to max
    if (day_break) {
        cardStateObj.last_active_date = new Date();
        cardStateObj.num_cards_on_last_active_date = get_activity(a_id).max_daily_cards; 
    }

    //set current_card to this card
    this.updatePassedCardStateObj_cardId(cardStateObj, next_card);

    //if null and first card, setState to not_active and set num to max
    if (first_card && next_card == null){
        cardStateObj.last_active_date = new Date();
        cardStateObj.num_cards_on_last_active_date = get_activity(a_id).max_daily_cards; 
        cardStateObj.state = 'not_active';
    }

    //if null and last card, setState to mastered and return true,
    //otherwise return false
    if (last_card && next_card == null){
        cardStateObj.state = 'mastered';
        cardStateObj.mastery_date = new Date();
        return true;
    }else {
        return false;
    }

  },


  handleCardEvent(card, successFail) {
    
    console.log('--handle cards ' + successFail);

    //get copy of cardBin and cardState objects, with index, so we can merge over
    //top of original in cardBin and cardState
    let cardBinReturn = this.getCardBinObjFromCard(card);

    if (cardBinReturn == null){//cant find card in cardBin (initial card)

        var newState = React.addons.update(this.state, {
            cards: {$splice: [[0, 1]]},
            timer: {$set: Date.now()}
        });

        newState.cards.push(this.pickNextCards(1));
        this.setState(newState);
        return;
    }

    let cardBinIndex = cardBinReturn[0];
    let cardBinObj = cardBinReturn[1];

    let cardStateReturn = this.getCardStateActivityWithIndex(cardBinObj.activity_id);
    let cardStateIndex = cardStateReturn[0];
    let cardStateObj = cardStateReturn[1];

    console.log('got cardStateObj: ' + JSON.stringify(cardStateObj));
    console.log('got cardBinObj: ' + JSON.stringify(cardBinObj));

    //handle independent and normal cards differently
    if (cardBinObj.activity_id == 'independent'){
      //independent activity just needs to be updated when it
      //was last shown in cardState and removed from cardBin

      //update cardState
      let index = cardStateObj.card_ids.indexOf(cardBinObj.card_id);
      cardStateObj.last_dates_shown[index] = new Date();

      //remove from cardBin
      var newState = React.addons.update(this.state, {
            cardState: {$splice: [[cardStateIndex, 1, cardStateObj]]},
            cardBin: {$splice: [[cardBinIndex, 1]]},
            cards: {$splice: [[0, 1]]},
            timer: {$set: Date.now()}
      });

      newState.cards.push(this.pickNextCards(1));
      this.setState(newState);
      this._onValueChange(this.state.cardState);
      return;

    } else { //not independent activity

        //--update cardState simply--
        //(num_skipped/num_success/num_failed for current card,
        //+1 for cards on active date and active date
        //update curr_card_id if necessary and push prev_id to fields)
        this.updatePassedCardStateObj_successFail(cardStateObj, cardBinObj.card_id, successFail);

        //--update cardBin simply--
        //add in success/fail if given and subtract one from still_to_show
        //if skipped, subtract one from prob_rank
        this.updatePassedCardBinObj_successFail(cardBinObj, successFail);

        if (cardBinObj.still_to_show > 0){
            //still showing this card.  No big logic changes, just
            //make sure we haven't hit max_daily_cards for skill
            //(and if so, remove from cardBin)

            if (this.checkPassedCardStateObj_NotDailyMax(cardStateObj)){

                console.log('no big logic change, updated cardStateObj: ' + JSON.stringify(cardStateObj));
                console.log('updated cardBinObj: ' + JSON.stringify(cardBinObj));
                console.log(cardStateIndex);
                console.log(cardBinIndex);
                var newState = React.addons.update(this.state, {
                    cardState: {$splice: [[cardStateIndex, 1, cardStateObj]]},
                    cardBin: {$splice: [[cardBinIndex, 1, cardBinObj]]},
                    cards: {$splice: [[0, 1]]},
                    timer: {$set: Date.now()}
                });

                newState.cardBin.push(this.getIndependentActivitiesNotInCardBin());
                newState.cards.push(this.pickNextCards(1));
                this.setState(newState);
                this._onValueChange(this.state.cardState);
                return;

            } else { //maxed out, remove from cardBin

                var newState = React.addons.update(this.state, {
                    cardState: {$splice: [[cardStateIndex, 1, cardStateObj]]},
                    cardBin: {$splice: [[cardBinIndex, 1]]},
                    cards: {$splice: [[0, 1]]},
                    timer: {$set: Date.now()}
                });

                newState.cards.push(this.pickNextCards(1));
                this.setState(newState);
                this._onValueChange(this.state.cardState);
                return;

            }

        }else { //we have finished a progression, since still_to_show is zero

            //figure out logic, update cardState curr_card, mastered
            //if day_break, set num_daily_cards to max_daily_cards
            if (this.cardLogic(cardBinObj, cardStateObj)){
                //new mastered skill, go through and find new activities

                let new_cardBin_cards = [];

                let mastered_skills = this.getSkills(mastered);
                let active_skills = this.getSkills(active);

                for (let i in this.state.cardState){

                    let prereqs = get_activity(this.state.cardState[i].activity_id);

                    if((prereqs.indexOf(cardStateObj.activity_id) > -1) &&
                       (prereqs.length === _.interesection(prereqs, mastered_skills.push(cardStateObj.activity_id)).length)) {
                      //found a skill that had this newly mastered skill as a
                      //prereq and we also have all of the other required
                      //skills
                      let a_id = this.state.cardState[i].activity_id;
                      let c_id = get_card_id_from_index(a_id, 0);
                      if (this.skillNotDailyMax(a_id)) {
                        new_cardBin_cards.push(activity_to_cardbin_obj(a_id, c_id, this.rankProb(a_id, c_id)));
                      }
                    }
                }
                //push to new_cardBin_cards if not maxed_daily

                var newState = React.addons.update(this.state, {
                    cardState: {$splice: [[cardStateIndex, 1, cardStateObj]]},
                    cardBin: {$splice: [[cardBinIndex, 1]]},
                    cards: {$splice: [[0, 1]]},
                    timer: {$set: Date.now()}
                });

                newState.cardBin.push(new_cardBin_cards);
                newState.cardBin.push(this.getIndependentActivitiesNotInCardBin());
                newState.cards.push(this.pickNextCards(1));
                this.setState(newState);
                this._onValueChange(this.state.cardState);
                return;
            }else{

            var newState = React.addons.update(this.state, {
                cardState: {$splice: [[cardStateIndex, 1, cardStateObj]]},
                cardBin: {$splice: [[cardBinIndex, 1]]},
                cards: {$splice: [[0, 1]]},
                timer: {$set: Date.now()}
            });

            newState.cardBin.push(this.getIndependentActivitiesNotInCardBin());
            newState.cards.push(this.pickNextCards(1));
            this.setState(newState);
            this._onValueChange(this.state.cardState);
            return;

            }
        }
    }
  },


  cumProbabilityRankArray(prob_array){
    //take array of probability ranks, invert them, and return a
    //cumulative sum array for picking with a random number generator
    let prob_scores = prob_array.slice(0);
    let max_val = Math.max.apply(Math, prob_scores) + 1;

    prob_scores.forEach(function(el, index, myArray) {
        if (el != 0){
            myArray[index] = max_val-el;
        }
    });

    let cum_prob_scores = [];
    prob_scores.reduce(function(a,b,i) { return cum_prob_scores[i] = a+b;},0);

    return cum_prob_scores;
  },


  pickNextCards(numCards){

    console.log('--pick cards');
    console.log('cardbin: ' + JSON.stringify(this.state.cardBin));
    console.log('cards-pre: ' + JSON.stringify(this.state.cards));

    //------------CREATE PROB ARRAY---------------

    //create array of eligible card probabilities, index the same as cardbin
    //eligible means if in cards already, add to probability score temporarily
    //if in cards already and still_to_show<=1
    let prob_scores = [];
    let cards_to_show = [];
    let final_cards = [];

    for (let i in this.state.cardBin){
        //add probability score to array.  for every instance in cards already, add one to prob
        //score.  If # in cards - still_to_show  and still_to_show<=0, prob is 0.
        //Otherwise copy probability score to array directly.
        let curr_prob_score = this.state.cardBin[i].probability_rank;
        let curr_cards_to_show = this.state.cardBin[i].still_to_show;

        for (let j in this.state.cards){
            if (this.state.cardBin[i].card == this.state.cards[j]) {
                curr_prob_score += 1;
                curr_cards_to_show -= 1;
            }
        }

        cards_to_show.push(curr_cards_to_show);

        if (curr_cards_to_show <= 0){
            prob_scores.push(0);
        } else {
            prob_scores.push(curr_prob_score);
        }
    }
    //----------------------PROB SCORES TO ACTUAL PROBABILITIES----------
    //now we have an array of prob scores, 0 means no chance, 1 is twice as
    //likely as 2, which is twice as likely as 3, etc.

    let cum_prob_scores = this.cumProbabilityRankArray(prob_scores);

    for (let i=0;i<numCards;i++) {
        //pick cards
        let pick = Math.floor((Math.random()*cum_prob_scores[cum_prob_scores.length-1]) + 1);

        for (let j in cum_prob_scores) {
            if (pick <= cum_prob_scores[j]) {

                //push new card
                final_cards.push(this.state.cardBin[j].card);

                //update probabilities now that we've picked this card
                cards_to_show[j] -= 1;

                if (cards_to_show[j] <= 0){
                    prob_scores[j] = 0;
                } else {
                    prob_scores[j] += 1;
                }

                cum_prob_scores = this.cumProbabilityRankArray(prob_scores);
                break;
            }
        }
    }

    console.log('cards-chosen: ' + JSON.stringify(final_cards));
    return final_cards;
  },


  handleYup (card) {
    console.log("--success swipe")
    this.handleCardEvent(card, 'success');
  },

  handleNope (card) {
    console.log("--fail swipe")
    this.handleCardEvent(card, this.skippedOrFailed(Date.now()-this.state.timer));
  },

  skippedOrFailed(time_ms) {

    let thresh = 1000*20; //20 seconds

    if (time_ms > thresh){
        return 'failed';
    }else{
        return 'skipped';
    }
  },

  render() {
    console.log('--render');
    console.log('cardBin: ' + JSON.stringify(this.state.cardBin));
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
  },
  backgroundVideo: {
    justifyContent: 'space-around',
    paddingTop: 50,
    paddingBottom: 50,
    width: 300,
    height: 300,
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
