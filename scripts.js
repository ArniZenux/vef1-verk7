const MAX_BEST_OF = 10;

/* Global */
//stig
let wins = 0;
let losses = 0;

let best_Of_winner = false; 

//choice 
let player_ = 0; 
let computer = 0; 
let jafnara = 0; 

//fjöldi leikja
let max_games = 0; 

//
// núllastilla ef þarf að spila aftur. 
//
function nullstilla(){
  max_win = 0; 
  max_los = 0; 
  jafnara_max = 0; 
  
  wins = 0; 
  losses = 0; 
  
  player_ = 0;
  computer = 0;
  jafnara = 0; 

  max_games = 0; 
  best_Of_winner = false; 
}

//
//Athugar hvort gefin tala sé gild sem best-of gildi.
//
function isValidBestOf(bestOf) {
  if(bestOf == 1){
    if(wins == 1){
      best_Of_winner = true; 
      return true;
    }
  }
  else if(bestOf == 3){
    if(wins == 2){
      best_Of_winner = true; 
      return true;
    }
  }
  else if(bestOf == 5){
    if(wins == 3){
      best_Of_winner = true; 
      return true;
    }
  }
  else if(bestOf == 7){
    if(wins == 5){
      best_Of_winner = true; 
      return true;
    }
  }
  else if(bestOf == 9){
    if(wins == 5){
      best_Of_winner = true; 
      return true;
    }
  }
  else{
    return false;
  } 
}

//
// merki:  1, 2 og 3 
//
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

//
//Birta skal hvað bæði spilari og tölvu valdi og hvernig umferð fór.
//
//Check stöðu spilara og tölvu
//Þetta er aðeins meira skemmtilegra - krydd og breyta aðeins til. 

function checkGame(player, computer) {
  // player wins!
  // skæri vinnur blað
  if(player_ == 1 && computer == 2){
     wins++;
     console.log('Player wins! : Skæri vinnur blað');
     console.log(" ");
  }
  // blað vinnur stein
  else if(player_ == 2 && computer == 3){
    wins++;
    console.log('Player wins! : Blað vinnur stein');
    console.log(" ");
  } 
  // steinn vinnur skæri
  else if(player_ == 3 && computer == 1){
    wins++;
    console.log('Player wins! : Steinn vinnur stein');
    console.log(" ");
  }
  
  // computer wins!
  // skæri vinnur blað
  else if(computer == 1 && player_ == 2){
    losses++;
    console.log('Computer wins! : Skæri vinnur blað');
    console.log(" ");
  }  
   // blað vinnur stein
  else if(computer == 2 && player_ == 3){
    losses++;
    console.log('Computer wins! : Blað vinnur stein');
    console.log(" ");
  }
  // steinn vinnur skæri
  else if(computer == 3 && player_ == 1){
    losses++;
    console.log('Computer wins! : Steinn vinnur blað');
    console.log(" ");
  }
  else {
    jafnara++; 
    console.log("Jafntefli");
    console.log(" ");
  }
}

//
// aðal spilaumferð - Main game. 
//
function round(i) {

  // 1. Spyrja um hvað spilað, ef cancel, hætta
  player_ = prompt("Veldu 1,2 ed 3: ");

  if( 0 < player_ && player_ < 4 ){

    // 3. Velja gildi fyrir tölvu með `Math.floor(Math.random() * 3) + 1` sem skilar heiltölu á [1, 3]
    computer = Math.floor(Math.random() * 3) + 1;
    console.log("Umferð leiks : ", i+1);
    console.log("Player choice : ", playAsText(player_));
    console.log("Computer choice : ", playAsText(computer));
    
    // Smá breyta og krydd aðeins hérna. 
    checkGame(player_, computer);
    
  }
  else{
    console.log("Umferð leiks : ", i+1);
    console.error("ógilt og computer wins!");
    losses++; // Ef ógilt gildi er slegið inn vinnur tölva. (utan 1,2 eða 3)
  }

  player_ = 0; 
}

//
//Ahuga hvort valin númer sé oddutala eða ekki. 
//
function checkOddtala(numer){
  if( max_games == 2 || max_games == 4 || max_games == 6 || max_games == 8 || max_games == 10){
    return false;
  }
  return true;
}

//
// Hefst leik og bætir útkomu. 
//
function play() {
  
  nullstilla(); // Finnst best að nota þetta ef þarf að endurspila. 

  var i = 0;  //teljari teljar upp að max_games.  

  //1. spyrja um fjölda leikja
  max_games = prompt("Round of games? : ");
  
  let _bestOf = max_games;   

  //2. Staðfesta að fjöldi leikja sé gilt gildi. (1 til 10)
  if(max_games > 0 && max_games < MAX_BEST_OF){
    if( checkOddtala(max_games) ){
      //3. keyra fjölda leikja og spila umferð þar til winner is found!
      while( max_games > i && !isValidBestOf(_bestOf) ){
        round(i);
        i++; 
        if(best_Of_winner){
          max_games = i; 
        }
      }
      //4. Birta stöðu. 
      games();
    } 
    else{
      console.error("Velja 1,3,5,7,9 sem oddutölu");
    }  
  }
  else{
    console.error("Undir en 0 eða yfir en 10 er ógilt");
  }    
}

//
// Birtir stöðu spilara.
//
function games() {
 
  let max_win = (100 * (wins/max_games)).toFixed(2);  
  let max_los = (100 * (losses/max_games)).toFixed(2);; 
  let jafnara_max = (100 * (jafnara/max_games)).toFixed(2);

  if(max_games == 0){
    console.log("Þú hefur spilað ", max_games, " leiki");
  }

  else if(best_Of_winner){
    console.log("------------- BEST OF GAME - SNILLD!------------------")
    console.log("| Þú hefur spilað ", max_games, " leiki");
    console.log("| Þú hefur unnið ", wins, " eða ", max_win, "% af heild");
    console.log("| Þú hefur tapað ", losses, " eða ", max_los, "% af heild");
    console.log("| Jafntefli ", jafnara, " eða ", jafnara_max, "% af heild");
    console.log("------------------------------------------------")
    console.log("-----------------------");
    console.log("|| Þú er sigurvegari ||");
    console.log("-----------------------");
    
  }
  else{
    console.log("------------------------------------------------")
    console.log("| Þú hefur spilað ", max_games, " leiki");
    console.log("| Þú hefur unnið ", wins, " eða ", max_win, "% af heild");
    console.log("| Þú hefur tapað ", losses, " eða ", max_los, "% af heild");
    console.log("| Jafntefli ", jafnara, " eða ", jafnara_max, "% af heild");
    console.log("------------------------------------------------")
    if (wins < losses){
      console.log("----------------------------");
      console.log("|| Þú er ekki sigurvegari ||");
      console.log("----------------------------");

    }
    else if( wins > losses){
      console.log("-----------------------");
      console.log("|| Þú er sigurvegari ||");
      console.log("-----------------------");
    }
    else if (wins == losses){
      console.log("------------------");
      console.log("|| Jafntefli !! ||");
      console.log("------------------");
    }
  }
}
