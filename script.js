'use strict';
//selecting elements 
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const diceEl = document.querySelector('.dice') 

//initializing function
let playing = true;
let scores= [0,0];
let currentScore = 0;
let activePlayer = 0;
const init = function(){
   playing = true;
   scores=[0,0];
   currentScore=0;
   activePlayer = 0;

    score0El.textContent = 0
    score1El.textContent = 0
    current0El.textContent = 0
    current1El.textContent =0
    diceEl.classList.add('hidden')
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active')
};
init();
//Generating a random number from 1 to 6
const diceGenerator = function(){
    return Number(Math.trunc(Math.random()*6)+1);
}
const switchPlayer = ()=>{
    document.getElementById(`current--${activePlayer}`).textContent=0
        currentScore = 0
        activePlayer = activePlayer===0 ? 1 : 0
        player0El.classList.toggle('player--active')
        player1El.classList.toggle('player--active')
}
//rolling dice functionality
btnRoll.addEventListener('click', function(){
    if(playing){
    let dice = diceGenerator()
    diceEl.classList.remove('hidden')
    diceEl.src=`dice-${dice}.png`
    if(dice!==1){
        //add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent=currentScore
    }else{
        //switch to next player
        switchPlayer()
    }
}
});
//hold button functionality
btnHold.addEventListener('click', function(){
    //1. add current score to active player's score
    if(playing){
    scores[activePlayer]+=currentScore
    document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer]
    // check if player's score is >=100
    if(scores[activePlayer]>=100){
        //Finish the game
        playing = false
        diceEl.classList.add('hidden')
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
    }
    //switch the player
    else{
        switchPlayer()
    }
}
});
//reset the game
btnNew.addEventListener('click', function(){
init()
});
