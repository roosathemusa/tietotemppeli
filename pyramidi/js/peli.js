// 🔄 Sekoitustoiminto
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
  
    // Lisää sekoitetut sanat riveihin säilyttäen pyramidimuoto (1 sana ylhäällä → 5 sanaa alhaalla)
    let index = 0;
    for (let i = 0; i < rows.length; i++) {
      const wordsInRow = i + 1;
      for (let j = 0; j < wordsInRow && index < allWords.length; j++) {
        rows[i].appendChild(allWords[index]);
        index++;
      }
    }
  }
  
  // 🚀 Kutsutaan kun sivu latautuu
  window.addEventListener('DOMContentLoaded', () => {
    shuffleWords();
  
    // Lisää klikkitapahtumat sanoille uudestaan, koska ne on siirretty DOMissa
    const words = document.querySelectorAll('.word');
    words.forEach(word => {
      word.addEventListener('click', handleClick);
    });
  });
  
  let selectedWords = [];
  const yhdistetytSanat = {
    animals: new Set(),
    fruits: new Set(),
    vehicles: new Set(),
    colors: new Set(),
    technology: new Set()
  };
  
  const oikeatMäärät = {
    animals: 5,
    fruits: 4,
    vehicles: 3,
    colors: 2,
    technology: 1
  };
  
  const checkButton = document.getElementById('check-button');
  const message = document.getElementById('message');
  
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
    const categories = selectedWords.map(w => w.getAttribute('data-category'));
    const firstCategory = categories[0];
    const allSame = categories.every(c => c === firstCategory);
  
    if (!allSame) {
      message.textContent = 'Sanat eivät ole samasta kategoriasta!';
      selectedWords.forEach(w => w.classList.add('wrong'));
      setTimeout(() => {
        selectedWords.forEach(w => {
          w.classList.remove('wrong', 'selected');
        });
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
  
    // Tarkista onko koko kategoria valmis
    if (yhdistetytSanat[firstCategory].size === oikeatMäärät[firstCategory]) {
      message.textContent = `🎉 Kategoria "${firstCategory}" ratkaistu oikein!`;
    } else {
      message.textContent = `✅ Oikea kategoria! Jatka yhdistämistä.`;
    }
  
    // Tarkista voitto
    const kaikkiValmiit = Object.keys(oikeatMäärät).every(kategoria =>
      yhdistetytSanat[kategoria].size === oikeatMäärät[kategoria]
    );
  
    if (kaikkiValmiit) {
      message.textContent = '🏆 Voitit pelin! Kaikki kategoriat yhdistetty!';
      checkButton.disabled = true;
    }
  
    selectedWords = [];
  }
  
  checkButton.addEventListener('click', checkSelectedWords);
  
