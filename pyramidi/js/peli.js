// Sekoitustoiminto
function shuffleWords() {
  const pyramid = document.getElementById('pyramid');
  const allWords = Array.from(document.querySelectorAll('.word'));

  // Sekoita sanat (Fisher-Yates)
  for (let i = allWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allWords[i], allWords[j]] = [allWords[j], allWords[i]];
  }

  // Tyhjennä rivit pyramidissa
  const rows = pyramid.querySelectorAll('.row');
  rows.forEach(row => row.innerHTML = '');

  // Lisää sekoitetut sanat riveihin säilyttäen pyramidimuoto
  let index = 0;
  for (let i = 0; i < rows.length; i++) {
    const wordsInRow = i + 1;
    for (let j = 0; j < wordsInRow && index < allWords.length; j++) {
      rows[i].appendChild(allWords[index]);
      index++;
    }
  }
}

// Alustukset
window.addEventListener('DOMContentLoaded', () => {
  shuffleWords();

  const words = document.querySelectorAll('.word');
  words.forEach(word => {
    word.addEventListener('click', handleClick);
  });
});

let selectedWords = [];
let score = 0;

const yhdistetytSanat = {
  verbit: new Set(),
  adjektiivit: new Set(),
  pronominit: new Set(),
  substantiivit: new Set(),
  numeraalit: new Set()
};

const oikeatMäärät = {
  verbit: 5,
  adjektiivit: 4,
  pronominit: 3,
  substantiivit: 2,
  numeraalit: 1
};

const kategoriaRivit = {
  numeraalit: 'row-5',
  substantiivit: 'row-4',
  pronominit: 'row-3',
  adjektiivit: 'row-2',
  verbit: 'row-1'
};

const scoreDisplay = document.getElementById('score');
const checkButton = document.getElementById('check-button');
const message = document.getElementById('message');

// Pelin päättymisilmoitus
function showGameOverMessage() {
  const gameOverMessage = document.getElementById("game-over-message");
  gameOverMessage.style.display = "block";  // Näytetään ilmoitus
  setTimeout(() => {
    gameOverMessage.style.opacity = 1;  // Animaatio alkaa
  }, 100);
}

// Sulje peli päättymisilmoitus
document.getElementById('close-message').addEventListener('click', function() {
  const gameOverMessage = document.getElementById('game-over-message');
  gameOverMessage.style.display = 'none';  // Piilotetaan ilmoitus
});

function handleClick(e) {
  const word = e.target;
  word.classList.toggle('selected');

  if (word.classList.contains('selected')) {
    selectedWords.push(word);
  } else {
    selectedWords = selectedWords.filter(w => w !== word);
  }
}

function checkSelectedWords() {
  if (selectedWords.length === 0) return;

  const categories = selectedWords.map(w => w.getAttribute('data-category'));
  const firstCategory = categories[0];
  const allSame = categories.every(c => c === firstCategory);

  if (!allSame) {
    message.textContent = 'Sanat eivät kuulu samaan kategoriaan!';
    selectedWords.forEach(w => w.classList.add('wrong'));
    setTimeout(() => {
      selectedWords.forEach(w => w.classList.remove('wrong', 'selected'));
      selectedWords = [];
    }, 1000);
    return;
  }

  // Lisää sanat yhdistettyihin
  selectedWords.forEach(w => {
    yhdistetytSanat[firstCategory].add(w.innerText);
    w.classList.add('combined', 'correct');
    w.removeEventListener('click', handleClick);
  });

  if (yhdistetytSanat[firstCategory].size === oikeatMäärät[firstCategory]) {
    message.textContent = `🎉 Sanaluokka ${firstCategory} on oikein!`;
    score += 2;
    scoreDisplay.textContent = `Pisteet: ${score} / 10`;
    sessionStorage.setItem('peli4', score);

    const targetRowId = kategoriaRivit[firstCategory];
    const targetRow = document.getElementById(targetRowId);

    const allWords = Array.from(document.querySelectorAll('.word'));
    allWords.forEach(w => {
      if (
        w.getAttribute('data-category') === firstCategory &&
        yhdistetytSanat[firstCategory].has(w.innerText)
      ) {
        w.classList.add('final');
        targetRow.appendChild(w);
      }
    });

    updateRemainingWordsLayout();
  } else {
    message.textContent = `✅ Olet oikeilla jäljillä! Jatka yhdistämistä.`;
  }

  const kaikkiValmiit = Object.keys(oikeatMäärät).every(kategoria =>
    yhdistetytSanat[kategoria].size === oikeatMäärät[kategoria]
  );

  if (kaikkiValmiit) {
    message.textContent = '';  
    checkButton.disabled = true;  
    showGameOverMessage();  
  }
  

  selectedWords = [];
}

checkButton.addEventListener('click', checkSelectedWords);

// Järjestä jäljelle jäävät sanat pyramidin muotoon
function updateRemainingWordsLayout() {
  const pyramid = document.getElementById('pyramid');
  const rows = pyramid.querySelectorAll('.row');

  const remainingWords = Array.from(document.querySelectorAll('.word'))
    .filter(w => !w.classList.contains('final'));

  rows.forEach(row => {
    row.querySelectorAll('.word').forEach(w => {
      if (!w.classList.contains('final')) {
        w.remove();
      }
    });
  });

  let index = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const allowed = i + 1;
    const existing = row.querySelectorAll('.final').length;
    const spaceLeft = allowed - existing;

    for (let j = 0; j < spaceLeft && index < remainingWords.length; j++) {
      row.appendChild(remainingWords[index]);
      index++;
    }
  }
}
