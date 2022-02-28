// [04] Your Trainings To Add Features
//   ---- [01] Save Score To Local Storage With Date
//   ---- [02] Choose Levels From Select Box
//   ---- [03] Break The Logic To More Functions
//   ---- [04] Choose Array Of Words For Every Level
//   ---- [05] Write Game Instruction With Dynamic Values
//   ---- [06] Add 3 Seconds For The First Word


// Array Of Words
const words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
];

// Settings of levels

const lvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
};

// Default Level 
let defaultLevelName = "Normal"; //Change Level from here
let defaultLevelSeconds = lvls[defaultLevelName];

// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word")
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// Settings Level Name + Seconds + Score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;    
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable paste Event
input.onpaste = function () {
    return false;
}

//Start Game 
startButton.onclick = function () {
    this.remove();
    input.focus();
    // Generate Word Function
    genWords();
}


function genWords() {
    // Generate Random Word from array
    let randomWord = words[Math.floor(Math.random() * words.length)]
    // Get word Index
    let wordIndex = words.indexOf(randomWord);
    // Remove word from array
    words.splice(wordIndex, 1);
    // Show the random word
    theWord.innerHTML = randomWord;
    // Empty upcoming words
    upcomingWords.innerHTML = "";
    // Generate words
    for (let i = 0; i < words.length; i++) {
        let div = document.createElement("div");
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
    // Call Start play fuction
    startPlay();
}

function startPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    let start = setInterval( () => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === "0") {
            // Stop timer
            clearInterval(start);
            // Compare Words
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                // Empty Input Field
                input.value = '';
                // Increase Score
                scoreGot.innerHTML++;
                if (words.length > 0 ) {
                    // Call the generate word function
                    genWords();
                } else {
                    let span = document.createElement("span");
                    span.className = 'good';
                    let spanText = document.createTextNode("Mission Acomplished");
                    span.appendChild(spanText);
                    finishMessage.appendChild(span);
                    // remove upcoming box
                    upcomingWords.remove();
                }
            } else {
                let span = document.createElement("span");
                span.className = 'bad';
                let spanText = document.createTextNode("Game Over");
                span.appendChild(spanText);
                finishMessage.appendChild(span);
            }
        }
    }, 1000);
}