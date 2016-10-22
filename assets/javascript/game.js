var spells = ['accio', 'aguamenti', 'alohomora', 'colloportus', 'confringo',
'confundo', 'crucio', 'descendo', 'diffindo', 'engorgio', 'episkey', 'evanesco', 'expelliarmus', 'imperio', 'incendio', 'lumos', 'nox', 'relashio', 'reparo', 'silencio'];
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

//Returns boolean if userGuess is wrong
function guessMatchesChar (charOfWord){
	return userGuess===charOfWord;
}


//Adds a wrong guess to the string wrongLetters and reduces the number of remaining guesses
function addWrongLetter(userGuess){
	if(!word.includes(userGuess) && !wrongLetters.includes(userGuess)){
		wrongLetters+=userGuess;
		maxGuesses--;

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

function addWin(){
	numWins++;
}

function addLoss(){
	numLosses++;
}

function wonGame(){
	return hiddenWord === word;
}

function gameOver(){
	return maxGuesses === 0;
}

function isNewGame(){
	return word === '';
}

function isPlaying(){
	return hiddenWord !== word && maxGuesses > 0;
}
function reset(){
	userGuess='';
	word = '';
	hiddenWord = '';
	wordArray = [];
	hiddenWordArray = [];
	maxGuesses = 7;
	wrongLetters = '';
	usedLetters = '';
}

function gameStart(){
	pickWord();
	hideWord();
	document.getElementById('word-play').innerHTML = hiddenWord;
	document.getElementById('charset-wrong').innerHTML = wrongLetters;
	document.getElementById('num-guesses').innerHTML = maxGuesses;
	document.getElementById('winning-word').innerHTML = '';
	document.getElementById('status-is').innerHTML = '<h3>You are playing this round.</h3>';
	changeImg();
}

function showPlay(){
	document.getElementById('word-play').innerHTML = guessLetter();
	document.getElementById('charset-wrong').innerHTML = wrongLetters;
	document.getElementById('num-guesses').innerHTML = maxGuesses;
	document.getElementById('status-is').innerHTML = '<h3>You are playing this round.</h3>';
	changeImg();
}

function showWin(){
	addWin();
	document.getElementById('word-play').innerHTML = showWord();
	document.getElementById('status-is').innerHTML = '<h3>You won!</h3>';
	document.getElementById('wins').innerHTML = 'Wins: ' + numWins;
	document.getElementById('winning-word').innerHTML = '<h4>The winning spell is ' + word + '. Press space to continue.</h4>';
	document.getElementById('hp-caption').innerHTML = '<p>Congratulations. You got the spell this round.</p>';
}

function showLoss(){
	addLoss();
	document.getElementById('word-play').innerHTML = showWord();
	document.getElementById('status-is').innerHTML = '<h3>Game over...<h3>';
	document.getElementById('losses').innerHTML = 'Losses: ' + numLosses;
	document.getElementById('winning-word').innerHTML = '<h4>The winning spell is ' + word + '. Press space to continue.</h4>';
}

function changeImg(){
	if(maxGuesses===7){
		document.getElementById('hp-img').innerHTML = '<img src=assets/images/potter.jpg>';
		document.getElementById('hp-caption').innerHTML = '<p>You are being trusted to handle this spell.</p>';
	}
	else if(maxGuesses===6){
		document.getElementById('hp-img').innerHTML = '<img src=assets/images/hermione.jpg>';
		document.getElementById('hp-caption').innerHTML = '<p>Please tell me you studied this spell.</p>';
	}
	else if(maxGuesses===5){
		document.getElementById('hp-img').innerHTML = '<img src=assets/images/ron.jpg>';
		document.getElementById('hp-caption').innerHTML = '<p>Look, if you do not have a handle on this spell, we cannot help you.</p>';
	}
	else if(maxGuesses===4){
		document.getElementById('hp-img').innerHTML = '<img src=assets/images/dumbledore.jpg>';
		document.getElementById('hp-caption').innerHTML = '<p>You were assigned with a monumental task. Do not fail this one.</p>';
	}
	else if(maxGuesses===3){
		document.getElementById('hp-img').innerHTML = '<img src=assets/images/umbridge.jpg>';
		document.getElementById('hp-caption').innerHTML = '<p>Pity, pity. Dumbledore is no longer here to help you.</p>';
	}
	else if(maxGuesses===2){
		document.getElementById('hp-img').innerHTML = '<img src=assets/images/order.jpg>';
		document.getElementById('hp-caption').innerHTML = '<p>Brace yourself, the Death Eaters are approaching.</p>';
	}
	else if(maxGuesses===1){
		document.getElementById('hp-img').innerHTML = '<img src=assets/images/bellatrix.jpg>';
		document.getElementById('hp-caption').innerHTML = '<p>*shrieking*</p>';
	}
	else if(maxGuesses===0){
		document.getElementById('hp-img').innerHTML = '<img src=assets/images/voldemort.jpg>';
		document.getElementById('hp-caption').innerHTML = '<p>It is too late. You lost this round.</p>';
	}
}

//DOM methods
//User presses a key
gameStart();
document.onkeyup = function(event) {
	// Determines which exact key was selected. Make it lowercase
	userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	if(isNewGame()){
		gameStart();
	}
	else if(isPlaying()){	
		showPlay();
		if(wonGame()){
			showWin();
			reset();
		}
		else if(gameOver()){
			showLoss();
			reset();
		}
	}
	
}