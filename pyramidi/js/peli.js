// Sekoitustoiminto
function shuffleWords() {
    const pyramid = document.getElementById('pyramid');
    const allWords = Array.from(document.querySelectorAll('.word'));
  
    // Sekoita sanat (Fisher-Yates)
    for (let i = allWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allWords[i], allWords[j]] = [allWords[j], allWords[i]];
    }
  
    // Tyhjennä rivit pyramidissa (ei poista sanoja alimmalta riviltä)
    const rows = pyramid.querySelectorAll('.row');
    rows.forEach(row => row.innerHTML = '');
  
    // Lisää sekoitetut sanat riveihin säilyttäen pyramidimuoto (1 → 5)
    let index = 0;
    for (let i = 0; i < rows.length; i++) {
      const wordsInRow = i + 1;
      for (let j = 0; j < wordsInRow && index < allWords.length; j++) {
        rows[i].appendChild(allWords[index]);
        index++;
      }
    }
  }
  
  // Kutsutaan kun sivu latautuu
  window.addEventListener('DOMContentLoaded', () => {
    shuffleWords();
  
    // Lisää klikkitapahtumat sanoille
    const words = document.querySelectorAll('.word');
    words.forEach(word => {
      word.addEventListener('click', handleClick);
    });
  });
  
  let selectedWords = [];
  const yhdistetytSanat = {
    eläimet: new Set(),
    hedelmät: new Set(),
    juhlat: new Set(),
    urheilu: new Set(),
    vuodenaika: new Set()
  };
  
  const oikeatMäärät = {
    eläimet: 5,
    hedelmät: 4,
    juhlat: 3,
    urheilu: 2,
    vuodenaika: 1
  };
  
  const kategoriaRivit = {
    vuodenaika: 'row-5',
    urheilu:'row-4',
    juhlat: 'row-3',
    hedelmät: 'row-2',
    eläimet: 'row-1'
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
    if (selectedWords.length === 0) return;
  
    const categories = selectedWords.map(w => w.getAttribute('data-category'));
    const firstCategory = categories[0];
    const allSame = categories.every(c => c === firstCategory);
  
    if (!allSame) {
      message.textContent = 'Sanat eivät kuulu samaan kategoriaan!';
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
      message.textContent = `🎉 Kategoria ${firstCategory} on ratkaistu oikein!`;
  
      // Hae oikea rivi
      const targetRowId = kategoriaRivit[firstCategory];
      const targetRow = document.getElementById(targetRowId);
  
      // Siirrä kaikki yhdistetyt sanat oikealle riville ja merkitse finaliksi
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
  
      // 🔄 Päivitä jäljelle jäävät sanat pyramidimuotoon
      updateRemainingWordsLayout();
    } else {
      message.textContent = `✅ Oikea kategoria! Jatka yhdistämistä.`;
    }
  
    // Tarkista voitto
    const kaikkiValmiit = Object.keys(oikeatMäärät).every(kategoria =>
      yhdistetytSanat[kategoria].size === oikeatMäärät[kategoria]
    );
  
    if (kaikkiValmiit) {
      message.textContent = '🏆 Ratkaisit pyramidin!';
      checkButton.disabled = true;
    }
  
    selectedWords = [];
  }
  
  checkButton.addEventListener('click', checkSelectedWords);
  
  // 📐 Järjestä jäljelle jäävät sanat pyramidin muotoon
  function updateRemainingWordsLayout() {
    const pyramid = document.getElementById('pyramid');
    const rows = pyramid.querySelectorAll('.row');
  
    // Hae kaikki sanat jotka EIVÄT ole final
    const remainingWords = Array.from(document.querySelectorAll('.word'))
      .filter(w => !w.classList.contains('final'));
  
    // Tyhjennä kaikki rivit
    rows.forEach(row => {
      row.querySelectorAll('.word').forEach(w => {
        if (!w.classList.contains('final')) {
          w.remove();
        }
      });
    });
  
    // Asettele jäljelle jäävät sanat riveille säilyttäen muoto
    let index = 0;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const allowed = i + 1;
      const existing = row.querySelectorAll('.final').length;
      const spaceLeft = allowed - existing;
  
      // Varmista, että ei yritetä lisätä liikaa sanoja riville
      for (let j = 0; j < spaceLeft && index < remainingWords.length; j++) {
        row.appendChild(remainingWords[index]);
        index++;
      }
    }
  }
  