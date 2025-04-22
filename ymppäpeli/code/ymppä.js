const startBtn = document.getElementById("start-button");
const startView = document.getElementById("instructions");
const gameView = document.getElementById("game-view")

startBtn.addEventListener("click", function (e){
    e.preventDefault(); //Estää linkin oletustoiminnon
    startView.classList.add("d-none"); //d-none piilottaa elementin
    gameView.classList.remove("d-none");
});

//Lista eläinten tiedoista
const animals = [
    {name: "Isopanda", image: "./images/panda.png", correctEnvironment: "bambuforest", fact: "mustan turkkinsa alla pandan iho on musta ja vaaleanpunainen valkoisen turkin kohdalla."},
    {name: "Leijona", image: "./images/leijona.jpg", correctEnvironment: "savanna", fact: "laumassa leijonanaarat ovat vastuussa metsästyksestä, kun taas urokset puolustavat reviiriä. Huolimatta tästä vastuun jakamisesta urokset syövät aina ensin."},
    {name: "Tiikeri", image: "./images/tiikeri.jpg", correctEnvironment: "rainforest", fact: "tiikerin turkin kuviointi näkyy vielä silloinkin, kun se on ajeltu. Tämä ei johdu ihon pigmentistä, vaan ihoon juurtuneista karvoista ja karvatupista."},
    {name: "Saharansarvikyy", image: "./images/sarvikyy.jpg", correctEnvironment: "desert", fact: "saharansarvikyy varoittaa uhkaajaa sahamaisella äänellä, jonka se saa aikaan hankaamalla karheita kyljen harjasuomuja toisiinsa."},
    {name: "Lamantiini", image: "./images/lamantiini.jpg", correctEnvironment: "marine", fact: "lamantiini eli kynsimanaatti eli manaatti (Trichechus manatus) on yksi kolmesta manaattien nisäkäsheimon lajista."},
    {name: "Keisaripingviini", image: "./images/pingviini.jpg", correctEnvironment: "antarctic", fact: "lisääntyessään keisaripingviininaaras munii yhden munan, jonka se vierittää koiraalle haudottavaksi. Sitten naaras lähtee merelle kalaisille vesille syömään ja viettää siellä talven. Koiras hautoo munaa jalkojensa päällä ihopoimun suojassa yhdeksän viikkoa."},
    {name: "Tulisalamanteri", image: "./images/salamanteri.jpg", correctEnvironment: "mediterrane", fact: "tulisalamanterin elinympäristöä ovat vesistöjen läheiset kosteat ja varjoisat lehtimetsäalueet."},
    {name: "Muuttohaukka", image: "./images/jalohaukka.jpg", correctEnvironment: "tundra", fact: "muuttohaukka eli jalohaukka on maailman nopein eläin ja voi pystysuorassa syöksyssä kiitää jopa lähes 400 km/h."},
    {name: "Liito-orava", image: "./images/liito-orava.jpg", correctEnvironment: "taiga", fact: "paritteluaikaan liito-orava uroksia voi olla yhden naaraan seurassa useampia, jolloin ne kilpailevat naaraasta ajamalla toisiaan takaa."},
    {name: "Aroseepra", image: "./images/seepra.jpg", correctEnvironment: "grassland", fact: "seeprat ovat aikaisessa sikiövaiheessa väriltään mustia ja valkoiset raidat kehittyvät vasta myöhemmin."}
]

//Muuttujat
let currentIndex = 0;
let currentAnimal = animals[currentIndex]

function showAnimal() {
    currentAnimal = animals[currentIndex];
    document.getElementById("animal-name").textContent = currentAnimal.name;
    document.getElementById("animal-pic").src = currentAnimal.image;
}

//Vastauksen tarkistus
function checkAnswer(selected) {
    const resultBox = document.getElementById("result-box");
    const resultTxt = document.getElementById("result-txt");

    resultBox.classList.remove("d-none");
    if (selected === currentAnimal.correctEnvironment) {
        //lisää pisteitä
        resultTxt.textContent = "Oikein!";
        setTimeout(() => {
            resultBox.classList.add("d-none");
            showFact();
        }, 3000);
    } else {
        resultTxt.textContent = "Väärin!";
        // näytä oikeavastaus
        setTimeout(() => {
            resultBox.classList.add("d-none");
  
            currentIndex++;
            if (currentIndex < animals.length) {
              showAnimal(); 
            } else {
              endGame(); 
            };
        }, 3000);
    }

} 

const factBox = document.getElementById("fact-box");
const factText = document.getElementById("fact-txt");
const nextButton = document.getElementById("next-button");

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

//Vastausvaihtoehdot (tämä ratkaisu saatu ChatGPT:ltä)
document.querySelectorAll('.environment-option').forEach(option => {
    option.addEventListener('click', function () {
        const selectedEnvironment = this.dataset.environment;
        checkAnswer(selectedEnvironment);
    });
});

function endGame() {
    alert("Peli päättyi! Kiitos pelaamisesta!");
}