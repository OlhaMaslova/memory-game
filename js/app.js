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

const cardsContainer = document.querySelector(".deck");

// Create a deck of cards
for (let i = 0; i < cards.length; i++){
	const card = document.createElement("li");
	card.classList.add("card");
	card.innerHTML = `<i class ="${cards[i]}"></i>`;
	cardsContainer.appendChild(card);

	// Card click event
	card.addEventListener("click", function(){
		// One card has already been opened
		if(openCards.length === 1){
			card.classList.add("open", "show");
			openCards.push(this);

			// Compare our 2 opened cards
			if (this.innerHTML === openCards[0].innerHTML){
				
				this.classList.add("match");
				openCards[0].classList.add("match");

				openCards = [];

			} else{
				this.classList.remove("open", "show");
				openCards[0].classList.remove("open", "show");

				openCards = [];
			}
		} else { // no card has been opened
			card.classList.add("open", "show");
			openCards.push(this);
		}
	});
}

function compare() {

}

// Shuffle function from http://stackoverflow.com/a/2450976
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


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card"s HTML to the page
 */



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card"s symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card"s symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */