// List of all cards
const cards = [
	"fa fa-ambulance",
	"fa fa-subway",
	"fa fa-paper-plane",
	"fa fa-ship",
	"fa fa-taxi",
	"fa fa-rocket",
	"fa fa-motorcycle",
	"fa fa-bicycle",
	"fa fa-ambulance",
	"fa fa-subway",
	"fa fa-paper-plane",
	"fa fa-ship",
	"fa fa-taxi",
	"fa fa-rocket",
	"fa fa-motorcycle",
	"fa fa-bicycle"];

let openCards = [];
let matchedCards = 0;

const cardsContainer = document.querySelector(".deck");

// Start the game for the first time
init();

/*
 * Initialize the game
 */

function init() {
	// Create a deck of cards
	for (let i = 0; i < cards.length; i++){
		const card = document.createElement("li");
		card.classList.add("card");
		card.innerHTML = `<i class ="${cards[i]}"></i>`;
		cardsContainer.appendChild(card);

		// Add click event to each card
		click(card);
	}
}

/*
 * Check if the game is over
 */
function gameOver() {
	if (matchedCards === cards.length) {
		alert("Game Over!")
	}
}

/*
 * Click event
 */
function click(card) {
	// Card click event
	card.addEventListener("click", function(){
		let currentCard = this;
		let previousCard = openCards[0];

		// One card has already been opened
		if(openCards.length === 1){
			card.classList.add("open", "show", "disabled");
			openCards.push(this);

			// Compare our 2 opened cards
			if (this.innerHTML === openCards[0].innerHTML){
				// Matched
				currentCard.classList.add("match");
				previousCard.classList.add("match");

				openCards = [];
				matchedCards += 2;
				// Check if the game is over
				gameOver();

			} else{
				// Do not match
				openCards = [];
				setTimeout(function() {
					currentCard.classList.remove("open", "show", "disabled");
					previousCard.classList.remove("open", "show", "disabled");
				}, 500);
			}
		} else { 
		// no card has been opened
			card.classList.add("open", "show", "disabled");
			openCards.push(this);
		}
	});
}

/*
 * Shuffle function from http://stackoverflow.com/a/2450976
 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

