const questions = [
    {
        question: "Biology: What is the powerhouse of the cell?",
        answers: [
            { text: "Nucleus", correct: false },
            { text: "Ribosome", correct: false },
            { text: "Mitochondria", correct: true },
            { text: "Cell Wall", correct: false }
        ]
    },
    {
        question: "Chemistry: What is the chemical symbol for gold?",
        answers: [
            { text: "Au", correct: true },
            { text: "Ag", correct: false },
            { text: "Fe", correct: false },
            { text: "Pb", correct: false }
        ]
    },
    {
        question: "Physics: What is the unit of force?",
        answers: [
            { text: "Watt", correct: false },
            { text: "Joule", correct: false },
            { text: "Newton", correct: true },
            { text: "Volt", correct: false }
        ]
    },
    {
        question: "Geography: What is the capital of Somaliland?",
        answers: [
            { text: "Burao", correct: false },
            { text: "Hargeisa", correct: true },
            { text: "Berbera", correct: false },
            { text: "Boorama", correct: false }
        ]
    },
    {
        question: "Geography: Which mountain range is located in Somaliland?",
        answers: [
            { text: "Alps", correct: false },
            { text: "Himalayas", correct: false },
            { text: "Golis Mountains", correct: true },
            { text: "Atlas Mountains", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreText = document.getElementById("score-text");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = `Next <i class="fas fa-arrow-right"></i>`;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = `<i class="fas fa-question-circle"></i> ${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
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
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    quizBox.style.display = "none";
    resultBox.style.display = "block";
    scoreText.innerHTML = `<i class="fas fa-star-half-alt"></i> You scored ${score} out of ${questions.length}!`;
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
