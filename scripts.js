
const MAX_BEST_OF = 10;

/* Global */
let wins = 0;
let losses = 0;
let player_ = 0; 
let computer = 0; 

/**
 * Athugar hvort gefin tala sé gild sem best-of gildi.
 * @param {number} bestOf Tala sem skal athuga
 * @return {boolean} true eða false
 */
function isValidBestOf(bestOf) {
  // TODO útfæra
}
// console.assert(isValidBestOf(1) === true, '1 er valid best of');
// console.assert(isValidBestOf(2) === false, '2 er ekki er valid best of');
// console.assert(isValidBestOf(9) === true, '9 er valid best of');

function playAsText(text) {
    if(text == 1){
      return "Skæri";
    }
    else if (text == 2){
      return "Blað";
    }
    else if (text == 3){
      return "Steinn";
    }
}

/**
 * Athugar hvort spilari eða tölva vinnur.
 * @param {number} player Það sem spilari spilaði
 * @param {number} computer Það sem tölva spilaði
 * @returns -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function checkGame(player, computer) {
  // player wins!
  // skæri vinnur blað
  if(player_ == 1 && computer == 2){
     wins++;
     console.log('Player wins! : Skæri vinnur blað');
  }
  // blað vinnur stein
  else if(player_ == 2 && computer == 3){
    wins++;
    console.log('Player wins! : Blað vinnur stein');
  } 
  // steinn vinnur skæri
  else if(player_ == 3 && computer == 1){
    wins++;
    console.log('Player wins! : Steinn vinnur stein');
  }
  
  // computer wins!
  // skæri vinnur blað
  else if(computer == 1 && player_ == 2){
    losses++;
    console.log('Computer wins! : Skæri vinnur blað');
  }  
   // blað vinnur stein
  else if(computer == 2 && player_ == 3){
    losses++;
    console.log('Computer wins! : Blað vinnur stein');
  }
  // steinn vinnur skæri
  else if(computer == 3 && player_ == 1){
    losses++;
    console.log('Computer wins! : Steinn vinnur blað');
  }
  else {
    console.log("Jafntefli");
  }
}

/**
 * Spilar einn leik.
 * @return {boolean} -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function round() {
  player_ = prompt("Veldu 1,2 ed 3: ");

  if( 0 < player_ && player_ < 4 ){
  
    computer = Math.floor(Math.random() * 3) + 1;
    console.log("Player: ", playAsText(player_));
    console.log("Computer: ", playAsText(computer));
    checkGame(player_, computer);
  
  }
  else{
    console.error("ógilt");
  }

  player_ = 0; 
}

function play() {
  var i = 0; 

  max_games = prompt("Round of games? : ");

  if( 0 < max_games && max_games <= 10){

      while( max_games > i ){
        round();
        i++; 
       }

    games();
  } 
  else{
    console.error("ógilt");
  }
}

function games() {
 
  let max_win = (100 * (wins/max_games)).toFixed(2);  
  let max_los = (100 * (losses/max_games)).toFixed(2);; 

  if(max_games == 0){
    console.log("Þú hefur spilað ", max_games, " leiki");
  }

  else{
    console.log("Þú hefur spilað ", max_games, " leiki");
    console.log("Þú hefur unnið ", wins, " eða ", max_win, "% af heild");
    console.log("Þú hefur tapað ", losses, " eða ", max_los, "% af heild");

    if (wins < losses){
      console.log("Þú er ekki sigurvegari");
    }
    else {
      console.log("Þú ert sigurvegari");
    }
  }
}
