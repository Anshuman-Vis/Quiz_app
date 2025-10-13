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
        questions: 3, // Changed to 3 for demo purposes
        time: "10 minutes",
        category: "Visual"
    },
    sports: {
        title: "Sports Quiz",
        description: "Challenge yourself with questions from various sports including football, basketball, tennis, Olympics, and more!",
        difficulty: "Hard",
        questions: 3, // Changed to 3 for demo purposes
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

// Actual questions for the Picture Quiz (New Data)
const pictureQuizQuestions = [
    {
        question: "Which famous landmark is visible on the one-dollar bill?",
        options: ["Lincoln Memorial", "White House", "Statue of Liberty", "Washington Monument"],
        answer: "Washington Monument"
    },
    {
        question: "What color is the 'M' in the classic McDonald's logo?",
        options: ["Red", "Green", "Yellow", "Orange"],
        answer: "Yellow"
    },
    {
        question: "Identify this city by its famous tower: Eiffel Tower.",
        options: ["Rome", "London", "Paris", "Berlin"],
        answer: "Paris"
    },
];

// Actual questions for the Sports Quiz (New Data)
const sportsQuizQuestions = [
    {
        question: "Which sport uses terms like 'pitcher' and 'home run'?",
        options: ["Cricket", "Baseball", "Softball", "Rugby"],
        answer: "Baseball"
    },
    {
        question: "In what year did the modern Olympic Games begin?",
        options: ["1896", "1900", "1924", "1888"],
        answer: "1896"
    },
    {
        question: "How many players are on a soccer (football) team on the field?",
        options: ["9", "10", "11", "12"],
        answer: "11"
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
// Note: These selectors will only work on index.html
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
    if(modal) modal.style.display = 'block';
}

// Close modal (used the existing function name)
function closeModal() {
    if(modal) modal.style.display = 'none';
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

// --- Quiz Filtering/Search Logic ---
if (searchInput && filterButtons.length > 0) {
    searchInput.addEventListener('input', filterQuizzes);

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterQuizzes();
        });
    });
}


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

// Helper function to select the correct question data
function getQuizQuestions(quizKey) {
    switch (quizKey) {
        case 'cricket':
            return cricketQuizQuestions;
        case 'picture':
            return pictureQuizQuestions;
        case 'sports':
            return sportsQuizQuestions;
        // Add cases for other quizzes (science, history, movies) when data is ready
        default:
            return [];
    }
}


// Setup the Quiz (called when quiz.html loads)
function setupQuiz() {
    const quizKey = sessionStorage.getItem('selectedQuizKey');

    if (!quizKey || !quizData[quizKey]) {
        alert('Error: Quiz data not found. Returning home.');
        window.location.href = 'index.html';
        return;
    }

    // Load the correct data set based on the selected quiz key
    currentQuizData = getQuizQuestions(quizKey); 
    
    // Safety check for empty quiz data
    if (currentQuizData.length === 0) {
        alert(`No questions found for the ${quizData[quizKey].title}. Returning home.`);
        window.location.href = 'index.html';
        return;
    }

    // Update the question count in quizData based on the actual array length
    quizData[quizKey].questions = currentQuizData.length;

    // Reset state variables
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuizData.length).fill(null);
    
    // Set the title and start the quiz
    const quizTitleElement = document.getElementById('quizTitle');
    if (quizTitleElement) {
        quizTitleElement.textContent = quizData[quizKey].title;
    }
    loadQuestion(currentQuestionIndex);
    startTimer(quizData[quizKey].time); 
    
    // Attach event listeners for navigation and submission on quiz.html elements
    document.getElementById('next-btn').addEventListener('click', loadNextQuestion);
    document.getElementById('prev-btn').addEventListener('click', loadPreviousQuestion);
    document.getElementById('submit-btn').addEventListener('click', submitQuiz);
}

// 1. Displaying Questions
function loadQuestion(index) {
    if (index >= currentQuizData.length) return;

    const questionData = currentQuizData[index];
    document.getElementById('question-text').textContent = questionData.question;
    document.getElementById('question-count').textContent = `Question ${index + 1} of ${currentQuizData.length}`;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = ''; 

    questionData.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option-item';
        // Check if the user has already answered this question
        const isChecked = userAnswers[index] === option ? 'checked' : ''; 

        optionElement.innerHTML = `
            <input type="radio" id="option-${option}" name="answer" value="${option}" ${isChecked}>
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
        // Ensure the current answer is recorded before moving
        const currentAnswerInput = document.querySelector('input[name="answer"]:checked');
        if (currentAnswerInput) {
            userAnswers[currentQuestionIndex] = currentAnswerInput.value;
        }

        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
}
function loadPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        // Ensure the current answer is recorded before moving
        const currentAnswerInput = document.querySelector('input[name="answer"]:checked');
        if (currentAnswerInput) {
            userAnswers[currentQuestionIndex] = currentAnswerInput.value;
        }

        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
}

// 3. Timer Implementation
function startTimer(timeLimitString) {
    const timeRegex = /(\d+)\s+minutes/;
    const match = timeLimitString.match(timeRegex);
    let minutes = 15; // Default to 15 minutes
    if (match) {
        minutes = parseInt(match[1]);
    }
    
    let time = minutes * 60; 
    
    timerInterval = setInterval(() => {
        const min = Math.floor(time / 60);
        const sec = time % 60;
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.textContent = 
            `Time Left: ${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
        }

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

    // Final check to record the last question's answer
    const currentAnswerInput = document.querySelector('input[name="answer"]:checked');
    if (currentAnswerInput) {
        userAnswers[currentQuestionIndex] = currentAnswerInput.value;
    }

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
    window.location.href = 'result.html'; // Changed to 'result.html' as per your filename
}

// --- RESULTS PAGE LOGIC (for result.html) ---

function displayResults() {
    const finalScore = sessionStorage.getItem('finalScore');
    const totalQuestions = sessionStorage.getItem('totalQuestions');
    const detailedResults = JSON.parse(sessionStorage.getItem('detailedResults'));

    if (!finalScore || !detailedResults) {
        const reviewContainer = document.getElementById('answers-review');
         if (reviewContainer) {
             reviewContainer.innerHTML = '<p>No quiz results found. Please take a quiz first.</p>';
         }
        return; 
    }

    // Check if the required elements exist before trying to update them
    const scoreElement = document.getElementById('final-score');
    if (scoreElement) {
        scoreElement.textContent = `Your Score: ${finalScore} / ${totalQuestions}`;
    }

    const reviewContainer = document.getElementById('answers-review');
    if (reviewContainer) {
        reviewContainer.innerHTML = ''; // Clear 'Loading review...'

        detailedResults.forEach((result, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'review-item';
            resultItem.classList.add(result.isCorrect ? 'correct' : 'incorrect');

            const statusIcon = result.isCorrect ? '✅' : '❌';
            const userAnswerText = result.userAnswer || 'Not Answered';
            
            resultItem.innerHTML = `
                <h4>${statusIcon} Question ${index + 1}: ${result.question}</h4>
                <p>Your Answer: <strong>${userAnswerText}</strong></p>
                ${!result.isCorrect ? `<p class="correct-text">Correct Answer: <strong>${result.correctAnswer}</strong></p>` : ''}
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
