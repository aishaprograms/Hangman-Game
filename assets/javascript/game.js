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

//The word is displayed with dashes
function wordToDashes (wordString){
	var dashedWord = '';
	for (var i = 0; i < selectionArray.length; i++) {
		dashedWord += '-';
	}
	return dashedWord;
}

function isWrong(charGuess){
	if(userGuess!==charGuess){
		return true;
	}
	else{
		return false;
	}
}
function addWrong(charGuess){
	if(!selection.includes(charGuess)&&!wrongLetters.includes(charGuess)){
		wrongLetters+=charGuess;
		numGuesses--;
	}
}
function addRight(charGuess){
	if(selection.includes(charGuess) && !rightLetters.includes(charGuess)){
		rightLetters+=charGuess;
	}
}

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

//After max guesses reached, a loss is counted, correct word is displayed, next word is played
function maxGuessed (){
	if(numGuesses===0)
	{
		dashedArray= selectionArray;
		return true;
	}
}

//After word is guessed, a win is counted, next word is displayed
//might cause error
function gotWord(){
	for (var i = 0; i < dashedArray.length; i++) {
		if(dashedArray[i]!==selectionArray[i]){
			return false;
		}
		else{
			return true;
			break;
		}
		}
}

//User presses a key
document.onkeyup = function(event) {
	// Determines which exact key was selected. Make it lowercase
	userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	document.getElementById('word-play').innerHTML = replaceDash(selection);
	document.getElementById('charset-wrong').innerHTML = wrongLetters;
	document.getElementById('num').innerHTML = numGuesses;
}