const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");
const buttons = document.querySelectorAll(".btn");
const lettersButton = document.querySelector(".btn-letters");
const noteButton = document.querySelector(".btn-notes");

function playNote(pianoKey) {
  const note = document.getElementById(pianoKey.dataset.note);
  note.currentTime = 0;
  note.play();
}

function mouseDown({ target: pianoKey }) {
  if (pianoKey.classList.contains("piano-key")) {
    pressPianoKey(pianoKey);
    pianoKeys.forEach((pianoKey) => {
      pianoKey.addEventListener("mouseover", onPianoKeyMouseOver);
      pianoKey.addEventListener("mouseout", onPianoKeyMouseOut);
    });
  }
}

function mouseUp(event) {
  pianoKeys.forEach((pianoKey) => {
    unPressPianoKey(pianoKey);
    pianoKey.removeEventListener("mouseover", onPianoKeyMouseOver);
    pianoKey.removeEventListener("mouseout", onPianoKeyMouseOut);
  });
}

function onPianoKeyMouseOver({ target: pianoKey }) {
  playNote(pianoKey);
  togglePianoKey(pianoKey, true);
}

function onPianoKeyMouseOut({ target: pianoKey }) {
  togglePianoKey(pianoKey, false);
}

function getPianoKeyByLetter(key) {
  return document.querySelectorAll(
    '[data-letter-keyboard="' + key + '"]'
  )[0];
}

function onKeyDown(event) {
  if (event.repeat) return;
  const pianoKey = getPianoKeyByLetter(event.code);
  if (pianoKey === undefined) return;
  pressPianoKey(pianoKey);
}

function onKeyUp({ code }) {
  const pianoKey = getPianoKeyByLetter(code);
  if (pianoKey === undefined) return;
  unPressPianoKey(pianoKey);
}

function pressPianoKey(pianoKey) {
  playNote(pianoKey);
  togglePianoKey(pianoKey, true);
}

function unPressPianoKey(pianoKey) {
  togglePianoKey(pianoKey, false);
}

function togglePianoKey(pianoKey, state) {
  pianoKey.classList.toggle("piano-key-active", state);
  pianoKey.classList.toggle("piano-key-active-pseudo", state);
}

function buttonChanger(bttn) {
  if (bttn.target.classList.contains("btn-letters")) {
    lettersButton.classList.toggle("btn-active", "letter");
    noteButton.classList.remove("btn-active");
    pianoKeys.forEach((event) => {
      event.classList.remove("piano-key-note");
      event.classList.add("piano-key-letter");
    });
  }
  if (bttn.target.classList.contains("btn-notes")) {
    lettersButton.classList.remove("btn-active", "letter", "piano-key-letter");
    noteButton.classList.add("btn-active");
    pianoKeys.forEach((event) => {
      event.classList.add("piano-key-note");
      event.classList.remove("piano-key-letter");
    });
  }
}

function activateFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();        // W3C spec
  }
  else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();     // Firefox
  }
  else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();  // Safari
  }
  else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();      // IE/Edge
  }
};

function deactivateFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};

buttons.forEach((changer) => {
  changer.addEventListener("click", buttonChanger);
});

document.addEventListener("keydown", onKeyDown);

document.addEventListener("keyup", onKeyUp);

piano.addEventListener("mousedown", mouseDown);

document.addEventListener("mouseup", mouseUp);
