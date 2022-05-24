const play = document.querySelector(".play");
const reset = document.querySelector(".reset");
const message = document.querySelector(".message");

const dice1 = document.querySelector("#dice-1");
const dice2 = document.querySelector("#dice-2");

const score1 = document.querySelector(".score-1");
const score2 = document.querySelector(".score-2");

const chanceContainer = document.querySelector(".chance-container");
const chance = document.querySelector(".chance");

const diceFace = [
    "images/dice-0.png",
    "images/dice-1.png",
    "images/dice-2.png",
    "images/dice-3.png",
    "images/dice-4.png",
    "images/dice-5.png",
    "images/dice-6.png",
]

let player1Score = 0;
let player2Score = 0;
let player1Plays = true;
let takeChance = false;


function playGame(dice, value){
    if(player1Plays){
        dice1.innerHTML = `<img class="dice" src=${diceFace[dice]} alt="">`;
        player1Score += value;
        score1.textContent = player1Score;
    } else{
        dice2.innerHTML = `<img class="dice" src=${diceFace[dice]} alt="">`;
        player2Score += value;
        score2.textContent = player2Score;
    }
    player1Plays = !player1Plays;
}

function chanceToDouble(val){
    switch(val){
        case 1:
        case 2:
        case 4:
        case 5: return val *2;
        default: return -1;
    }
}

play.addEventListener("click", function (){
    let dice = Math.floor(Math.random() * 6) + 1;
    let value = dice;
    //active chance to double points
    if(takeChance){
        console.log("Rolled "+ value)
        value = chanceToDouble(value);
        console.log("Doubled Roll? "+ value)
        takeChance = false;
    }
    //play a round
    playGame(dice, value);
    //evaluate winner
    if(player1Score >= 20 || player2Score >= 20){
        
        if(player1Score >= 20){ 
            message.innerHTML ="Player 1 Wins";
        } else{
            message.innerHTML ="Player 2 Wins";
        }
        //change buttons
        play.classList.add("btn-hidden");
        reset.classList.remove("btn-hidden");
        chanceContainer.classList.remove("chance-switch");
    } else{ //Keep playing
        if(player1Plays){
            message.textContent ="Player 1 Turn";
            chanceContainer.classList.remove("chance-switch");
            dice2.classList.remove("roll-active");
            dice1.classList.add("roll-active");
        } else{
            message.textContent ="Player 2 Turn";
            
            chanceContainer.classList.add("chance-switch");
            dice1.classList.remove("roll-active");
            dice2.classList.add("roll-active");
        }
    }
});

reset.addEventListener("click", function (){
    player1Score = 0;
    player2Score = 0;
    dice1.innerHTML = `<img class="dice" src=${diceFace[0]} alt="">`;
    dice2.innerHTML = `<img class="dice" src=${diceFace[0]} alt="">`;
    score1.textContent = player1Score;
    score2.textContent = player2Score;
    player1Plays = true;
    message.textContent = "Player 1 Turn";
    play.classList.remove("btn-hidden");
    reset.classList.add("btn-hidden");
    dice2.classList.remove("roll-active");
    dice1.classList.add("roll-active");
});

chance.addEventListener("click", function (){
    takeChance = !takeChance;
})

