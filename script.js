 // Quiz data
        const quizData = {
            cricket: {
                title: "Cricket Quiz",
                description: "Test your knowledge about the gentleman's game. From historic matches to current players, World Cup records to IPL moments!",
                difficulty: "Medium",
                questions: 25,
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

        // Get DOM elements
        const quizCards = document.querySelectorAll('.quiz-card');
        const modal = document.getElementById('quizModal');
        const searchInput = document.getElementById('searchInput');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const quizGrid = document.getElementById('quizGrid');

        // Add click event to quiz cards
        quizCards.forEach(card => {
            card.addEventListener('click', function() {
                const quizType = this.dataset.quiz;
                showQuizModal(quizType);
            });
        });

        // Show quiz modal
        function showQuizModal(quizType) {
            const quiz = quizData[quizType];
            document.getElementById('modalTitle').textContent = quiz.title;
            document.getElementById('modalDescription').textContent = quiz.description;
            document.getElementById('modalDifficulty').textContent = quiz.difficulty;
            document.getElementById('modalQuestions').textContent = quiz.questions;
            document.getElementById('modalTime').textContent = quiz.time;
            document.getElementById('modalCategory').textContent = quiz.category;
            modal.style.display = 'block';
        }

        // Close modal
        function closeModal() {
            modal.style.display = 'none';
        }

        // Start quiz function
        function startQuiz() {
            // In a real application, this would navigate to the quiz page
            alert('Quiz would start here! In a real application, this would navigate to the quiz interface.');
            closeModal();
        }

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });

        // Search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterQuizzes();
        });

        // Filter functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                filterQuizzes();
            });
        });

        // Filter quizzes based on search and difficulty
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

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            const header = document.querySelector('header');
            
            if (currentScroll > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
            
            lastScroll = currentScroll;
        });

        // Add loading animation to cards
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        quizCards.forEach(card => {
            observer.observe(card);
        });
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
