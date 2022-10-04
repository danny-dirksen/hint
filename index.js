const wordEl = document.getElementById("word");
const numWords = words.length;
function newWord() {
  wordEl.innerHTML = words[Math.floor(Math.random() * words.length)].toUpperCase();
  // window.fitText(wordEl, 1.0);
}

newWord();

document.addEventListener("click", newWord);
document.addEventListener("keypress", evt => {
  if (evt.code == "Space" || evt.code == "Space") newWord();
});