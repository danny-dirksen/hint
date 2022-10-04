const {ipcRenderer} = require('electron');

// Messaging system
const messageQueue = [];

function queueMessage(message) {
  if (messageQueue.length == 0) {
    message.forEach(line => {
      messageQueue.push(line);
    });
  }
}

const hintEl = document.getElementById("hint");
function fit(hint) {
  const fontSize = Math.floor(Math.min(window.innerWidth / hint.length, window.innerHeight / 3));
  hintEl.style.fontSize = `${fontSize}px`;
}

window.onresize = function() {
  fit(hintEl.innerText);
}

const numWords = words.length;
function newWord() {
  const nextHint = messageQueue.shift() || words[Math.floor(Math.random() * words.length)].toUpperCase();
  fit(nextHint);
  hintEl.innerHTML = nextHint;
}

newWord();


// New word on mouse click
document.addEventListener('click', newWord);

// New word when space is pressed
document.addEventListener("keypress", evt => {
  if (evt.code == "Space" || evt.code == "Space") newWord();
});

// Quit button
document.querySelector('#x').addEventListener('click', (evt) => {
  evt.stopPropagation();
  ipcRenderer.send('quit');
});

// Help button
document.querySelector('#help').addEventListener('click', (evt) => {
  queueMessage("Click or press space to view next word. Drag the top right corner to move the window. Anyway,".split(" "));
});

// Donate button
document.querySelector('#donate').addEventListener('click', (evt) => {
  queueMessage(["Thank you!"]);
});