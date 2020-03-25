const cards = document.querySelectorAll('.memory-card');
// Get the modal
var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var leir= document.getElementById("myleir");


myLeirasok = {
  "leiras": {


"1":"Asztal </br> Apátfalva, 1912",
"2":"Hordókulacs</br> Apátfalva,19. sz. vége",
"3":"Tintatartó</br> Makó, 19. század",
"4":"	Gondolkodószék</br>Apátfalva, 19. sz. közepe/ 20. sz. eleje",
"5":"	Vállkendő<br>Magyarcsanád, 20. sz. eleje",
"6":"	Menyasszonyi láda<br>Makó, 1846",
"7":"	Csörögéstál<br>Hódmezővásárhely, 1847",
"8":"	Menyasszonyi láda <br>Makó, 1812",
"9":"	Gondolkodószék<br>Makó, 1873",
"10":"	Mellény <br>Csanádalberti, 20. sz. közepe",
"11":"	Törülköző <br>Apátfalva, 19. sz. vége",
"12":"	Főkötő és gallér<br>Magyarcsanád, 19. sz. vége",
"13":"	Kulacs<br>Makó, 19. sz.",
"14":"Menyasszonyi láda <br>Makó, 1813"

  }
 }

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  modal.style.display = "block";
  leir.innerHTML =myLeirasok. leiras[firstCard.dataset.framework];
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
 
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

cards.forEach(card => card.addEventListener('click', flipCard));
