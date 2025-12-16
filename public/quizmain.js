// Tracks which question the user is currently on
let currentQuestion = 0;

// Stores score totals for each possible result (1–4 = positions)
let scores = { 1: 0, 2: 0, 3: 0, 4: 0 };

// DOM elements for displaying the question text
const questionEl = document.querySelector('.question');

// Array of DOM elements for each answer option label
const options = [
  document.querySelector('.option1'),
  document.querySelector('.option2'),
  document.querySelector('.option3'),
  document.querySelector('.option4')
];

// Navigation buttons
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');

// Main quiz container (hidden when showing result)
const container = document.querySelector('.quiz-container');

// Result display container
const result = document.querySelector('.result');

/**
 * Populates the UI with the current question and answers
 * @param {number} index - Index of the question to display
 */
function generateQuestion(index) {
  const q = questions[index];

  // Display question number and text
  questionEl.textContent = `${index + 1}. ${q.question}`;

  // Populate answer options and attach score values using data attributes
  options.forEach((opt, i) => {
    opt.textContent = q[`answer${i + 1}`];
    opt.dataset.total = q[`answer${i + 1}Total`];
  });
}

/**
 * Advances to the next question
 * - Validates answer selection
 * - Updates score totals
 * - Displays result when quiz is finished
 */
function loadNextQuestion() {
  // Get selected radio input
  const selected = document.querySelector('input[type="radio"]:checked');

  // Prevent moving forward without an answer
  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  // Retrieve score value from selected answer
  const value = selected.nextElementSibling.dataset.total;
  scores[value]++;

  // Reset selection for next question
  selected.checked = false;
  currentQuestion++;

  // If quiz is complete, show final result
  if (currentQuestion === questions.length) {
    showResult();
    return;
  }

  // Change button text on final question
  if (currentQuestion === questions.length - 1) {
    nextButton.textContent = "Finish";
  }

  generateQuestion(currentQuestion);
}

/**
 * Goes back to the previous question
 * (Does not currently undo scoring)
 */
function loadPreviousQuestion() {
  if (currentQuestion === 0) return;

  currentQuestion--;
  generateQuestion(currentQuestion);
}

/**
 * Calculates the highest score and displays the final role
 */
function showResult() {
  // Hide the quiz interface
  container.style.display = "none";

  // Determine which role received the highest score
  const highest = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  // Mapping of score keys to basketball positions
  const roles = {
    1: "Point Guard – Playmaker & Leader",
    2: "Shooting Guard – Scorer & Shooter",
    3: "Forward – Versatile Two-Way Player",
    4: "Center – Strong Interior Presence"
  };

  // Display final result
  result.innerHTML = `
    <h1 class="final-score">${roles[highest]}</h1>
  `;
}

// Load the first question when the page starts
generateQuestion(currentQuestion);

// Button event listeners
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click', loadPreviousQuestion);
