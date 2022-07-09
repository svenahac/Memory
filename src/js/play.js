let guessed = 0;
let counter = 0;
let minutes = 0;
let counterInterval = undefined;

function randomize() {
  for (let i = 0; i < 500; i++) {
    let randomnum1 = Math.floor(Math.random() * 15) + 1;
    let randomnum2 = Math.floor(Math.random() * 15) + 1;
    let sq1 = document.getElementById("piece" + randomnum1);
    let sq2 = document.getElementById("piece" + randomnum2);

    let sourcesq1 = sq1.parentNode.id;
    let sourcesq2 = sq2.parentNode.id;

    document.getElementById(sourcesq1).appendChild(sq2);
    document.getElementById(sourcesq2).appendChild(sq1);
  }
}

function addPieces() {
  let pair = 1;
  for (let i = 1; i <= 16; i++) {
    createPiece(i, pair);
    if (i % 2 == 0) {
      pair++;
    }
  }
}

function createPiece(num, pair) {
  let playField = document.getElementById("playing-field");
  let cont = document.createElement("div");
  let piece = document.createElement("span");
  cont.id = `cont${num}`;
  cont.className = "piece";
  cont.onclick = function () {
    startCounter();
  };
  piece.id = `piece${num}`;
  piece.className = `c${pair} disable-select`;
  piece.innerHTML = `${pair}`;
  piece.onclick = function () {
    flip(num);
  };
  cont.appendChild(piece);
  playField.appendChild(cont);
}

function flip(num) {
  let pieces = document.querySelectorAll(".disable-select");
  let el = document.getElementById("piece" + num);
  el.classList.add("clicked");
  let current = 0;
  for (let j = 0; j < pieces.length; j++) {
    if (pieces[j].classList.contains("clicked")) {
      current++;
    }
  }
  let num1 = el.innerHTML;
  let num2 = 0;
  let tempnum = 0;

  for (let i = 0; i < pieces.length; i++) {
    if (
      pieces[i].classList.contains("clicked") &&
      current == 2 &&
      pieces[i] !== el
    ) {
      num2 = pieces[i].innerHTML;
      tempnum = i;
    }
  }

  if (current === 2 && num1 == num2) {
    pieces[tempnum].classList.remove("clicked");
    pieces[tempnum].classList.add("found");
    el.classList.remove("clicked");
    el.classList.add("found");
    guessed++;
  } else if (current === 2) {
    window.setTimeout(function () {
      for (let i = 0; i < pieces.length; i++) {
        if (!pieces[i].classList.contains("found")) {
          pieces[i].classList.remove("clicked");
        }
      }
    }, 1000);
    current = 0;
  }
  if (guessed === 8) {
    setTimeout(() => {
      window.alert(
        "Congrats your time was: " + minutes + ":" + counter + " minutes"
      );
      guessed = 0;
      randomize();
      stopCounter();
      document.location.reload();
      for (let i = 0; i < pieces.length; i++) {
        pieces[i].classList.remove("found");
      }
    }, 500);
  }
}

function increaseCounter() {
  counter++;
  let number = document.getElementById("sec");
  let mins = document.getElementById("min");
  number.innerHTML = counter;
  if (counter > 9) {
    number.classList.add("sec-double");
  }
  if (counter === 60) {
    counter = 0;
    minutes++;
    number.innerHTML = 0;
    mins.innerHTML = minutes;
  }
}

function startCounter() {
  if (counterInterval === undefined) {
    counterInterval = window.setInterval(increaseCounter, 1000);
  }
}

function stopCounter() {
  window.clearInterval(counterInterval);
  counterInterval = undefined;
  counter = 0;
  minutes = 0;
  document.getElementById("sec").innerHTML = 0;
  document.getElementById("min").innerHTML = 0;
}

addPieces();
randomize();
