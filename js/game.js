var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck;

window.onload = function () {
  startGame();
};

function buildDeck() {
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  let types = ["C", "D", "H", "S"];

  deck = [];

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + types[i]);
    }
  }
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

function startGame() {

  buildDeck();
  shuffleDeck();

  hidden = deck.pop();
  dealerSum += getValue(hidden);
  giveCardsToDealer();

  document.getElementById("dealer-sum").innerText = dealerSum - getValue(hidden);


    if (dealerSum > 21 && dealerAceCount > 0) {
      dealerSum = reduceAce(dealerSum);
      dealerAceCount = reduceAceCount(dealerAceCount);
  }


  for (let i = 0; i < 2; i++) {
    giveCardToPlayer();
  }
  document.getElementById("your-sum").innerText = yourSum;

  if (yourSum == 21) {
    document.getElementById("hit").disabled = true;
    stay();
  }

  if (yourSum > 21 && yourAceCount > 0) {
      yourSum = reduceAce(yourSum);
      yourAceCount = reduceAceCount(yourAceCount);
    
  }

  document.getElementById("hit").addEventListener("click", hit);
  document.getElementById("stay").addEventListener("click", stay);
  document.getElementById("play-again").addEventListener("click", playAgain);
}

function hit() {
  giveCardToPlayer();

  if (yourSum == 21) {
    
    document.getElementById("hit").disabled = true;
    stay();
  }

  else if (yourSum > 21 && yourAceCount > 0) {
    yourSum = reduceAce(yourSum);
    yourAceCount = reduceAceCount(yourAceCount);
    document.getElementById("your-sum").innerText = yourSum;
  }
  else if (yourSum > 21 && yourAceCount == 0) {
    
    document.getElementById("hit").disabled = true;
    stay();
    document.getElementById("your-sum").innerText = yourSum;
  } 
  else document.getElementById("your-sum").innerText = yourSum;

}

function stay() {
  
  document.getElementById("stay").disabled = true;
  document.getElementById("hit").disabled = true;

  while (dealerSum < 17) {

    giveCardsToDealer();

    if(dealerSum > 21 && dealerAceCount > 0){
      dealerSum = reduceAce(dealerSum);
      dealerAceCount = reduceAceCount(dealerAceCount);
    }
    if (dealerSum > 21 && dealerAceCount == 0){
      break;
    }

  }
  
 
  document.getElementById("hidden").src = "./cards/" + hidden + ".png";
  
  checkForWinner();

  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("your-sum").innerText = yourSum;
  document.getElementById("play-again").disabled = false;
}

function reduceAceCount(playerAceCount){
  playerAceCount -= 1;
  return playerAceCount;

}

function reduceAce(playerSum){
    playerSum -= 10;
  return playerSum;
}

function playAgain() {
  dealerAceCount = 0;
  dealerSum = 0;
  yourAceCount = 0;
  yourSum = 0;

  var dealerCards = document.getElementById("dealer-cards");
  dealerCards.innerHTML = "";

  // Recreate the hidden card
  var hiddenCard = document.createElement("img");
  hiddenCard.id = "hidden";
  hiddenCard.src = "./cards/BACK.png";
  dealerCards.appendChild(hiddenCard);

  document.getElementById("your-cards").innerHTML = "";

  document.getElementById("hit").disabled = false;
  document.getElementById("stay").disabled = false;
  document.getElementById("play-again").disabled = true;
  document.getElementById("results").innerText = "";

  // Start a new game
  startGame();
}


function getValue(card) {
  let data = card.split("-");
  let value = data[0];

  if (isNaN(value)) {
    if (value == "A") {
      return 11;
    }
    return 10;
  }

  return parseInt(value);
}

function checkAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}

function giveCardsToDealer() {
  var cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./cards/" + card + ".png";
  cardImg.classList.add("card-animation");
  dealerSum += getValue(card);
  dealerAceCount += checkAce(card);
  document.getElementById("dealer-cards").appendChild(cardImg);

  setTimeout(function() {
    cardImg.classList.add("card-animation-added");
  }, 100); // delay in milliseconds
}

function giveCardToPlayer() {

  var cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./cards/" + card + ".png";
  cardImg.classList.add("card-animation");
  yourSum += getValue(card);
  yourAceCount += checkAce(card);
  document.getElementById("your-cards").appendChild(cardImg);

  setTimeout(function() {
    cardImg.classList.add("card-animation-added");
  }, 100); // delay in milliseconds

}

function checkForWinner(){

  let message = "";
  if (yourSum > 21) {
    message = "You Lose!";
  } else if (dealerSum > 21) {
    message = "You win!";
  } else if (yourSum == dealerSum) {
    message = "Draw!";
  } else if (yourSum > dealerSum) {
    message = "You win!";
  } else if (yourSum < dealerSum) {
    message = "You Lose!";
  }

  document.getElementById("results").innerText = message;

}