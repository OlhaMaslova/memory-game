// Variables declaration
const cardsContainer = document.querySelector('.deck');
const starsContainer = document.querySelector('.stars');
const playAgain = document.querySelector('.PlayAgain'); // Button in Modal view
const movesContainer = document.querySelector('.moves'); 
const restartBtn = document.querySelector('.restart'); // Restart button on the Score Panel

// List of all cards
let cards = [
	'fa fa-ambulance',
	'fa fa-subway',
	'fa fa-paper-plane',
	'fa fa-ship',
	'fa fa-taxi',
	'fa fa-rocket',
	'fa fa-motorcycle',
	'fa fa-bicycle'];

let counter = 0; // Counter for seconds 
let moves = 0; // Starting # of moves
let openCards = []; // Array to save two opened cards
let matchedCards = 0; // Number of matched cards
let stars = 3; // Starting rating

let timer = document.querySelector('.timer');
let modal = document.querySelector('.modal');

// Start the game for the first time
cards = cards.concat(cards);
shuffle(cards);
init();
showTime();

/*
 * Initialize the game
 */
function init() {
	// Create a deck of cards
	for (let i = 0; i < cards.length; i++){
		const card = document.createElement('li');
		card.classList.add('card');
		card.innerHTML = `<i class ='${cards[i]}'></i>`;
		cardsContainer.appendChild(card);

		// Add click event to each card
		click(card);
	}
}

/*
 * Click event
 */
function click(card) {
	// Card click event
	card.addEventListener('click', function(){
		let currentCard = this; 
		let previousCard = openCards[0];

		// One card has already been opened
		if(openCards.length === 1){
			card.classList.add('open', 'show', 'disabled');
			openCards.push(this);

			// Compare our 2 opened cards
			if (this.innerHTML === openCards[0].innerHTML){
				// Matched
				currentCard.classList.add('match', 'animated', 'bounceIn');
				previousCard.classList.add('match', 'animated', 'bounceIn');
				openCards = [];
				matchedCards += 2;
				// Check if the game is over
				gameOver();

			} else{
				// Do not match
				openCards = [];
				currentCard.classList.add('unmatch', 'animated', 'shake');
				previousCard.classList.add('unmatch','animated', 'shake');
				setTimeout(function() {
					currentCard.classList.remove('open', 'show', 'disabled', 'unmatch', 'animated', 'shake');
					previousCard.classList.remove('open', 'show', 'disabled', 'unmatch', 'animated', 'shake');
				}, 500);
			}
		} else {
		// no card has been opened
			card.classList.add('open', 'show', 'disabled');
			openCards.push(this);

			// Add new move
			addMove();
		}
	});
}

/*
 * Shuffle function from http://stackoverflow.com/a/2450976
 */
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Rating
 */
function rating() {
	switch(moves){
		case 16: 
			starsContainer.innerHTML = `<li><i class='fa fa-star'></i></li>
				<li><i class='fa fa-star'></i></li>`;
			stars = 2;
			break;
		case 26:
			starsContainer.innerHTML = `<li><i class='fa fa-star'></i></li>`;
			stars = 1;
			break;
	}
}

/*
 * Moves
 */
movesContainer.innerHTML = 0; 
function addMove() {
	moves++;
	movesContainer.innerHTML = moves;

	// Set rating
	rating();
}

/*
 * Restart Game: Clear all dependencies
 */
function restartGame() {
	// Delete all cards
	cardsContainer.innerHTML = '';
	// Reset rating
	starsContainer.innerHTML = `<li><i class='fa fa-star'></i></li>
								<li><i class='fa fa-star'></i></li>
								<li><i class='fa fa-star'></i></li>`;
	//Hide modal window
	modal.classList.remove('ShowModal');
	// Reset moves
	movesContainer.innerHTML = 0;
	// Reset timer to 0
	timer.innerHTML = '0 <i class="fa fa-clock-o"></i>';
	// Call shuffle
	shuffle(cards);
	// Call 'init' to create new cards
	init();
	// clear interval for timer
	clearInterval(intervalId);
	// Start a new timer
	showTime();
	// Reset all related letiables
	openCards = [];
	matchedCards = 0;
	moves = 0;
	stars = 3;
	seconds = 0;
}

/*
 * Check if the game is over
 */
function gameOver() {
	let content = document.querySelector('.content');

	let totalMoves = document.querySelector('.MovesValue');
	let totalStars = document.querySelector('.RatingValue');
	let totalTime = document.querySelector('.TimeValue');
	if (matchedCards === cards.length) {
		modal.classList.add('ShowModal');
		totalMoves.innerHTML = moves; 
		totalStars.innerHTML = stars;
		totalTime.innerHTML = counter;
		clearInterval(intervalId);
	}
}

/*
 * timer
 */
function showTime() {
	counter = 0;
	intervalId = setInterval(increment, 1000);
}

function increment(){
	counter++;
	timer.innerHTML = counter + ' <i class="fa fa-clock-o"></i>';
}



/*
 * Event Listeners
 */
playAgain.addEventListener('click', restartGame); // Play again button - modal view
restartBtn.addEventListener('click', restartGame); // Restart Button - score panel