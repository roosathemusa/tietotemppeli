let score = 0;
let currentQuestionIndex = 0;
let started = false;

const questions = [
    {
        type: "input",
        question: "Faraon aarrekammiosta löytyi 5 sataa kultakolikkoa. Kuinka monta yksikköä kolikkoja tämä on yhteensä?",
        correctAnswer: "500"
    },
    {
        type: "input",
        question: `Pölyn peittämä kirjoitus kiviseinällä paljastaa muinaisen arvoituksen...

                Avain porttiin on luku, joka kantaa seuraavat merkit:
                - Nelinumeroinen muoto.
                - Tuhansien merkki suurempi kuin 6.
                - Satojen merkki on pariton.
                - Kymmenien merkki jaollinen kolmella.
                - Ja siinä toistuu ainakin yksi numero...

                Vain yksi luvuista avaa muinaisen oven:
                5263, 8037, 19827, 2839, 726, 9391, 4755, 8628, 9390`,
        correctAnswer: "9390"
    },
    {
        type: "multiple-choice",
        question: `Syvällä pyramidin sisällä, temppelissä täynnä loitsuja ja hiekan peittämiä hieroglyfejä, 
                    muinainen lisko-kapteeni on jättänyt jälkeensä arvoituksen...
                    "Kolme sammakkoa — Dorris, Borris ja Morris — auttavat minua vartioimaan aarteita. Varmistin vaa'an avulla, että jokainen heistä on oikeassa painossa. Mutta muista: muinaisessa vaa'assa voi punnita vain kaksi sammakkoa kerrallaan..."
                    
                    Vaa'an mittaukset:
                    Dorris ja Borris painavat yhteensä 12 g.
                    Borris ja Morris painavat yhteensä 16 g.
                    Dorris ja Morris painavat yhteensä 14 g.`,
        options: ["a) Dorris: 5 g, Borris: 7 g, Morris: 9 g", "b) Dorris: 6 g, Borris: 8 g, Morris: 10 g", "c) Dorris: 4 g, Borris: 6 g, Morris: 8 g"],
        correctAnswer: "a) Dorris: 5 g, Borris: 7 g, Morris: 9 g"
    },
];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("checkBtn").addEventListener("click", checkAnswer);
    document.getElementById("newGameBtn").addEventListener("click", startNewGame);
    document.getElementById("startBtn").addEventListener("click", () => {
        document.getElementById("startContainer").style.display = "none";
        document.getElementById("gameContainer").style.display = "flex";
        started = true;
        loadNextQuestion();
    });
});

function checkAnswer() {
    const current = questions[currentQuestionIndex];
    const result = document.getElementById("result");
    let userAnswer = "";

    if (current.type === "input") {
        userAnswer = document.getElementById("textAnswer").value.trim();
    } else if (current.type === "multiple-choice") {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (!selectedOption) {
            result.textContent = "Valitse jokin vaihtoehto.";
            result.style.color = "orange";
            return;
        }
        userAnswer = selectedOption.value;
    }

    if (userAnswer === current.correctAnswer) {
        result.textContent = "Oikein!";
        result.style.color = "green";
        score++;
    } else {
        result.textContent = "Väärin.";
        result.style.color = "red";
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadNextQuestion();
        } else {
            showFinalScore();
        }
    }, 1800);
}

function loadNextQuestion() {
    const current = questions[currentQuestionIndex];
    // document.getElementById("questionText").textContent = current.question;
    document.getElementById("questionText").innerHTML = current.question.replace(/\n/g, "<br>");


    const inputContainer = document.getElementById("inputContainer");
    const optionsContainer = document.getElementById("optionsContainer");
    const result = document.getElementById("result");

    inputContainer.style.display = "none";
    optionsContainer.style.display = "none";
    result.textContent = "";

    if (current.type === "input") {
        inputContainer.style.display = "block";
        document.getElementById("textAnswer").value = "";
    } else if (current.type === "multiple-choice") {
        optionsContainer.style.display = "block";
        optionsContainer.innerHTML = "";
        current.options.forEach((option, index) => {
            const id = `option-${index}`;
            const label = document.createElement("label");
            label.className = "form-check-label";

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "option";
            radio.value = option;
            radio.className = "form-check-input me-2";
            radio.id = id;

            label.setAttribute("for", id);
            label.appendChild(radio);
            label.append(option);

            const div = document.createElement("div");
            div.className = "form-check";
            div.appendChild(label);

            optionsContainer.appendChild(div);
        });
    }
}

function showFinalScore() {
    const questionText = document.getElementById("questionText");
    questionText.textContent = `Peli on päättynyt. Sait ${score} / ${questions.length} oikein!`;

    document.getElementById("inputContainer").style.display = "none";
    document.getElementById("optionsContainer").style.display = "none";
    document.getElementById("checkBtn").style.display = "none";
    document.getElementById("result").textContent = "";

    document.getElementById("newGameBtn").style.display = "inline-block";
}

function startNewGame() {
    score = 0;
    currentQuestionIndex = 0;

    document.getElementById("newGameBtn").style.display = "none";
    document.getElementById("checkBtn").style.display = "inline-block";

    loadNextQuestion();
}
