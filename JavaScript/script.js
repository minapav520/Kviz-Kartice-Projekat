const subjects = {
    science: [
        { question: "Koja planeta je najveća?", answer: "jupiter" },
        { question: "Hemijski simbol za zlato?", answer: "au" },
        { question: "Koliko kostiju ima čovek?", answer: "206" }
    ],
    languages: [
        { question: "Zdravo na nemačkom?", answer: "hallo" },
        { question: "Hvala na francuskom?", answer: "merci" }
    ],
    math: [
        { question: "5 × 6 ?", answer: "30" },
        { question: "Kvadratni koren iz 81?", answer: "9" }
    ],
    history: [
        { question: "Prvi predsednik SAD?", answer: "George Washington" },
        { question: "Početak Drugog svetskog rata?", answer: "1939" }
    ]
};

let currentCards = [];
let index = 0;
let score = 0;
let highScore = 0;
let timeLeft = 15;
let timerId;

function openSubject(name) {
    currentCards = subjects[name];
    index = 0;
    score = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("home").classList.add("d-none");
    document.getElementById("quiz").classList.remove("d-none");
    showCard();
}

function showCard() {
    clearInterval(timerId);
    startTimer();
    
    const card = currentCards[index];
    document.getElementById("question").innerText = card.question;
    document.getElementById("answer").innerText = card.answer;
    
    let progress = ((index + 1) / currentCards.length) * 100;
    document.getElementById("progressBar").style.width = progress + "%";
    document.getElementById("progressText").innerText = `${index + 1} / ${currentCards.length}`;

    document.getElementById("card-inner").classList.remove("flipped");
    document.getElementById("userAnswer").value = "";
    document.getElementById("result").innerText = "";
}

function startTimer() {
    timeLeft = 15;
    document.getElementById("timer").innerText = timeLeft;
    timerId = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        if(timeLeft <= 0) {
            clearInterval(timerId);
            checkAnswer(); 
        }
    }, 1000);
}

function checkAnswer() {
    clearInterval(timerId);
    let user = document.getElementById("userAnswer").value.toLowerCase().trim();
    let correct = currentCards[index].answer.toLowerCase();
    let resDiv = document.getElementById("result");

    if (user === correct) {
        resDiv.innerText = "✅ Tačno! +1 poen";
        resDiv.style.color = "#2d3436";
        score++;
        if(score > highScore) {
            highScore = score;
            document.getElementById("highScore").innerText = highScore;
        }
    } else {
        resDiv.innerText = "❌ Netačno. Pokušaj sledeće!";
        resDiv.style.color = "#d63031";
    }
    document.getElementById("score").innerText = score;
}

function flipCard() {
    document.getElementById("card-inner").classList.toggle("flipped");
}

function nextCard() {
    index = (index + 1) % currentCards.length;
    showCard();
}

function prevCard() {
    index = (index - 1 + currentCards.length) % currentCards.length;
    showCard();
}

function goHome() {
    clearInterval(timerId);
    document.getElementById("quiz").classList.add("d-none");
    document.getElementById("home").classList.remove("d-none");
}
