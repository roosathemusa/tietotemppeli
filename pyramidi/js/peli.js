const initialWords = [
    "omena", "banaani", "appelsiini", "päärynä", "mango",
    "koira", "kissa", "kani", "hamsteri",
    "auto", "bussi", "juna",
    "sininen", "punainen",
    "tietokone"
];

const correctAnswersByRow = [
    ["omena", "banaani", "appelsiini", "päärynä", "mango"],
    ["koira", "kissa", "kani", "hamsteri"],
    ["auto", "bussi", "juna"],
    ["sininen", "punainen"],
    ["tietokone"]
];

const otsikot = [
    "Hedelmät:",
    "Eläimet:",
    "Kulkuvälineet:",
    "Värit:",
    "Laite:"
];

const pyramid = [5, 4, 3, 2, 1];
const grid = document.getElementById("words-grid");
let selectedWords = [];
let checkedRows = new Set();

let words = [...initialWords];
let availableWords = [...words].sort(() => Math.random() - 0.5);
let wordButtons = []; // tallentaa kaikki alkuperäiset sananapit oikeassa järjestyksessä

// Luo rivit niin, että jokainen sana tulee vain kerran
function createGrid() {
    grid.innerHTML = ""; // Tyhjennä aiempi sisältö
    wordButtons = []; // Tyhjennä aiempi sananappilista

    pyramid.forEach((rowSize, i) => {
        const row = document.createElement("div");
        row.className = `row row-${i + 1}`;

        for (let j = 0; j < rowSize; j++) {
            if (availableWords.length > 0) {
                const word = availableWords.shift();
                const btn = document.createElement("button");
                btn.textContent = word;
                btn.className = "word-button";
                btn.addEventListener("click", () => selectWord(btn));
                wordButtons.push(btn); // tallenna alkuperäiseen listaan
                row.appendChild(btn);
            }
        }

        grid.appendChild(row);
    });
}

createGrid();

function selectWord(button) {
    button.classList.toggle("selected");
    if (button.classList.contains("selected")) {
        selectedWords.push(button.textContent);
    } else {
        selectedWords = selectedWords.filter(word => word !== button.textContent);
    }
}

const mergedRowImages = [
    "osa1.png",
    "osa2.png",
    "osa3.png",
    "osa4.png",
    "osa5.png"
];

function mergeRowWords(rowIndex, mergedText, otsikko) {
    const row = document.querySelector(`.row-${rowIndex}`);
    const cols = pyramid[rowIndex - 1];  // monta saraketta tällä rivillä
  
    // Tyhjennä vain sisältö, älä grid asetusta
    row.innerHTML = "";
  
    // Luo nappi, joka spanää koko rivin levyisen alueen
    const mergedBtn = document.createElement("button");
    mergedBtn.className = "merged-button";
    mergedBtn.disabled = true;
    mergedBtn.style.gridColumn = `1 / span ${cols}`;
    mergedBtn.innerHTML = `<strong>${otsikko}</strong><br>${mergedText}`;
  
    row.appendChild(mergedBtn);
}

function checkRow() {
    let found = false;

    for (let i = 0; i < correctAnswersByRow.length; i++) {
        if (checkedRows.has(i)) continue;

        const correctWords = correctAnswersByRow[i];
        if (
            selectedWords.length === correctWords.length &&
            selectedWords.every(word => correctWords.includes(word))
        ) {
            mergeRowWords(i + 1, selectedWords.join(", "), otsikot[i]);
            checkedRows.add(i);
            document.getElementById("result").textContent = `Rivi ${i + 1} on oikein!`;

            // Poista käytetyt sanat vakiolistasta
            selectedWords.forEach(word => {
                const index = words.indexOf(word);
                if (index > -1) {
                    words.splice(index, 1);
                }
            });

            // Päivitä availableWords-lista
            availableWords = [...words].sort(() => Math.random() - 0.5);

            // Päivitä sananapit
            wordButtons.forEach(btn => {
                if (selectedWords.includes(btn.textContent)) {
                    btn.remove(); // Poista käytetyt sananapit
                }
            });

            selectedWords = [];
            document.querySelectorAll('.word-button').forEach(btn => btn.classList.remove("selected"));
            found = true;
            break;
        }
    }

    if (!found) {
        document.getElementById("result").textContent = `Valinta ei vastaa mitään riviä.`;
    }

    if (checkedRows.size === correctAnswersByRow.length) {
        document.getElementById("result").textContent += " Kaikki rivit on tarkistettu!";
    }
}

document.getElementById("checkButton").addEventListener("click", checkRow);
