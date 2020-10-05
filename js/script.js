const wordEl = document.getElementById('word');
const wrongLettersEL = document.getElementById('wrong-letter');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');
const words = ['young','TV', 'successful', 'radio', 'quite', 'arm', 'art', 'baby', 'blood', 'child', 'kid', 'cold', 'hot', 'snowman', 'dinner', 'food', 'family']
const correctLetters = [];
const wrongLetters = [];

let selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
let playable = true;



function displayWord() {
    wordEl.innerHTML = `${selectedWord
        .split('')
        .map( letter => `<span class="letter">${correctLetters
        .includes(letter) ? letter : ''}</span>`)
        .join('')}`;
    
    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord){
        finalMessage.textContent = 'Congratulations! You won! 😃';
        popup.style.display = 'flex';
        playable = false;
    }
}

function updatewrongLettersEl() {
    wrongLettersEL.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter=> `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part, index)=>{
        const errors = wrongLetters.length;
        if(index < errors){
            part.style.display = 'block';       
        } else {
            part.style.display = 'none';
        }
    });
    if(wrongLetters.length === figureParts.length){
        finalMessage.textContent = 'Unfortunately you lost. 😕';
        popup.style.display = 'flex';
        playable = false;
    }
}
function showNotification() {
    notification.classList.add('show');
    setTimeout(()=>{
        notification.classList.remove('show');
    }, 2000);
}

playAgainBtn.addEventListener('click', ()=>{
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    displayWord();
    updatewrongLettersEl();
    popup.style.display = 'none';
    playable = true;
})

window.addEventListener('keydown', e=>{
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key.toUpperCase();
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updatewrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

displayWord();