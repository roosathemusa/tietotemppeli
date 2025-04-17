const startBtn = document.getElementById("start-button");
const startView = document.getElementById("instructions");
const gameView = document.getElementById("game-view")

startBtn.addEventListener("click", function (e){
    e.preventDefault(); //Estää linkin oletustoiminnon
    startView.classList.add("d-none"); //d-none piilottaa elementin
    gameView.classList.remove("d-none");
});
