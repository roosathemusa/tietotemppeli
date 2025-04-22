document.addEventListener("DOMContentLoaded", () => {
    const checkBtn = document.getElementById("checkBtn");
    checkBtn.addEventListener("click", checkAnswer);

    checkBtn.addEventListener('focus', function(event) {
        event.target.blur(); 
    });
});

function checkAnswer() {
    const answer = document.getElementById("answer").value;
    const result = document.getElementById("result");

    if (parseInt(answer) === 500) {
        result.textContent = "Oikein!";
        result.style.color = "green";
    } else {
        result.textContent = "Väärin.";
        result.style.color = "red";
    }
}