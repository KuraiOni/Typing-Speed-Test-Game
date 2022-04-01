// [04] Your Trainings To Add Features
//   ---- [01] Save Score To Local Storage With Date
//   ---- [02] Choose Levels From Select Box // Done
//   ---- [03] Break The Logic To More Functions
//   ---- [04] Choose Array Of Words For Every Level // Done
//   ---- [05] Write Game Instruction With Dynamic Values //Done
//   ---- [06] Add 3 Seconds For The First Word


// Array Of Words 
const normalWords = [
    "Twitter",
    "Youtube",
    "Testing",
    "Country",
    "Github",
    "Runner",
    "Playing",
    "Python",
    "Scala",
    "Styling",
    "Cascade",
    "Working"
]

const easyWords = [
    "Hello",
    "Code",
    "Town",
    "Coding",
    "Funny",
    "Task",
    "Roles",
    "Test",
    "Rust"
]
const hardWords = [
    "Programming",
    "Javascript",
    "Linkedin",
    "Leetcode",
    "Internet",
    "Destructuring",
    "Paradigm",
    "Documentation",
    "Dependencies",
];

// Settings of levels

const lvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
};

// Default Level 
let select = document.querySelector("select");
let defaultLevelName = "Normal"; //Change Level from here
// console.log(defaultLevelName);
let defaultLevelSeconds = lvls[defaultLevelName];

select.addEventListener('change', function () {
    defaultLevelName = select.options[select.selectedIndex].text;
    defaultLevelSeconds = lvls[defaultLevelName];
    console.log(defaultLevelName);
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    showInst();
})

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
let reloadButton = document.querySelector(".reload");
let instCards = document.querySelector(".cards");

// Settings Level Name + Seconds + Score

secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
switch (defaultLevelName) {
    case 'Normal':
        scoreTotal.innerHTML = normalWords.length;
        showInst();
        break;
    case 'Easy':
        scoreTotal.innerHTML = easyWords.length;
        showInst();
        break;
    case 'Hard':
        scoreTotal.innerHTML = hardWords.length;
        showInst();
        break;
}

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
    let randomWord;
    // Get word Index
    let wordIndex;

    // Empty upcoming words
    upcomingWords.innerHTML = "";

    if (defaultLevelName === "Normal") {
        randomWord = normalWords[Math.floor(Math.random() * normalWords.length)]
        wordIndex = normalWords.indexOf(randomWord);
        // Remove word from array
        normalWords.splice(wordIndex, 1);
        // Generate words
        for (let i = 0; i < normalWords.length; i++) {
            let div = document.createElement("div");
            let txt = document.createTextNode(normalWords[i]);
            div.appendChild(txt);
            upcomingWords.appendChild(div);
        }
    } else if (defaultLevelName === "Easy") {
        randomWord = easyWords[Math.floor(Math.random() * easyWords.length)]
        wordIndex = easyWords.indexOf(randomWord);
        // Remove word from array
        easyWords.splice(wordIndex, 1);
        for (let i = 0; i < easyWords.length; i++) {
            let div = document.createElement("div");
            let txt = document.createTextNode(easyWords[i]);
            div.appendChild(txt);
            upcomingWords.appendChild(div);
        }
    } else {
        randomWord = hardWords[Math.floor(Math.random() * hardWords.length)]
        wordIndex = hardWords.indexOf(randomWord);
        // Remove word from array
        hardWords.splice(wordIndex, 1);
        for (let i = 0; i < hardWords.length; i++) {
            let div = document.createElement("div");
            let txt = document.createTextNode(hardWords[i]);
            div.appendChild(txt);
            upcomingWords.appendChild(div);
        }
    }

    // Show the random word
    theWord.innerHTML = randomWord;
    // Call Start play fuction
    startPlay();
}

function startPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    let start = setInterval(() => {
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
                if (defaultLevelName === "Normal") {
                    if (normalWords.length > 0) {
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
                } else if (defaultLevelName === "Easy") {
                    if (easyWords.length > 0) {
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
                    if (hardWords.length > 0) {
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

reloadButton.onclick = function () {
    startButton.remove();
    this.remove();
    input.focus();
    // Generate Word Function
    genWords();
}

function showInst() {
    // Empty the Cards div
    instCards.innerHTML="";
    // Putting the cases of the insructions
    switch(defaultLevelName) {
        case 'Normal': instCards.innerHTML=`<div class="normal">
                                                <h1>How to Play:</h1>
                                                <ul>
                                                    <li>You got 3 seconds to type the word</li>
                                                    <li>All words are normal size with not much to type but it's not that short also</li>
                                                </ul>
                                            </div>`
            break;
        case 'Easy': instCards.innerHTML=`  <div class="easy">
                                                <h1>How to Play:</h1>
                                                <ul>
                                                    <li>You got 5 seconds to type the word</li>
                                                    <li>All the words are short size</li>
                                                </ul>
                                            </div>`
            break;
        case 'Hard': instCards.innerHTML=`  <div class="hard">
                                                <h1>How to Play:</h1>
                                                <ul>
                                                    <li>You got 2 seconds to type the word</li>
                                                    <li>All words are long with too much to type</li>
                                                </ul>
                                            </div>`
            break;
    }

}





