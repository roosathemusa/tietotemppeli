const startBtn = document.getElementById("start-button");
const startView = document.getElementById("instructions");
const gameView = document.getElementById("game-view");
const finalView = document.getElementById("final");
const factBox = document.getElementById("fact-box");
const factText = document.getElementById("fact-txt");
const nextButton = document.getElementById("next-button");
const againBtn = document.getElementById("again-button");
const scoreTxt = document.getElementById("score");

//Lista eläinten tiedoista
const animals = [
    {name: "Isopanda", image: "./images/panda.png", correctEnvironment: "bambumetsä", fact: "mustan turkkinsa alla pandan iho on musta ja vaaleanpunainen valkoisen turkin kohdalla.", options: [{ image: "./images/bambumetsä.png", environment: "bambumetsä" }, { image: "./images/savanni.png", environment: "savanni" }, { image: "./images/sademetsä.png", environment: "sademetsä" }]},
    {name: "Leijona", image: "./images/leijona.jpg", correctEnvironment: "savanni", fact: "laumassa leijonanaarat ovat vastuussa metsästyksestä, kun taas urokset puolustavat reviiriä. Huolimatta tästä vastuun jakamisesta urokset syövät aina ensin.", options: [{ image: "./images/bambumetsä.png", environment: "bambumetsä" }, { image: "./images/savanni.png", environment: "savanni" }, { image: "./images/aavikko.jpg", environment: "aavikko" }]},
    {name: "Tiikeri", image: "./images/tiikeri.jpg", correctEnvironment: "sademetsä", fact: "tiikerin turkin kuviointi näkyy vielä silloinkin, kun se on ajeltu. Tämä ei johdu ihon pigmentistä, vaan ihoon juurtuneista karvoista ja karvatupista.", options: [{ image: "./images/välimeri.png",environment: "välimeri" }, { image: "./images/savanni.png", environment: "savanni" }, { image: "./images/sademetsä.png", environment: "sademetsä" }]},
    {name: "Saharansarvikyy", image: "./images/sarvikyy.jpg", correctEnvironment: "aavikko", fact: "saharansarvikyy varoittaa uhkaajaa sahamaisella äänellä, jonka se saa aikaan hankaamalla karheita kyljen harjasuomuja toisiinsa.", options: [{ image: "./images/sademetsä.png", environment: "sademetsä" }, { image: "./images/aavikko.jpg", environment: "aavikko" }, { image: "./images/tundra.png", environment: "tundra" }]},
    {name: "Lamantiini", image: "./images/lamantiini.jpg", correctEnvironment: "meri", fact: "lamantiini eli kynsimanaatti eli manaatti (Trichechus manatus) on yksi kolmesta manaattien nisäkäsheimon lajista.", options: [{ image: "./images/bambumetsä.png", environment: "sademetsä" }, { image: "./images/marine.png", environment: "meri" }, { image: "./images/välimeri.png", environment: "välimeri" }]},
    {name: "Keisaripingviini", image: "./images/pingviini.png", correctEnvironment: "antarctica", fact: "lisääntyessään keisaripingviininaaras munii yhden munan, jonka se vierittää koiraalle haudottavaksi. Sitten naaras lähtee merelle kalaisille vesille syömään ja viettää siellä talven. Koiras hautoo munaa jalkojensa päällä ihopoimun suojassa yhdeksän viikkoa.", options: [{ image: "./images/marine.png", environment: "meri" }, { image: "./images/välimeri.png", environment: "välimeri"}, { image: "./images/antarctic.jpg", environment: "antarctica" }]},
    {name: "Tulisalamanteri", image: "./images/salamanteri.jpg", correctEnvironment: "välimeri", fact: "tulisalamanterin elinympäristöä ovat vesistöjen läheiset kosteat ja varjoisat lehtimetsäalueet.", options: [{ image: "./images/välimeri.png", environment: "välimeri" }, { image: "./images/savanni.png", environment: "savanni" }, { image: "./images/sademetsä.png", environment: "sademetsä" }]},
    {name: "Muuttohaukka", image: "./images/jalohaukka.jpg", correctEnvironment: "tundra", fact: "muuttohaukka eli jalohaukka on maailman nopein eläin ja voi pystysuorassa syöksyssä kiitää jopa lähes 400 km/h.", options: [{ image: "./images/antarctic.jpg", environment: "antarctica" }, { image: "./images/savanni.png", environment: "savanni" }, { image: "./images/tundra.png", environment: "tundra" }]},
    {name: "Liito-orava", image: "./images/liito-orava.jpg", correctEnvironment: "taiga", fact: "paritteluaikaan liito-orava uroksia voi olla yhden naaraan seurassa useampia, jolloin ne kilpailevat naaraasta ajamalla toisiaan takaa.", options: [{ image: "./images/bambumetsä.png", environment: "bambumetsä" }, { image: "./images/taiga.jpg", environment: "taiga" }, { image: "./images/tundra.png", environment: "tundra" }]},
    {name: "Aroseepra", image: "./images/seepra.png", correctEnvironment: "ruohomaa", fact: "seeprat ovat aikaisessa sikiövaiheessa väriltään mustia ja valkoiset raidat kehittyvät vasta myöhemmin.", options: [{ image: "./images/ruohomaa.jpg", environment: "ruohomaa" }, { image: "./images/savanni.png", environment: "savanni" }, { image: "./images/tundra.png", environment: "tundra" }]}
]

//Muuttujat
let currentIndex = 0;
let currentAnimal = animals[currentIndex]
let score = 0;

startBtn.addEventListener("click", function (e){
    e.preventDefault(); //Estää linkin oletustoiminnon
    startView.classList.add("d-none"); //d-none piilottaa elementin
    gameView.classList.remove("d-none");
});
againBtn.addEventListener("click", function (e){
    e.preventDefault();
    restartGame();
}); 


function showAnimal() {
    currentAnimal = animals[currentIndex];
    document.getElementById("animal-name").textContent = currentAnimal.name;
    document.getElementById("animal-pic").src = currentAnimal.image;

    const options = document.querySelectorAll('.environment-option');

    currentAnimal.options.forEach((opt, index) => {
        options[index].src = opt.image;
        options[index].dataset.environment = opt.environment;
    });
}

//Vastausvaihtoehdot
document.querySelectorAll('.environment-option').forEach(option => {
    option.addEventListener('click', function () {
        const selectedEnvironment = this.dataset.environment;
        checkAnswer(selectedEnvironment);
    });
});

//Vastauksen tarkistus ja palaute
function checkAnswer(selected) {
    const resultBox = document.getElementById("result-box");
    const resultTxt = document.getElementById("result-txt");
    const correctTxt = document.getElementById("correct-answer");

    resultBox.classList.remove("d-none");
    correctTxt.textContent = '';
    
    if (selected === currentAnimal.correctEnvironment) {
        score++;
        resultTxt.textContent = "Oikein!";
        setTimeout(() => {
            resultBox.classList.add("d-none");
            showFact();
        }, 3000);
    } else {
        resultTxt.textContent = "Väärin!";
        correctTxt.textContent = `Oikea vastaus: ${currentAnimal.correctEnvironment}`;

        setTimeout(() => {
            resultBox.classList.add("d-none");
            correctTxt.textContent = '';
  
            currentIndex++;
            if (currentIndex < animals.length) {
              showAnimal(); 
            } else {
              endGame(); 
            };
        }, 3000);
    }
}

function showFact() {
    factBox.classList.remove("d-none");
    factText.textContent = currentAnimal.fact;
    nextButton.disabled = false; 
}

//Seuraavaan kysymykseen siirtyminen
document.getElementById("next-button").addEventListener("click", function (event) {
    event.preventDefault();

    factBox.classList.add("d-none");

    currentIndex++;
    if (currentIndex < animals.length) {
      showAnimal(); 
    } else {
        endGame();
    }
});

function endGame() {
    gameView.classList.add("d-none");
    finalView.classList.remove("d-none");
    finalView.style.display = "block";  // Pakotetaan näkymään
    scoreTxt.textContent = `Sait ${score} / ${animals.length} pistettä`;
    sessionStorage.setItem('ymppä', score);
}

function restartGame() {
    finalView.classList.add("d-none");
    gameView.classList.remove("d-none");
    currentIndex = 0;
    score = 0;
    showAnimal();
}