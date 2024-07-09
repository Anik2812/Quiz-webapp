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
        },
        {
            question: "What is the largest planet in our solar system?",
            choices: ["Earth", "Mars", "Jupiter", "Saturn"],
            correct: 2
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            choices: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            correct: 1
        },
        {
            question: "What is the capital of Japan?",
            choices: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
            correct: 2
        },
        {
            question: "Which element has the chemical symbol 'O'?",
            choices: ["Gold", "Silver", "Oxygen", "Iron"],
            correct: 2
        },
        {
            question: "What is the largest mammal in the world?",
            choices: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
            correct: 1
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
        },
        {
            question: "What is the unit of electrical resistance?",
            choices: ["Volt", "Ampere", "Watt", "Ohm"],
            correct: 3
        },
        {
            question: "Which of these is not a type of rock?",
            choices: ["Igneous", "Sedimentary", "Metamorphic", "Plasmatic"],
            correct: 3
        },
        {
            question: "What is the largest organ in the human body?",
            choices: ["Brain", "Liver", "Skin", "Heart"],
            correct: 2
        },
        {
            question: "What is the speed of light?",
            choices: ["299,792 km/s", "199,792 km/s", "399,792 km/s", "499,792 km/s"],
            correct: 0
        },
        {
            question: "Which planet has the most moons?",
            choices: ["Jupiter", "Saturn", "Uranus", "Neptune"],
            correct: 1
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
        },
        {
            question: "Who was the leader of the Soviet Union during World War II?",
            choices: ["Vladimir Lenin", "Joseph Stalin", "Leon Trotsky", "Nikita Khrushchev"],
            correct: 1
        },
        {
            question: "In which year did Christopher Columbus first reach the Americas?",
            choices: ["1492", "1498", "1500", "1508"],
            correct: 0
        },
        {
            question: "Which civilization built the Machu Picchu complex in Peru?",
            choices: ["Aztec", "Maya", "Inca", "Olmec"],
            correct: 2
        },
        {
            question: "Who was the first Emperor of Rome?",
            choices: ["Julius Caesar", "Augustus", "Nero", "Caligula"],
            correct: 1
        },
        {
            question: "In which year did the French Revolution begin?",
            choices: ["1769", "1779", "1789", "1799"],
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
const difficultySelect = document.getElementById('difficulty-select');
const progressBar = document.getElementById('progress');
const celebration = document.getElementById('celebration');

const correctSound = new Audio('https://www.soundjay.com/buttons/sounds/button-09.mp3');
const incorrectSound = new Audio('https://www.soundjay.com/buttons/sounds/button-10.mp3');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentCategory = button.dataset.category;
        startQuiz();
    });
});

nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);
difficultySelect.addEventListener('change', (e) => {
    difficulty = e.target.value;
});

function startQuiz() {
    categorySelection.classList.add('hidden');
    quizArea.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    updateProgressBar();
    loadQuestion();
    quizArea.style.opacity = 0;
    setTimeout(() => {
        quizArea.style.opacity = 1;
        quizArea.style.transition = 'opacity 0.5s ease-in-out';
    }, 50);
}

function loadQuestion() {
    const question = quizData[currentCategory][currentQuestionIndex];
    questionElement.textContent = question.question;
    choicesElement.innerHTML = '';
    
    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.addEventListener('click', () => selectAnswer(index));
        button.style.opacity = 0;
        choicesElement.appendChild(button);
        setTimeout(() => {
            button.style.opacity = 1;
            button.style.transition = 'opacity 0.3s ease-in-out';
        }, index * 100);
    });
    
    nextButton.classList.add('hidden');
    startTimer();
    updateProgressBar();
    updateQuestionCounter();
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
    timeLeft = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 20 : 15; // Adjusted hard difficulty to 15 seconds
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 5) {
            timerElement.classList.add('pulse');
        }
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            selectAnswer(-1); // -1 indicates no answer was selected
            setTimeout(() => nextQuestion(), 1500); // Move to next question after 1.5 seconds
        }
    }, 1000); // Changed to 1000ms for a normal 1-second interval
}

function updateTimerDisplay() {
    timerElement.textContent = timeLeft;
}

function selectAnswer(choiceIndex) {
    clearInterval(timerInterval);
    const buttons = choicesElement.getElementsByTagName('button');
    for (let button of buttons) {
        button.disabled = true;
    }
    
    if (choiceIndex === quizData[currentCategory][currentQuestionIndex].correct) {
        buttons[choiceIndex].style.backgroundColor = '#00b894'; // --correct-color
        buttons[choiceIndex].classList.add('shine');
        score++;
        playSound('correct');
    } else {
        if (choiceIndex !== -1) { // Only change color if an answer was selected
            buttons[choiceIndex].style.backgroundColor = '#d63031'; // --wrong-color
            shakeElement(buttons[choiceIndex]);
        }
        buttons[quizData[currentCategory][currentQuestionIndex].correct].style.backgroundColor = '#00b894'; // --correct-color
        playSound('incorrect');
    }
    
    nextButton.classList.remove('hidden');
    nextButton.style.animation = 'pulse 1s infinite';
    
    if (choiceIndex === -1) { // If time ran out, move to next question automatically
        setTimeout(() => nextQuestion(), 1500);
    }
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / quizData[currentCategory].length) * 100;
    progressBar.style.width = `${progress}%`;
}

function updateQuestionCounter() {
    const questionCounter = document.getElementById('question-counter');
    questionCounter.textContent = `Question ${currentQuestionIndex + 1}/${quizData[currentCategory].length}`;
}

function showResult() {
    quizArea.classList.add('hidden');
    resultArea.classList.remove('hidden');
    const totalQuestions = quizData[currentCategory].length;
    const percentage = (score / totalQuestions) * 100;
    const scoreElement = document.getElementById('score');
    
    scoreElement.textContent = '0%';
    let currentScore = 0;
    const scoreInterval = setInterval(() => {
        currentScore++;
        scoreElement.textContent = `${currentScore}%`;
        if (currentScore >= percentage) {
            clearInterval(scoreInterval);
        }
    }, 20);
    
    if (percentage >= 80) {
        celebration.classList.remove('hidden');
        showConfetti();
    } else {
        celebration.classList.add('hidden');
    }
}

function restartQuiz() {
    resultArea.classList.add('hidden');
    categorySelection.classList.remove('hidden');
    celebration.classList.add('hidden');
    currentQuestionIndex = 0;
    score = 0;
}

function showConfetti() {
    for (let i = 0; i < 100; i++) {
        createConfetti();
    }
}

const confettiColors = ['#ff7675', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe'];

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
    confetti.style.opacity = Math.random();
    
    const size = Math.random() * 10 + 5; // Random size between 5px and 15px
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    
    confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    
    // Randomly choose between circle and rectangle shape
    if (Math.random() > 0.5) {
        confetti.style.borderRadius = '50%';
    } else {
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    }
    
    document.body.appendChild(confetti);
    
    confetti.addEventListener('animationend', () => {
        confetti.remove();
    });
}

function playSound(type) {
    const sound = new Audio(type === 'correct' ? 'correct.mp3' : 'incorrect.mp3');
    sound.play();
}

// Add event listeners
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentCategory = button.dataset.category;
        startQuiz();
    });
});

nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);
difficultySelect.addEventListener('change', (e) => {
    difficulty = e.target.value;
});

// Add hover effects to buttons
const allButtons = document.querySelectorAll('button');
allButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.05)';
    });
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
});

// Add a typing effect to the question
function typeQuestion(question) {
    const questionElement = document.getElementById('question');
    questionElement.innerHTML = '';
    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < question.length) {
            questionElement.innerHTML += question.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
        }
    }, 30);
}

// Modify loadQuestion function to use typeQuestion
function loadQuestion() {
    const question = quizData[currentCategory][currentQuestionIndex];
    typeQuestion(question.question);
    choicesElement.innerHTML = '';
    
    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.addEventListener('click', () => selectAnswer(index));
        button.style.opacity = 0;
        choicesElement.appendChild(button);
        setTimeout(() => {
            button.style.opacity = 1;
            button.style.transition = 'opacity 0.3s ease-in-out';
        }, index * 100);
    });
    
    nextButton.classList.add('hidden');
    startTimer();
    updateProgressBar();
    updateQuestionCounter();
}

// Add a shake animation for wrong answers
function shakeElement(element) {
    element.classList.add('shake');
    setTimeout(() => {
        element.classList.remove('shake');
    }, 500);
}

// Modify selectAnswer function to include shake animation
function selectAnswer(choiceIndex) {
    clearInterval(timerInterval);
    const buttons = choicesElement.getElementsByTagName('button');
    for (let button of buttons) {
        button.disabled = true;
    }
    
    if (choiceIndex === quizData[currentCategory][currentQuestionIndex].correct) {
        buttons[choiceIndex].style.backgroundColor = 'var(--correct-color)';
        buttons[choiceIndex].classList.add('shine');
        score++;
        playSound('correct');
    } else {
        buttons[choiceIndex].style.backgroundColor = 'var(--wrong-color)';
        shakeElement(buttons[choiceIndex]);
        buttons[quizData[currentCategory][currentQuestionIndex].correct].style.backgroundColor = 'var(--correct-color)';
        playSound('incorrect');
    }
    
    nextButton.classList.remove('hidden');
    nextButton.style.animation = 'pulse 1s infinite';
}

// Add a function to create floating bubbles in the background
function createBubbles() {
    const bubbleContainer = document.createElement('div');
    bubbleContainer.className = 'bubble-container';
    document.body.appendChild(bubbleContainer);

    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.animationDuration = `${Math.random() * 3 + 2}s`;
        bubble.style.animationDelay = `${Math.random() * 2}s`;
        bubbleContainer.appendChild(bubble);
    }
}

// Call createBubbles on page load
window.addEventListener('load', createBubbles);

// Add CSS for new animations and effects
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
        100% { transform: translateX(0); }
    }

    .shake {
        animation: shake 0.5s;
    }

    @keyframes float {
        0% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0); }
    }

    .bubble-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: -1;
    }

    .bubble {
        position: absolute;
        bottom: -20px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        width: 20px;
        height: 20px;
        animation: float linear infinite;
    }
`;
document.head.appendChild(style);