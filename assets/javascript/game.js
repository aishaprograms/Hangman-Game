var userGuess='';
var spells = ['accio', 'aguamenti', 'alohomora', 'colloportus', 'confringo', 'confundo', 'crucio', 'descendo', 'diffindo', 'engorgio', 'episkey'];
var selection = spells[Math.floor(Math.random()*spells.length)];
//Selected word as array and its dashed version
var selectionArray = selection.split('');
var dashedArray = wordToDashes(selection).split('');
//Global variables (numerical): number of guesses remaining, number of wins, number of losses
var numGuesses = 7;
var numWins = 0;
var numLosses = 0;
// Global variables (string): wrong letters guessed, right letters guessed
var wrongLetters = '';
var rightLetters = '';
//Global variables (array): wrong letters guessed, right letters guessed
var wrongArray = wrongLetters.split('');
var rightArray = rightLetters.split('');

//Main method
//A right guess replaces the dash
function replaceDash (wordString){
	for (var i = 0; i < dashedArray.length; i++) {
		if(!isWrong(selectionArray[i])){
			dashedArray[i] = userGuess;
			addRight(userGuess);
		}
		else{
			addWrong(userGuess);
		}
	}
	return dashedArray;
}

//The word is displayed with dashes
function wordToDashes (wordString){
	var dashedWord = '';
	for (var i = 0; i < selectionArray.length; i++) {
		dashedWord += '-';
	}
	return dashedWord;
}

//Returns boolean if guess is wrong
function isWrong(charGuess){
	if(userGuess!==charGuess){
		return true;
	}
	else{
		return false;
	}
}

//Adds a wrong guess to the string wrongLetters
function addWrong(charGuess){
	if(!selection.includes(charGuess)&&!wrongLetters.includes(charGuess)){
		wrongLetters+=charGuess;
		numGuesses--;
	}
}

//Adds a right guess to the string rightLetters
function addRight(charGuess){
	if(selection.includes(charGuess) && !rightLetters.includes(charGuess)){
		rightLetters+=charGuess;
	}
}


//DOM methods
document.getElementById('word-play').innerHTML = replaceDash(selection);
document.getElementById('num').innerHTML = numGuesses;
//User presses a key
document.onkeyup = function(event) {
	// Determines which exact key was selected. Make it lowercase
	userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	document.getElementById('word-play').innerHTML = replaceDash(selection);
	document.getElementById('charset-wrong').innerHTML = wrongLetters;
	document.getElementById('num').innerHTML = numGuesses;
}