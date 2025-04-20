function shuffleWords() {
    const pyramid = document.getElementById('pyramid');
    const allWords = Array.from(document.querySelectorAll('.word'));
  
    for (let i = allWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allWords[i], allWords[j]] = [allWords[j], allWords[i]];
    }
  
    const rows = pyramid.querySelectorAll('.row');
    rows.forEach(row => row.innerHTML = '');
  
    let index = 0;
    rows.forEach((row, i) => {
      for (let j = 0; j <= i && index < allWords.length; j++) {
        row.appendChild(allWords[index++]);
      }
    });
  }
  
  // 📥 Injektoi CSS–säännöt flex layoutille
  function injectStyles() {
    const css = `
      .row {
        display: flex;
        justify-content: center;
        gap: 8px;
      }
      .word {
        flex: 1 1 0%;
        text-align: center;
        padding: 8px 10px;
        background-color: lightgray;
        border-radius: 6px;
        cursor: pointer;
        user-select: none;
      }
      .word.selected { outline: 2px dashed #333; }
      .word.wrong { background-color: #f88; }
      .word.correct { background-color: #8f8; }
      .word.final { opacity: 0.7; pointer-events: none; }
      .word.merged {
        background-color: gold;
        font-weight: bold;
      }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    injectStyles();
    shuffleWords();
    document.querySelectorAll('.word').forEach(w =>
      w.addEventListener('click', handleClick)
    );
  });
  
  let selectedWords = [];
  const yhdistetytSanat = { animals: new Set(), fruits: new Set(), vehicles: new Set(), colors: new Set(), technology: new Set() };
  const oikeatMäärät    = { animals: 5, fruits: 4, vehicles: 3, colors: 2, technology: 1 };
  const kategoriaRivit  = { technology: 'row-5', colors: 'row-4', vehicles: 'row-3', fruits: 'row-2', animals: 'row-1' };
  
  const checkButton = document.getElementById('check-button');
  const message     = document.getElementById('message');
  
  function handleClick(e) {
    const w = e.target;
    w.classList.toggle('selected');
    if (w.classList.contains('selected')) selectedWords.push(w);
    else selectedWords = selectedWords.filter(x => x !== w);
  }
  
  // 🔗 Luo yhdistetty div, joka tietää "vieköön" N paikkaa
  function mergeSelectedWords(words) {
    const mergedText = words.map(w => w.innerText).join('');
    const div = document.createElement('div');
    div.classList.add('word', 'merged', 'final');
    div.innerText = mergedText;
    // dataset.count kertoo, kuinka monta paikkaa tämä varaa
    div.dataset.count = words.length;
    // flex: [paikkojen määrä] 1 0%
    div.style.flex = `${words.length} 1 0%`;
    return div;
  }
  
  function checkSelectedWords() {
    if (!selectedWords.length) return;
  
    const cats = selectedWords.map(w => w.dataset.category);
    if (!cats.every(c => c === cats[0])) {
      message.textContent = 'Sanat eivät ole samasta kategoriasta!';
      selectedWords.forEach(w => w.classList.add('wrong'));
      setTimeout(() => selectedWords.forEach(w => w.classList.remove('wrong','selected')), 1000);
      selectedWords = [];
      return;
    }
  
    const cat = cats[0];
    selectedWords.forEach(w => {
      yhdistetytSanat[cat].add(w.innerText);
      w.classList.add('combined','correct');
      w.removeEventListener('click', handleClick);
    });
  
    if (yhdistetytSanat[cat].size === oikeatMäärät[cat]) {
      message.textContent = `🎉 Kategoria "${cat}" valmis!`;
      const row = document.getElementById(kategoriaRivit[cat]);
      const merged = mergeSelectedWords(selectedWords);
      // Lisää merged ja poista yksittäiset
      row.appendChild(merged);
      selectedWords.forEach(w => w.remove());
      updateRemainingWordsLayout();
    } else {
      message.textContent = '✅ Oikea kategoria, jatka!';
    }
  
    // Voiton tarkistus
    if (Object.keys(oikeatMäärät).every(k => yhdistetytSanat[k].size === oikeatMäärät[k])) {
      message.textContent = '🏆 Voitit pelin!';
      checkButton.disabled = true;
    }
  
    selectedWords = [];
  }
  
  checkButton.addEventListener('click', checkSelectedWords);
  
  // 📐 Palauta jäljelle jäävät sanat pyramidimuotoon ottaen huomioon merged count
  function updateRemainingWordsLayout() {
    const rows = document.querySelectorAll('#pyramid .row');
    // Kaikki non final
    const remaining = Array.from(document.querySelectorAll('.word'))
      .filter(w => !w.classList.contains('final'));
  
    // Tyhjennä kaikki non final nykyisistä riveistä
    rows.forEach(row => row.querySelectorAll('.word').forEach(w => {
      if (!w.classList.contains('final')) w.remove();
    }));
  
    // Lisää takaisin siten, että merged elementit vievät dataset.count paikan
    let idx = 0;
    rows.forEach((row, i) => {
      const allowed = i + 1;
      // laske olemassa olevien "final" paikkamäärä
      const occupied = Array.from(row.querySelectorAll('.final'))
        .reduce((sum, w) => sum + (parseInt(w.dataset.count) || 1), 0);
      const spaceLeft = allowed - occupied;
  
      for (let j = 0; j < spaceLeft && idx < remaining.length; j++) {
        row.appendChild(remaining[idx++]);
      }
    });
  }  