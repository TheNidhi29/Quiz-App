const quizData = [
    {
        question: "What is the largest organ in the human body?",
        options: ["Heart", "Brain", "Liver", "Skin"],
        answer: "Skin"
    },
    {
        question: "Which continent is the most populous?",
        options: ["Asia", "Africa", "North America", "Europe"],
        answer: "Asia"
    },
    {
        question: "Which country is known as the 'Land of the Rising Sun'?",
        options: ["South Korea", "Japan", "China", "Thailand"],
        answer: "Japan"
    },
    {
        question: "What is the tallest mountain in the world?",
        options: ["Mount Everest", "K2", "Kangchenjunga", "Makalu"],
        answer: "Mount Everest"
    },
    {
        question: "Which is the largest ocean on Earth?",
        options: [
            "Pacific Ocean",
            "Indian Ocean",
            "Atlantic Ocean",
            "Arctic Ocean"
        ],
        answer: "Pacific Ocean"
    },
    {
        question: "Which of the following states is not located in the North?",
        options: ["Jharkhand", "Jammu and Kashmir", "Himachal Pradesh", "Haryana"],
        answer: "Jharkhand"
    },
    {
        question: "Which is the largest coffee-producing state of India?",
        options: ["Kerala", "Tamil Nadu", "Karnataka", "Arunachal Pradesh"],
        answer: "Karnataka"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Mercury", "Uranus"],
        answer: "Mars"
    },
    {
        question: "Which city is known as the “summer capital” of Jammu and Kashmir?",
        options: ["Jammu", "Srinagar", "Shimla", "Anantnag"],
        answer: "Srinagar"
    },
    {
        question: "Which animal is known as the King of the Jungle?",
        options: ["Lion", "Tiger", "Elephant", "Giraffe"],
        answer: "Lion"
    }
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('lable');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name = "quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestion].answer) {
            score++;
        } else {
            incorrectAnswers.push({
                question: quizData[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: quizData[currentQuestion].answer,
            });
        }
        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of     ${quizData.length}!`;
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
}

function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHTML = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHTML += `
      <p>
      <strong>Question: </strong> ${incorrectAnswers[i].question}<br> 
      <strong>Your Answer: </strong> ${incorrectAnswers[i].incorrectAnswer}<br> 
      <strong>Correct Answer: </strong> ${incorrectAnswers[i].correctAnswer} 
      </p>
      `;
    }

    resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHTML}
    `;
}

submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", showAnswer);

displayQuestion();