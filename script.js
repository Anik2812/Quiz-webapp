const quizData = {
    general: [
        {
            question: "What is the capital of France?",
            choices: ["London", "Berlin", "Paris", "Madrid"],
            correct: 2
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Mars", "Venus", "Jupiter", "Saturn"],
            correct: 0
        },
        {
            question: "Who painted the Mona Lisa?",
            choices: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
            correct: 1
        },
        {
            question: "What is the largest ocean on Earth?",
            choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correct: 3
        },
        {
            question: "Which country is home to the kangaroo?",
            choices: ["New Zealand", "South Africa", "Australia", "Brazil"],
            correct: 2
        }
    ],
    science: [
        {
            question: "What is the chemical symbol for water?",
            choices: ["Wa", "H2O", "Ho", "Hy"],
            correct: 1
        },
        {
            question: "What is the hardest natural substance on Earth?",
            choices: ["Gold", "Iron", "Diamond", "Granite"],
            correct: 2
        },
        {
            question: "Which of these is not a state of matter?",
            choices: ["Solid", "Liquid", "Gas", "Energy"],
            correct: 3
        },
        {
            question: "What is the closest planet to the Sun?",
            choices: ["Venus", "Mars", "Mercury", "Earth"],
            correct: 2
        },
        {
            question: "What is the process by which plants make their food?",
            choices: ["Photosynthesis", "Respiration", "Fermentation", "Digestion"],
            correct: 0
        }
    ],
    history: [
        {
            question: "In which year did World War II end?",
            choices: ["1943", "1944", "1945", "1946"],
            correct: 2
        },
        {
            question: "Who was the first President of the United States?",
            choices: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
            correct: 2
        },
        {
            question: "In which year did the Berlin Wall fall?",
            choices: ["1987", "1989", "1991", "1993"],
            correct: 1
        },
        {
            question: "Who was the first woman to fly solo across the Atlantic Ocean?",
            choices: ["Amelia Earhart", "Bessie Coleman", "Harriet Quimby", "Jacqueline Cochran"],
            correct: 0
        },
        {
            question: "Which ancient wonder was located in Alexandria, Egypt?",
            choices: ["Hanging Gardens", "Colossus of Rhodes", "Lighthouse of Alexandria", "Temple of Artemis"],
            correct: 2
        }
    ]
};

let currentCategory = '';
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;
let difficulty = 'easy';


const difficultySelect = document.getElementById('difficulty-select');
const progressBar = document.getElementById('progress');
const correctSound = new Audio('https://www.soundjay.com/buttons/sounds/button-09.mp3');
const incorrectSound = new Audio('https://www.soundjay.com/buttons/sounds/button-10.mp3');
const categoryButtons = document.querySelectorAll('.category-btn');
const quizArea = document.getElementById('quiz-area');
const categorySelection = document.getElementById('category-selection');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const timerElement = document.getElementById('time');
const nextButton = document.getElementById('next-btn');
const resultArea = document.getElementById('result-area');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

difficultySelect.addEventListener('change', (e) => {
    difficulty = e.target.value;
});

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentCategory = button.dataset.category;
        startQuiz();
    });
});

nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);

function updateProgressBar() {
    const progress = (currentQuestionIndex / quizData[currentCategory].length) * 100;
    progressBar.style.width = `${progress}%`;
}

function startQuiz() {
    categorySelection.classList.add('hidden');
    quizArea.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    updateProgressBar();
    loadQuestion();
}

function loadQuestion() {
    const question = quizData[currentCategory][currentQuestionIndex];
    questionElement.textContent = question.question;
    choicesElement.innerHTML = '';
    
    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.addEventListener('click', () => selectAnswer(index));
        choicesElement.appendChild(button);
    });
    
    nextButton.classList.add('hidden');
    startTimer();
    updateProgressBar();
}

function selectAnswer(choiceIndex) {
    clearInterval(timerInterval);
    const buttons = choicesElement.getElementsByTagName('button');
    for (let button of buttons) {
        button.disabled = true;
    }
    
    if (choiceIndex === quizData[currentCategory][currentQuestionIndex].correct) {
        buttons[choiceIndex].style.backgroundColor = 'green';
        score++;
        correctSound.play();
    } else {
        buttons[choiceIndex].style.backgroundColor = 'red';
        buttons[quizData[currentCategory][currentQuestionIndex].correct].style.backgroundColor = 'green';
        incorrectSound.play();
    }
    
    nextButton.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData[currentCategory].length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function startTimer() {
    timeLeft = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 20 : 10;
    timerElement.textContent = timeLeft;
    timerElement.classList.remove('pulse');
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 5) {
            timerElement.classList.add('pulse');
        }
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            selectAnswer(-1); // -1 indicates no answer was selected
        }
    }, 1000);
}

function showResult() {
    quizArea.classList.add('hidden');
    resultArea.classList.remove('hidden');
    scoreElement.textContent = `${score} out of ${quizData[currentCategory].length}`;
}

function restartQuiz() {
    resultArea.classList.add('hidden');
    categorySelection.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
}