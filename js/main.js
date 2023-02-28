var code = JSON.parse(localStorage.getItem('myStorage1'));
var codep2 = JSON.parse(localStorage.getItem('myStorage2'));

for(let i = 0; i < 4; i++){
  code[i] = parseInt(code[i]);
}
for(let i = 0; i < 4; i++){
  codep2[i] = parseInt(codep2[i]);
}

(function () {
	
  'use strict';
  var player1 = true,
      guess = [], 
      options = document.getElementsByClassName('option'),
      inputRows = document.getElementsByClassName('guess'),
      hintContainer = document.getElementsByClassName('hint'),
      secretSockets = document.getElementsByClassName('secret socket'),
      modalOverlay = document.getElementById('modalOverlay'),
      modalMessage = document.getElementById('modalMessage'),
      rowIncrement = 1,
      hintIncrement = 1,
      pegs = {
        1: 'green',
        2: 'purple',
        3: 'red',
        4: 'yellow',
        5: 'blue',
        6: 'brown'
      };
      
  
  function stopBoth(){
    document.getElementById("green").disabled = true;
    document.getElementById("yellow").disabled = true;
    document.getElementById("purple").disabled = true;
    document.getElementById("blue").disabled = true;
    document.getElementById("red").disabled = true;
    document.getElementById("brown").disabled = true;

    document.getElementById("greenp2").disabled = true;
    document.getElementById("yellowp2").disabled = true;
    document.getElementById("purplep2").disabled = true;
    document.getElementById("bluep2").disabled = true;
    document.getElementById("redp2").disabled = true;
    document.getElementById("brownp2").disabled = true;
  }

  function gameSetup () {
    for (var i = 0; i < options.length; i++)
      options[i].addEventListener('click', insertGuess, false);

    document.getElementById('newGame').onclick = newGame;
    document.getElementById('delete').onclick = deleteLast;
  
  }

  function insertGuess () {
    var self = this;
    var slots = inputRows[inputRows.length - rowIncrement].getElementsByClassName('socket');

    slots[guess.length].className = slots[guess.length].className + ' peg ' + self.id; // Insert node into page

    guess.push(+(self.value));

    if (guess.length === 4) {
      if (compare())
        gameState('won');
      else
        rowIncrement += 1;
    }
  }
    
  function compare () {

    console.log(code);
    console.log(guess);

    document.getElementById("green").disabled = true;
    document.getElementById("yellow").disabled = true;
    document.getElementById("purple").disabled = true;
    document.getElementById("blue").disabled = true;
    document.getElementById("red").disabled = true;
    document.getElementById("brown").disabled = true;
    player1 = false;
    var isMatch = true;
    var codeCopy = code.slice(0);

    for (var i = 0; i < code.length; i++) {
      if (guess[i] === code[i]) {
        insertPeg('hit');
        codeCopy[i] = 0;
        guess[i] = -1;
      } else
        isMatch = false;
    }

    for (var j = 0; j < code.length; j++) {
      if (codeCopy.indexOf(guess[j]) !== -1) {
        insertPeg('almost');
        codeCopy[codeCopy.indexOf(guess[j])] = 0;
      }
    }

    hintIncrement += 1; 
    guess = [];         

    document.getElementById("greenp2").disabled = false;
    document.getElementById("yellowp2").disabled = false;
    document.getElementById("purplep2").disabled = false;
    document.getElementById("bluep2").disabled = false;
    document.getElementById("redp2").disabled = false;
    document.getElementById("brownp2").disabled = false;



    player2 = true;
    return isMatch;
  }

  function insertPeg (type) {
    var sockets = hintContainer[hintContainer.length - hintIncrement].getElementsByClassName('js-hint-socket');
    sockets[0].className = 'socket ' + type;
  }

  function deleteLast () {
    if (guess.length !== 0) {
      var slots = inputRows[inputRows.length - rowIncrement].getElementsByClassName('socket');
      slots[guess.length - 1].className = 'socket'; 
      guess.pop();
    }
  }

  function newGame () {
    guess = [];        
    clearBoard();
    rowIncrement = 1;  
    hintIncrement = 1; 
    hideModal();
    gameSetup();          
    time = 60;
    newGamep2();

    document.getElementById("greenp2").disabled = true;
    document.getElementById("yellowp2").disabled = true;
    document.getElementById("purplep2").disabled = true;
    document.getElementById("bluep2").disabled = true;
    document.getElementById("redp2").disabled = true;
    document.getElementById("brownp2").disabled = true;

    document.getElementById("green").disabled = false;
    document.getElementById("yellow").disabled = false;
    document.getElementById("purple").disabled = false;
    document.getElementById("blue").disabled = false;
    document.getElementById("red").disabled = false;
    document.getElementById("brown").disabled = false;

    player1 = true;
    player2 = false;
  }

  function hideModal () {
    modalOverlay.className = '';
  }

  function clearBoard () {

    document.getElementById("countdown").innerHTML = "60";
    for (var i = 0; i < inputRows.length; i++) {
      inputRows[i].innerHTML = '';
      for (var j = 0; j < 4; j++) {
        var socket = document.createElement('div');
        socket.className = 'socket';
        inputRows[i].appendChild(socket);
      }
    }


    for (var i = 0; i < hintContainer.length; i++) {
      var socketCollection = hintContainer[i].getElementsByClassName('socket');
      for (var j = 0; j < 4; j++) {
        socketCollection[j].className = 'js-hint-socket socket';
      }
    }


    for (var i = 0; i < secretSockets.length; i++) {
      secretSockets[i].className = 'secret socket';
      secretSockets[i].innerHTML = '?';
    }

    document.getElementsByTagName('body')[0].className = ''; 
  }


  function revealCode () {
    for (var i = 0; i < secretSockets.length; i++) {
      secretSockets[i].className += ' ' + pegs[code[i]];
      secretSockets[i].innerHTML = ''; 
    }
  }

  function gameOver () {

    for (var i = 0; i < options.length; i++)
      options[i].removeEventListener('click', insertGuess, false);
      
    revealCode();
    revealCodep2();
  }

  function gameState (state) {
    gameOver();
    document.getElementsByTagName('body')[0].className = state;
    modalOverlay.className = state;
    player1 = false;
    player2 = false;
    if (state === 'won') {
      modalMessage.innerHTML = '<h2>Први играч је победио!</p> <button class="large" id="hideModal">У реду</button> <button id="restartGame" class="large primary">Покрени поново</button>';
      document.getElementById('restartGame').onclick = newGame;
      document.getElementById('hideModal').onclick = hideModal;
      stopBoth()
      player1 = false;
      player2 = false;
    } else
      modalMessage.innerHTML = '<h2>Победник је други играч!</h2> <button class="large" id="hideModal">У реду</button> <button id="restartGame" class="large primary">Покрени поново</button>';
      document.getElementById('restartGame').onclick = newGame;
      document.getElementById('hideModal').onclick = hideModal;
      stopBoth()
      player1 = false;
      player2 = false;
  }

  gameSetup(); 


//p2


'use strict';
var player2 = false;

document.getElementById("greenp2").disabled = true;
document.getElementById("yellowp2").disabled = true;
document.getElementById("purplep2").disabled = true;
document.getElementById("bluep2").disabled = true;
document.getElementById("redp2").disabled = true;
document.getElementById("brownp2").disabled = true;

var guessp2 = [], 
    optionsp2 = document.getElementsByClassName('optionp2'),
    inputRowsp2 = document.getElementsByClassName('guessp2'),
    hintContainerp2 = document.getElementsByClassName('hintp2'),
    secretSocketsp2 = document.getElementsByClassName('secretp2 socketp2'),
    modalOverlayp2 = document.getElementById('modalOverlayp2'),
    modalMessage = document.getElementById('modalMessage'),
    rowIncrementp2 = 1,
    hintIncrementp2 = 1,
    pegsp2 = {
      7: 'greenp2',
      8: 'purplep2',
      9: 'redp2',
      10: 'yellowp2',
      11: 'bluep2',
      12: 'brownp2'
    };

function gameSetupp2 () {

  for (var i = 0; i < optionsp2.length; i++)
    optionsp2[i].addEventListener('click', insertGuessp2, false);

  document.getElementById('newGame').onclick = newGame;
  document.getElementById('deletep2').onclick = deleteLastp2;
}

function insertGuessp2 () {
  var selfp2 = this;
  var slotsp2 = inputRowsp2[inputRowsp2.length - rowIncrementp2].getElementsByClassName('socketp2');

  slotsp2[guessp2.length].className = slotsp2[guessp2.length].className + ' pegp2 ' + selfp2.id; 
  guessp2.push(+(selfp2.value));

  if (guessp2.length === 4) {
    if (comparep2())
      gameStatep2('wonp2');
    else
      rowIncrementp2 += 1;
  }

  if ((rowIncrementp2 === inputRowsp2.length + 1 && !comparep2()) && (rowIncrement === inputRows.length + 1 && !compare()))
    gameStatep2('even');
}
  
function comparep2 () {

  document.getElementById("greenp2").disabled = true;
  document.getElementById("yellowp2").disabled = true;
  document.getElementById("purplep2").disabled = true;
  document.getElementById("bluep2").disabled = true;
  document.getElementById("redp2").disabled = true;
  document.getElementById("brownp2").disabled = true;

  player2 = false;
  var isMatchp2 = true;
  var codeCopyp2 = codep2.slice(0);

  for (var i = 0; i < codep2.length; i++) {
    if (guessp2[i] === codep2[i]) {
      insertPegp2('hitp2');
      codeCopyp2[i] = 0;
      guessp2[i] = -1;
    } else
      isMatchp2 = false;
  }

  for (var j = 0; j < codep2.length; j++) {
    if (codeCopyp2.indexOf(guessp2[j]) !== -1) {
      insertPegp2('almostp2');
      codeCopyp2[codeCopyp2.indexOf(guessp2[j])] = 0;
    }
  }

  hintIncrementp2 += 1; 
  guessp2 = [];         

  document.getElementById("green").disabled = false;
  document.getElementById("yellow").disabled = false;
  document.getElementById("purple").disabled = false;
  document.getElementById("blue").disabled = false;
  document.getElementById("red").disabled = false;
  document.getElementById("brown").disabled = false;

  player1 = true;
  return isMatchp2;
}

function insertPegp2 (type) {
  var socketsp2 = hintContainerp2[hintContainerp2.length - hintIncrementp2].getElementsByClassName('js-hint-socketp2');
  socketsp2[0].className = 'socketp2 ' + type;
}

function deleteLastp2 () {
  if (guessp2.length !== 0) {
    var slotsp2 = inputRowsp2[inputRowsp2.length - rowIncrementp2].getElementsByClassName('socketp2');
    slotsp2[guessp2.length - 1].className = 'socketp2'; 
    guessp2.pop();
  }
}

function newGamep2 () {
  guessp2 = [];        
  clearBoardp2();
  rowIncrementp2 = 1;  
  hintIncrementp2 = 1; 
  hideModalp2();
  gameSetupp2();           
}

function hideModalp2 () {
  modalOverlayp2.className = '';
}

function clearBoardp2 () {

 
  for (var i = 0; i < inputRowsp2.length; i++) {
    inputRowsp2[i].innerHTML = '';
    for (var j = 0; j < 4; j++) {
      var socketp2 = document.createElement('div');
      socketp2.className = 'socketp2';
      inputRowsp2[i].appendChild(socketp2);
    }
  }


  for (var i = 0; i < hintContainerp2.length; i++) {
    var socketCollectionp2 = hintContainerp2[i].getElementsByClassName('socketp2');
    for (var j = 0; j < 4; j++) {
      socketCollectionp2[j].className = 'js-hint-socketp2 socketp2';
    }
  }

  for (var i = 0; i < secretSocketsp2.length; i++) {
    secretSocketsp2[i].className = 'secretp2 socketp2';
    secretSocketsp2[i].innerHTML = '?';
  }
  timep2 = 60;
  document.getElementById("countdownp2").innerHTML = "60";

  document.getElementsByTagName('body')[0].className = ''; 
}


function revealCodep2 () {
  for (var i = 0; i < secretSocketsp2.length; i++) {
    secretSocketsp2[i].className += ' ' + pegsp2[codep2[i]];
    secretSocketsp2[i].innerHTML = ''; 
  }

}

function gameOverp2 () {

  for (var i = 0; i < optionsp2.length; i++)
    optionsp2[i].removeEventListener('click', insertGuessp2, false);
  
  revealCodep2();
  revealCode();
}

function gameStatep2 (state) {

  gameOverp2();
  document.getElementsByTagName('body')[0].className = state;
  modalOverlayp2.className = state;

  if (state === 'wonp2') {
    modalMessagep2.innerHTML = '<h2>Други играч је победио!</p> <button class="large" id="hideModalp2">У реду</button> <button id="restartGamep2" class="large primary">Покрени поново</button>';
    document.getElementById('restartGamep2').onclick = newGame;
    document.getElementById('hideModalp2').onclick = hideModalp2;
    stopBoth()
    player1 = false;
    player2 = false;
  } 
  else if(state === 'even'){
    modalMessagep2.innerHTML = '<h2>Нерешено!</p> <button class="large" id="hideModalp2">У реду</button> <button id="restartGamep2" class="large primary">Покрени поново</button>';
    document.getElementById('restartGamep2').onclick = newGame;
    document.getElementById('hideModalp2').onclick = hideModalp2;
    stopBoth()
    player1 = false;
    player2 = false;
  }
  else
    modalMessagep2.innerHTML = '<h2>Победио je први!</h2> <button class="large" id="hideModalp2">У реду</button> <button id="restartGamep2" class="large primary">Покрени поново</button>';
    document.getElementById('restartGamep2').onclick = newGame;
    document.getElementById('hideModalp2').onclick = hideModalp2;
    stopBoth()
    player1 = false;
    player2 = false;
  }

gameSetupp2(); 

let time = 60;
let timep2 = 60;

const CountdownEl = document.getElementById('countdown');
const Countdownp2El = document.getElementById('countdownp2');

setInterval(updateCountdown, 1000);
setInterval(updateCountdownp2, 1000);

function updateCountdown(){
  if(!player1){
    return;
  }
  CountdownEl.innerHTML = `${time}`;
  if(time == 0){
    gameState('lost');
    return;
  }
  time--;

}

function updateCountdownp2(){
  if(!player2){

    return;
  }
  Countdownp2El.innerHTML = `${timep2}`;
  timep2--;
  if(timep2 == 0){
    gameState('lostp2');
    return;
  }
}

}());

