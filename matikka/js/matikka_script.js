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
            - Dorris ja Borris painavat yhteensä 12 g.
            - Borris ja Morris painavat yhteensä 16 g.
            - Dorris ja Morris painavat yhteensä 14 g.`,
        options: ["Dorris: 5 g, Borris: 7 g, Morris: 9 g", "Dorris: 6 g, Borris: 8 g, Morris: 10 g", "Dorris: 4 g, Borris: 6 g, Morris: 8 g"],
        correctAnswer: "Dorris: 5 g, Borris: 7 g, Morris: 9 g"
    },
    {
        type: "multiple-choice",
        question: `Keidassaaren hiekkojen keskellä, missä palmut humisevat ja tuuli kuiskii, viisas lisko Taiger kokoaa koristeita pyhään Anubiksen akvaarioonsa. Muinaisten aikojen basaarista hän löysi viisi taianomaista esinettä:
                - Kultainen kissapatsas - 16 kultakolikkoa
                - Pikkuruinen sfinksi - 35 kultakolikkoa
                - Suuren krokotiilin kallo - 22 kultakolikkoa
                - Niilin pyhistä vesistä peräisin oleva kasvi - 17 kultakolikkoa
                - Hiekkamatto täynnä hieroglyfejä - 12 kultakolikkoa.
                Taiger valitsi tarkalleen neljä esinettä ja maksoi niistä täsmälleen 80 kultakolikkoa.

                Mikä esine jäi ostamatta?`,
        options: ["Kultainen kissapatsas", "Pikkuruinen sfinksi", "Suuren krokotiilin kallo", "Niilin pyhistä vesistä peräisin oleva kasvi", "Hiekkamatto täynnä hieroglyfejä"],
        correctAnswer: "Suuren krokotiilin kallo"
    },
    {
        type: "input",
        question: `Muinaisen Lukujen Hallin pylväiden keskellä, Ra:n pyramidin uumenissa, seinään on raaputettu salaperäinen lukujono:

                4, 5, 9, 14, ...

                Se, joka onnistuu ratkaisemaan tämän lukujen polun, voi jatkaa matkaansa eteenpäin.

                Mikä luku tulee seuraavaksi?`,
        correctAnswer: "23"
    },
    {
        type: "input",
        question: `Faarao sai 1000 kultakolikkoa kauppiailta. Hän päätti, että 25 % summasta käytetään jumala Ran temppelien kunnostamiseen ja 15 % Niilin kalastusalusten parantamiseen. Loput kultakolikot käytetään tiedon kirjaston rakentamiseen.
                    
                Kuinka monta kolikkoa jää kirjastoa varten?`,
        correctAnswer: "600"
    },
    {
        type: "multiple-choice",
        question: `Polttavan auringon alla, keskellä autiomaata, faarao Khufu lähetti kamelikaravaanin viemään lahjoja kolmeen eri temppeliin. Jokainen neljästä karavaanista kantaa 36 lahjakoria. Jokaisessa temppelissä lahjat jaetaan tasan kuuden papin kesken.
        
                Kuinka monta koria kukin pappi saa?`,
        options: ["6 koria", "8 koria", "12 koria", "18 koria"],
        correctAnswer: "8 koria"
    },
    {
        type: "input",
        question: `Auringon temppelissä ylipappi Nefer laski auringon kultalevyjä, jotka koristivat pylväitä. Ensin hän ripusti 48 kultaista levyä. Seuraavana päivänä hän lisäsi vielä 27. Kolmantena päivänä 15 levyä katosi hiekkamyrskyssä...
        
                Kuinka monta levyä jäi pylväisiin?`,
        correctAnswer: "70"
    },
    {
        type: "multiple-choice",
        question: `Syvällä Anubiksen labyrintissä, aarteiden kammion edessä seisoo kolme vartijaa. He vartioivat kolme ovea: vain yksi ovi johtaa aarteeseen, muut kaksi — ikuiseen harhaan.
                Jotta tietäisi, mihin oveen astua, täytyy ratkaista matemaattinen arvoitus, jonka vartijat antavat:
                
                Vartija A sanoo: "Luku, jonka saat, kun lisäät 20 ja 35, ja sitten jaat summan viidellä, kertoo oikean oven numeron."
                Vartija B sanoo: "Vähennä 50:stä 40 %, sitten kerro se kahdella - saat oikean oven numeron."
                Vartija C sanoo: "Jos kerrot 7 kolmella ja vähennät tuloksesta 12, pääset oikean oven taakse."

                Mikä ovi johtaa aarteeseen?`,
        options: ["Ovi 7", "Ovi 9", "Ovi 12"],
        correctAnswer: "Ovi 9"
    }

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
