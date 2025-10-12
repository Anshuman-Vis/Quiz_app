

// Call this function when the results page loads
// window.onload = () => {
//     if (document.getElementById('results-container')) {
//         displayResults();
//     }

// };

// --- QUIZ DATA STRUCTURES ---

// Data for the home page (modal details)
const quizData = {
    cricket: {
        title: "Cricket Quiz",
        description: "Test your knowledge about the gentleman's game. From historic matches to current players, World Cup records to IPL moments!",
        difficulty: "Medium",
        questions: 3, // Set to 3 for the demo question array below
        time: "15 minutes",
        category: "Sports"
    },
    picture: {
        title: "Picture Quiz",
        description: "Identify famous landmarks, celebrities, and objects from their pictures. A visual treat for your brain!",
        difficulty: "Easy",
        questions: 20,
        time: "10 minutes",
        category: "Visual"
    },
    sports: {
        title: "Sports Quiz",
        description: "Challenge yourself with questions from various sports including football, basketball, tennis, Olympics, and more!",
        difficulty: "Hard",
        questions: 30,
        time: "20 minutes",
        category: "Sports"
    },
    science: {
        title: "Science Quiz",
        description: "Explore the wonders of science with questions covering physics, chemistry, biology, astronomy, and technology!",
        difficulty: "Hard",
        questions: 35,
        time: "25 minutes",
        category: "Education"
    },
    history: {
        title: "History Quiz",
        description: "Journey through time and test your knowledge of world history, ancient civilizations, wars, and historical figures!",
        difficulty: "Medium",
        questions: 28,
        time: "18 minutes",
        category: "Education"
    },
    movies: {
        title: "Movies Quiz",
        description: "From classic films to modern blockbusters, test your knowledge of cinema, actors, directors, and movie trivia!",
        difficulty: "Easy",
        questions: 22,
        time: "12 minutes",
        category: "Entertainment"
    }
};

// Actual questions for the Cricket Quiz (Example Data)
const cricketQuizQuestions = [
    {
        question: "Which country won the first Cricket World Cup in 1975?",
        options: ["Australia", "West Indies", "England", "India"],
        answer: "West Indies"
    },
    {
        question: "Who holds the record for the most runs in Test cricket?",
        options: ["Ricky Ponting", "Brian Lara", "Sachin Tendulkar", "Virat Kohli"],
        answer: "Sachin Tendulkar"
    },
    {
        question: "How many balls are bowled in a single 'over' in most forms of cricket?",
        options: ["4", "5", "6", "8"],
        answer: "6"
    },
];

// --- GLOBAL QUIZ STATE VARIABLES (Used for quiz.html) ---
let currentQuizData = [];   // Holds the question array for the active quiz
let currentQuestionIndex = 0;
let userAnswers = [];
let timerInterval;
let currentSelectedQuizKey = '';

// --- HOME PAGE LOGIC (Modal and Filtering) ---

// Get DOM elements
const quizCards = document.querySelectorAll('.quiz-card');
const modal = document.getElementById('quizModal');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');

// Add click event to quiz cards to open the modal
quizCards.forEach(card => {
    card.addEventListener('click', function() {
        const quizType = this.dataset.quiz;
        showQuizModal(quizType);
    });
});

// Show quiz modal (used the existing function name)
function showQuizModal(quizType) {
    const quiz = quizData[quizType];
    
    // Save the selected quiz key globally for the startQuiz function
    currentSelectedQuizKey = quizType; 

    document.getElementById('modalTitle').textContent = quiz.title;
    document.getElementById('modalDescription').textContent = quiz.description;
    document.getElementById('modalDifficulty').textContent = quiz.difficulty;
    document.getElementById('modalQuestions').textContent = quiz.questions;
    document.getElementById('modalTime').textContent = quiz.time;
    document.getElementById('modalCategory').textContent = quiz.category;
    modal.style.display = 'block';
}

// Close modal (used the existing function name)
function closeModal() {
    modal.style.display = 'none';
    currentSelectedQuizKey = ''; // Clear selection
}

// Start quiz function (called by onclick="startQuiz()" in index.html)
function startQuiz() {
    if (currentSelectedQuizKey) {
        // Use Session Storage to temporarily store the selected quiz key
        sessionStorage.setItem('selectedQuizKey', currentSelectedQuizKey);
        // Navigate the user to the quiz page
        window.location.href = 'quiz.html'; 
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// --- Quiz Filtering/Search Logic (Left as is) ---
searchInput.addEventListener('input', filterQuizzes);

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        filterQuizzes();
    });
});

function filterQuizzes() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    
    quizCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const difficulty = card.dataset.difficulty;
        
        const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
        const matchesFilter = activeFilter === 'all' || difficulty === activeFilter;
        
        if (matchesSearch && matchesFilter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
// --------------------------------------------------

// --- QUIZ PAGE LOGIC (Functions to run on quiz.html) ---

// Setup the Quiz (called when quiz.html loads)
function setupQuiz() {
    const quizKey = sessionStorage.getItem('selectedQuizKey');

    if (!quizKey || !quizData[quizKey]) {
        alert('Error: Quiz data not found. Returning home.');
        window.location.href = 'index.html';
        return;
    }

    // This is where you would load the correct data set (we only have cricket for now)
    currentQuizData = cricketQuizQuestions; // Update this logic for other quizzes
    
    // Reset state variables
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuizData.length).fill(null);
    
    // Set the title and start the quiz
    document.getElementById('quizTitle').textContent = quizData[quizKey].title;
    loadQuestion(currentQuestionIndex);
    startTimer(quizData[quizKey].time); 
    
    // Attach event listeners for navigation and submission on quiz.html elements
    document.getElementById('next-btn').addEventListener('click', loadNextQuestion);
    document.getElementById('prev-btn').addEventListener('click', loadPreviousQuestion);
    document.getElementById('submit-btn').addEventListener('click', submitQuiz);
}

// 1. Displaying Questions
function loadQuestion(index) {
    const questionData = currentQuizData[index];
    document.getElementById('question-text').textContent = questionData.question;
    document.getElementById('question-count').textContent = `Question ${index + 1} of ${currentQuizData.length}`;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = ''; 

    questionData.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option-item';
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

    // Update navigation button visibility
    document.getElementById('prev-btn').disabled = (currentQuestionIndex === 0);
    const isLastQuestion = (currentQuestionIndex === currentQuizData.length - 1);
    document.getElementById('next-btn').classList.toggle('hidden', isLastQuestion);
    document.getElementById('submit-btn').classList.toggle('hidden', !isLastQuestion);
}

// 2. Navigation Handlers
function loadNextQuestion() {
    if (currentQuestionIndex < currentQuizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
}
function loadPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
}

// 3. Timer Implementation
function startTimer(timeLimitString) {
    const minutes = parseInt(timeLimitString.split(' ')[0]);
    let time = minutes * 60; 
    
    timerInterval = setInterval(() => {
        const min = Math.floor(time / 60);
        const sec = time % 60;
        document.getElementById('timer').textContent = 
            `Time Left: ${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

        if (time <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Submitting your quiz.");
            submitQuiz();
        }
        time--;
    }, 1000);
}

// 4. Submission and Scoring Logic
function submitQuiz() {
    clearInterval(timerInterval); 

    let score = 0;
    const detailedResults = [];

    currentQuizData.forEach((data, index) => {
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

    // Store the results in sessionStorage
    sessionStorage.setItem('finalScore', score);
    sessionStorage.setItem('totalQuestions', currentQuizData.length);
    sessionStorage.setItem('detailedResults', JSON.stringify(detailedResults));
    sessionStorage.removeItem('selectedQuizKey'); 

    // Navigate to the results page
    window.location.href = 'results.html'; 
}

// --- RESULTS PAGE LOGIC (for results.html) ---

function displayResults() {
    const finalScore = sessionStorage.getItem('finalScore');
    const totalQuestions = sessionStorage.getItem('totalQuestions');
    const detailedResults = JSON.parse(sessionStorage.getItem('detailedResults'));

    if (!finalScore || !detailedResults) return; 

    // Check if the required elements exist before trying to update them
    const scoreElement = document.getElementById('final-score');
    if (scoreElement) {
        scoreElement.textContent = `Your Score: ${finalScore} / ${totalQuestions}`;
    }

    const reviewContainer = document.getElementById('answers-review');
    if (reviewContainer) {
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
}

// --- INITIALIZATION ---

// Run setup function when any page loads
document.addEventListener('DOMContentLoaded', () => {
    // 1. Check if we are on the quiz page (using a unique element selector)
    if (document.querySelector('.quiz-container')) {
        setupQuiz();
    }
    // 2. Check if we are on the results page (You must create results.html for this to work)
    if (document.querySelector('.results-card')) {
        displayResults();
    }
});

