const questions = [
    {
        question: "Mistä Cleopatra oli kotoisin?",
        answers: [
            { text: "Egypti", correct: false },
            { text: "Kreikka", correct: true },
            { text: "Suomi", correct: false },
        ]
    },
    {
        question: "Mikä on faaraon pitämän päähineen nimi?",
        answers: [
            { text: "hedjet", correct: true },
            { text: "hudjet", correct: false },
            { text: "hadjet", correct: false },
        ]
    },
    {
        question: "Miksi hieroglyfi piirrettiin sivusta?",
        answers: [
            { text: "koska oli vaikea piirtää edestä ihmistä.", correct: false },
            { text: "Se oli tyylikästä", correct: false },
            { text: "He pyrkivät tuomaan esiin jokaisen henkilön kaikkein edustavimmat piirteet.", correct: true },
        ]
    },
    {
        question: "Mikä on faaraon käyttämä sauva?",
        answers: [
            { text: "lyiq", correct: false },
            { text: "heqa", correct: true },
            { text: "ahmet", correct: false },
        ]
    },
    {
        question: "Miksi kissoja palvottiin Egyptissä?",
        answers: [
            { text: "Koska ne eivät tuoneet harmia", correct: false },
            { text: "uskottiin että kissat ovat suojelijoita ja ne toivat onnea", correct: true },
            { text: "koska kissat eivät haise", correct: false },
        ]
    },
    {
        question: "Mikä jumalista on Sobek?",
        answers: [
            { text: "krokotiili", correct: true },
            { text: "kissa", correct: false },
            { text: "koira", correct: false },
        ]
    },
    {
        question: "Minkä pää Anubiksella on?",
        answers: [
            { text: "Kissan", correct: false },
            { text: "Suden", correct: true },
            { text: "Haukan", correct: false },
        ]
    },
    {
        question: "Kuka on Ra?",
        answers: [
            { text: "Sodan jumala", correct: false },
            { text: "Vesistöjen jumala", correct: false },
            { text: "Auringon jumala", correct: true },
        ]
    },
    {
        question: "Mikä on muumio?",
        answers: [
            { text: "Zombi", correct: false },
            { text: "Edesmennyt ihminen joka on kääritty siteisiin", correct: true },  // Korjattu
            { text: "Kleopatra", correct: false },
        ]
    },
    {
        question: "Kuka oli Kleopatra?",
        answers: [
            { text: "Yksi Egyptin entisistä hallitsijoista", correct: true },
            { text: "Gladiator", correct: false },
            { text: "Siivooja", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const kuva = document.getElementById("banner-kuva");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Seuraava";
    kuva.src = "../kuvat/neutral.png";
    showQuestion();

  
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

    kuva.src = "../kuvat/neutral.png";
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
        kuva.src = "../kuvat/good.png";
        const correctSound = document.getElementById("correct-sound");
        correctSound.play();
    } else {
        selectedBtn.classList.add("incorrect");
        kuva.src = "../kuvat/anger test1.png";
        const correctSound = document.getElementById("wrong-sound");
        correctSound.play();
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `Sait ${score} / ${questions.length} oikein!`;

    sessionStorage.setItem('hissa', score); 

    nextButton.innerHTML = "Aloita alusta";
    nextButton.style.display = "block";

    nextButton.onclick = () => {
        startQuiz();
        nextButton.onclick = null;
    };
}

startQuiz();
