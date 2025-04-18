const startBtn = document.getElementById("start-button");
const startView = document.getElementById("instructions");
const gameView = document.getElementById("game-view")

startBtn.addEventListener("click", function (e){
    e.preventDefault(); //Estää linkin oletustoiminnon
    startView.classList.add("d-none"); //d-none piilottaa elementin
    gameView.classList.remove("d-none");
});

const animals = [
    {
        name: "Isopanda",
        image: "./images/panda.png",
        correctEnvironment: "bambuforest",
        fact: "Mustan turkkinsa alla pandan iho on musta ja vaaleanpunainen valkoisen turkin kohdalla. (Lähde: Animalia.bio)"
    },
    {
        name: "Leijona",
        image: "./images/leijona.jpg",
        correctEnvironment: "savanna",
        fact: "Laumassa naarat ovat vastuussa metsästyksestä, kun taas urokset puolustavat reviiriä. Huolimatta tästä vastuun jakamisesta urokset syövät aina ensin. (Lähde: Animalia.bio)"
    },
    {
        name: "Tiikeri",
        image: "./images/tiikeri.jpg",
        correctEnvironment: "sademetsä",
        fact: "Tiesitkö, että tiikerin turkin kuviointi näkyy vielä silloinkin, kun se on ajeltu. Tämä ei johdu ihon pigmentistä, vaan ihoon juurtuneista karvoista ja karvatupista. (Lähde: Animalia.bio)"
    },
    {
        name: "Saharansarvikyy",
        image: "./images/sarvikyy.jpg",
        correctEnvironment: "desert",
        fact: "Saharansarvikyy varoittaa uhkaajaa sahamaisella äänellä, jonka se saa aikaan hankaamalla karheita kyljen harjasuomuja toisiinsa. (Lähde: Animalia.bio)"
    },
    {
        name: "Lamantiini",
        image: "./images/lamantiini.jpg",
        correctEnvironment: "marine",
        fact: "Lamantiini eli kynsimanaatti eli manaatti (Trichechus manatus) on yksi kolmesta manaattien nisäkäsheimon lajista. (Lähde: Animalia.bio)"
    },
    {
        name: "Keisaripingviini",
        image: "./images/pingviini.jpg",
        correctEnvironment: "antarctic",
        fact: "Lisääntyessään naaras munii yhden munan, jonka se vierittää koiraalle haudottavaksi. Sitten naaras lähtee merelle kalaisille vesille syömään ja viettää siellä talven. Koiras hautoo munaa jalkojensa päällä ihopoimun suojassa yhdeksän viikkoa. (Lähde: Animalia.bio)"
    },
    {
        name: "Tulisalamanteri",
        image: "./images/salamanteri.jpg",
        correctEnvironment: "mediterrane",
        fact: "Sen elinympäristöä ovat vesistöjen läheiset kosteat ja varjoisat lehtimetsäalueet. (Lähde: Animalia.bio)"
    },
    {
        name: "Muuttohaukka",
        image: "./images/jalohaukka.jpg",
        correctEnvironment: "tundra",
        fact: "Muuttohaukka eli jalohaukka on maailman nopein eläin ja voi pystysuorassa syöksyssä kiitää jopa lähes 400 km/h. (Lähde: Animalia.bio)"
    },
    {
        name: "Liito-orava",
        image: "./images/liito-orava",
        correctEnvironment: "taiga",
        fact: "Paritteluaikaan uroksia voi olla yhden naaraan seurassa useampia, jolloin ne kilpailevat naaraasta ajamalla toisiaan takaa. (Lähde: Animalia.bio)"
    },
    {
        name: "Aroseepra",
        image: "./images/seepra.jpg",
        correctEnvironment: "grassland",
        fact: "Seeprat ovat aikaisessa sikiövaiheessa väriltään mustia ja valkoiset raidat kehittyvät vasta myöhemmin. (Lähde: Wikipedia)"
    }
]
