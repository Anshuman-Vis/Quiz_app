// You need to define your questions. For the Cricket Quiz you clicked on
const cricketQuizData = [
    {
        question: "Which country won the first Cricket World Cup in 1975?",
        options: ["Australia", "West Indies", "England", "India"],
        answer: "West Indies"
    },
    {
        question: "Who is known as 'The God of Cricket'?",
        options: ["Virat Kohli", "Ricky Ponting", "Sachin Tendulkar", "Brian Lara"],
        answer: "Sachin Tendulkar"
    },
    // ... add all 25 questions
];

let currentQuestionIndex = 0;
let userAnswers = new Array(cricketQuizData.length).fill(null);
let timerInterval;
const TIME_LIMIT_MINUTES = 15; // From the card details

// 1. Displaying Questions
// A function to render the current question and its options:

function loadQuestion(index) {
    const questionData = cricketQuizData[index];
    document.getElementById('question-text').textContent = questionData.question;
    document.getElementById('question-count').textContent = `Question ${index + 1} of ${cricketQuizData.length}`;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = ''; // Clear previous options

    questionData.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option-item';
        // HTML for radio button and label
        optionElement.innerHTML = `
            <input type="radio" id="option-${option}" name="answer" value="${option}" 
                   ${userAnswers[index] === option ? 'checked' : ''}>
            <label for="option-${option}">${option}</label>
        `;
        optionsContainer.appendChild(optionElement);

        // Event listener to record answer immediately
        optionElement.querySelector('input').addEventListener('change', (e) => {
            userAnswers[index] = e.target.value;
        });
    });

    // Update navigation buttons visibility
    document.getElementById('prev-btn').disabled = (currentQuestionIndex === 0);
    const isLastQuestion = (currentQuestionIndex === cricketQuizData.length - 1);
    document.getElementById('next-btn').classList.toggle('hidden', isLastQuestion);
    document.getElementById('submit-btn').classList.toggle('hidden', !isLastQuestion);
}

// Initial load
// window.onload = () => {
//     if (document.getElementById('quiz-container')) {
//         loadQuestion(currentQuestionIndex);
//         startTimer();
//     }
// };

// 2. Navigation Handlers

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentQuestionIndex < cricketQuizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});

// 3. Timer Implementation
function startTimer() {
    let time = TIME_LIMIT_MINUTES * 60; // total seconds

    timerInterval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        document.getElementById('timer').textContent = 
            `Time Left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (time <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Submitting your quiz.");
            submitQuiz();
        }
        time--;
    }, 1000);
}

// 3. Final Submission and Results
// D. Final Score Logic
document.getElementById('submit-btn').addEventListener('click', submitQuiz);

function submitQuiz() {
    clearInterval(timerInterval); // Stop the timer

    let score = 0;
    const detailedResults = [];

    cricketQuizData.forEach((data, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = (userAnswer === data.answer);
        
        if (isCorrect) {
            score++;
        }

        detailedResults.push({
            question: data.question,
            userAnswer: userAnswer,
            correctAnswer: data.answer,
            isCorrect: isCorrect
        });
    });

    // Store the results in sessionStorage to pass to the results page
    sessionStorage.setItem('finalScore', score);
    sessionStorage.setItem('totalQuestions', cricketQuizData.length);
    sessionStorage.setItem('detailedResults', JSON.stringify(detailedResults));

    // Navigate to the results page
    window.location.href = 'results.html'; 
}

//result.js

function displayResults() {
    const finalScore = sessionStorage.getItem('finalScore');
    const totalQuestions = sessionStorage.getItem('totalQuestions');
    const detailedResults = JSON.parse(sessionStorage.getItem('detailedResults'));

    if (!finalScore || !detailedResults) return; // Exit if no data

    document.getElementById('final-score').textContent = `Your Score: ${finalScore} / ${totalQuestions}`;

    const reviewContainer = document.getElementById('answers-review');
    detailedResults.forEach((result, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'review-item';
        resultItem.classList.add(result.isCorrect ? 'correct' : 'incorrect');

        const statusIcon = result.isCorrect ? '✅' : '❌';
        
        resultItem.innerHTML = `
            <h4>${statusIcon} Question ${index + 1}: ${result.question}</h4>
            <p>Your Answer: <strong>${result.userAnswer || 'Not Answered'}</strong></p>
            ${!result.isCorrect ? `<p class="correct-text">Correct Answer: <strong>${result.correctAnswer}</strong></p>` : ''}
            <hr>
        `;
        reviewContainer.appendChild(resultItem);
    });
}

// Call this function when the results page loads
// window.onload = () => {
//     if (document.getElementById('results-container')) {
//         displayResults();
//     }
// };