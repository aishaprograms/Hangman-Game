var spells = ['accio', 'aguamenti', 'alohomora', 'colloportus', 'confringo',
'confundo', 'crucio', 'descendo', 'diffindo', 'engorgio', 'episkey'];
var userGuess='';
var word = '';
var hiddenWord = '';
var wordArray = [];
var hiddenWordArray = [];
var maxGuesses = 7;
var numWins = 0;
var numLosses = 0;
var wrongLetters = '';
var usedLetters = '';

function reset(){
	userGuess='';
	word = '';
	hiddenWord = '';
	wordArray = [];
	hiddenWordArray = [];
	maxGuesses = 7;
	numWins = 0;
	numLosses = 0;
	wrongLetters = '';
	usedLetters = '';
}

//Picks a word from the array using Math.random()
function pickWord(){
	word = spells[Math.floor(Math.random()*spells.length)];
}

function hideWord (wordString){
	wordArray = word.split('');
	for (var i = 0; i < wordArray.length; i++) {
		hiddenWord += '-';
	}
	hiddenWordArray = hiddenWord.split('');
	return hiddenWord;
}

function showWord(){
	return word;
}

function gameStart(){
	pickWord();
	hideWord();
}

//Returns boolean if userGuess is wrong
function guessMatchesChar (charOfWord){
	if(userGuess===charOfWord){
		return true;
	}
	else{
		return false;
	}
}


//Adds a wrong guess to the string wrongLetters and reduces the number of remaining guesses
function addWrongLetter(userGuess){
	if(!word.includes(userGuess) && !wrongLetters.includes(userGuess)){
		wrongLetters+=userGuess;
		maxGuesses--;
		document.getElementById('charset-wrong').innerHTML = wrongLetters;
		document.getElementById('num-guesses').innerHTML = maxGuesses;
	}
}

//Adds a right guess to the string usedLetters
function addUsedLetter(userGuess){
	if(word.includes(userGuess) && !usedLetters.includes(userGuess)){
		usedLetters+=userGuess;
	}
}

function guessLetter(){
	for (var i = 0; i < hiddenWordArray.length; i++) {
		if(guessMatchesChar(wordArray[i])){
			hiddenWordArray[i] = userGuess;
			addUsedLetter(userGuess);
		}
		else{
			addWrongLetter(userGuess);
		}
	}
	hiddenWord = hiddenWordArray.join('');
	return hiddenWord;
}

function showPlay(){
	document.getElementById('word-play').innerHTML = guessLetter();
	wonGame();
	gameOver();
}

function addWin(){
	numWins++;
}

function addLoss(){
	numLosses++;
}

function wonGame(){
	if(hiddenWord === word){
		addWin();
		document.getElementById('status-is').innerHTML = '<h3>You won!</h3>';
		document.getElementById('wins').innerHTML = 'Wins: ' + numWins;
		return true;
	}
}

function gameOver(){
	if (maxGuesses === 0){
		showWord();
		addLoss();
		document.getElementById('status-is').innerHTML = '<h3>Game over...<h3>';
		document.getElementById('losses').innerHTML = 'Losses: ' + numLosses;
		return true;
	}
}

//DOM methods
gameStart();
//User presses a key
//fix the reset and gamestart
document.onkeyup = function(event) {
	// Determines which exact key was selected. Make it lowercase
	userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	if(!wonGame() && !gameOver()){
		showPlay();
	}
	else if(wonGame()){
		reset();
		gameStart();
	}
	else if(gameOver()){
		reset();
		gameStart();
	}
}