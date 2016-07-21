console.log('--- Function Testing for Tinder Mindsprout ---');

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
];

const independent_activities = [
  {
  id: 'ind_act_1', mastered_skills: ['gmi'], active_skills: ['gmi2'],
  partial_skills: [{activity_id: 'gmi2', card_id: 'pprompt2'}],
  card: {name: 'independent activity', text: 'this is independent gmi2 activity', backgroundColor:'white', borderColor:'grey'}
  },
  {
  id: 'ind_act_2', mastered_skills: [], active_skills: [],
  partial_skills: [],
  card: {name: 'independent activity', text: 'this is independent anytime activity', backgroundColor:'white', borderColor:'grey'}
  }
];

var cardState = [
  {activity_id: 'gmi', state: 'mastered', curr_card_id: null,
    last_active_date: null, num_cards_on_last_active_date: 0,
    prev_card_id: null, prev_activity_complete_date: null, mastery_date: null,
    num_thrown: [5,2,0,1], num_failed: [1,2,6,1], num_success: [3,2,4,3]
  },

  {activity_id: 'gmi2', state: 'not_started', curr_card_id: null,
    last_active_date: null, num_cards_on_last_active_date: 0,
    prev_card_id: null, prev_activity_complete_date: null, mastery_date: null,
    num_thrown: [0,0,0,0], num_failed: [0,0,0,0], num_success: [0,0,0,0]
  },

  {activity_id: 'vowels', state: 'active', curr_card_index: 'pprompt2',
    last_active_date: null, num_cards_on_last_active_date: 0,
    prev_card_id:'pprompt1',  prev_activity_complete_date: null, mastery_date: null,
    num_thrown: [4,2,0,0], num_failed: [0,4,0,0], num_success: [3,2,0,0]
  }
];
    //new Date() gives date of now

function cumProbabilityRankArray(prob_array){
  //take array of probability ranks, invert them, and return a
  //cumulative sum array for picking with a random number generator
  var prob_scores = prob_array.slice(0);

  max_val = Math.max.apply(Math, prob_scores) + 1;

  prob_scores.forEach(function(el, index, myArray) {
    if (el != 0){
        myArray[index] = max_val-el;
    }
  });

  let cum_prob_scores = [];
  prob_scores.reduce(function(a,b,i) { return cum_prob_scores[i] = a+b;},0);

  return cum_prob_scores;
}

function pickNextCard(numCards){
  //don't forget to edit this.state.cardState into this instead of cardState
  var cards = []; //in real life this could have cards in it

  //------------CREATE PROB ARRAY---------------

  //create array of eligible card probabilities, index the same as cardbin
  //eligible means if in cards already, add to probability score temporarily
  //if in cards already and still_to_show<=1
  var prob_scores = [];
  var cards_to_show = [];

  for (let i in cardBin){
    //add probability score to array.  for every instance in cards already, add one to prob
    //score.  If # in cards - still_to_show  and still_to_show<=0, prob is 0.
    //Otherwise copy probability score to array directly.
    let curr_prob_score = cardBin[i].probability_rank;
    let curr_cards_to_show = cardBin[i].still_to_show;

    for (let j in cards){
      if (cardBin[i].card == cards[j]) {
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

  cum_prob_scores = cumProbabilityRankArray(prob_scores);

  for (let i=0;i<numCards;i++) {
    //pick cards
    pick = Math.floor((Math.random()*cum_prob_scores[cum_prob_scores.length-1]) + 1);
    console.log('cards to show' + cards_to_show);
    console.log('seed ' + pick);

    for (let j in cum_prob_scores) {
      if (pick <= cum_prob_scores[j]) {
        
        //push new card
        cards.push(cardBin[j].card);

        //update probabilities now that we've picked this card
        cards_to_show[j] -= 1;

        if (cards_to_show[j] <= 0){
          prob_scores[j] = 0;
        } else {
          prob_scores[j] += 1;
        }

        cum_prob_scores = cumProbabilityRankArray(prob_scores);
        break;
      }
    }
  }


  return cards; //can just append to this.props.cards with react
}


var cardBin = [
  { activity_id: 'gmi', card_id: 'probe',
    probability_rank: 1, still_to_show: 1, prev_trial_success: [1, 0, 1],
    card: {name: 'V 1', text: 'this is an activity text test', backgroundColor:'white', borderColor:'grey'},
  },

  { activity_id: 'gmi2', card_id: 'probe',
    probability_rank: 3, still_to_show: 3, prev_trial_success: [0],
    card: {name: 'V 3', text: 'this is an activity text test', backgroundColor:'white', borderColor:'grey'},
  },

  { activity_id: 'vowels', card_id: 'probe',
    probability_rank: 1, still_to_show: 5, prev_trial_success: [],
    card: {name: 'V 5', text: 'this is an activity text test', backgroundColor:'white', borderColor:'grey'},
  }
];


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
    card.activity_id = 'independent_activity';
    card.card_id = independent_card_id;
    card.probability_rank = probability_rank;
    card.prev_trial_success = []
    card.still_to_show = 1;

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

function init_cardstate() {
    //create empty cardState array by looking at activity progressions in
    //activty array

    cardState = []

    //create all activities
    activities.forEach( function(activity) {

        //create zero array of proper length
        progression_length = get_progression_length(activity.id);
        zeroArray = Array.apply(null, Array(progression_length)).fill(0);

        cardState.push({activity_id: activity.id,
                        state: 'not_active',
                        curr_card_id: null,
                        last_active_date: null,
                        num_cards_on_last_active_date: 0,
                        prev_card_id: null,
                        prev_activity_complete_date: null,
                        mastery_date: null,
                        num_thrown: zeroArray,
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
}

console.log('-----init cardstate test-----');
console.log(init_cardstate());
console.log('----activity to cardbin obj test----');
console.log(activity_to_cardbin_obj('vowels', 'indep', 5));
console.log(activities[2]);
console.log('----ind activity to cardbin obj test----');
console.log(independent_activity_to_cardbin_obj('ind_act_2', 5));
console.log(independent_activities[1]);
console.log('----card picking test----');
console.log(pickNextCard(12));



function testDate(date){
  if (date != null && date == Date.now().toDateString()) {
        console.log('date is today');
  } else {
    console.log('not today');
  }
  

}
console.log(testDate(null));
console.log(3*24*60*60*1000);
console.log(5>null);
