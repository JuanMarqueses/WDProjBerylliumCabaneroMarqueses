// Tracks which question the user is currently on
let currentQuestion = 0;

// Stores score totals for each possible result (1–4 = positions)
let scores = { 1: 0, 2: 0, 3: 0, 4: 0 };

// DOM elements
const questionEl = document.querySelector('.question');

const options = [
  document.querySelector('.option1'),
  document.querySelector('.option2'),
  document.querySelector('.option3'),
  document.querySelector('.option4')
];

const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const container = document.querySelector('.quiz-container');
const result = document.querySelector('.result');


// Load questions
function generateQuestion(index) {
  const q = questions[index];

  questionEl.textContent = `${index + 1}. ${q.question}`;

  options.forEach((opt, i) => {
    opt.textContent = q[`answer${i + 1}`];
    opt.dataset.total = q[`answer${i + 1}Total`];
  });
}


// Go to the next question
function loadNextQuestion() {

  const selected = document.querySelector('input[type="radio"]:checked');

  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  const value = Number(selected.nextElementSibling.dataset.total);

  if (!value) {
    alert("Error reading answer value");
    return;
  }

  scores[value]++;

  selected.checked = false;
  currentQuestion++;

  if (currentQuestion === questions.length) {
    showResult();
    return;
  }

  if (currentQuestion === questions.length - 1) {
    nextButton.textContent = "Finish";
  }

  generateQuestion(currentQuestion);
}


// Go back to previous question
function loadPreviousQuestion() {
  if (currentQuestion === 0) return;
  currentQuestion--;
  generateQuestion(currentQuestion);
}


// Results
function showResult() {

  container.style.display = "none";

  const highest = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  // Roles
  const roles = {
    1: {
      title: "Point Guard – Playmaker & Leader",
      desc: "You control the tempo, lead the offense, and create opportunities for teammates."
    },
    2: {
      title: "Shooting Guard – Scorer & Shooter",
      desc: "You are a natural scorer who thrives on making big shots and attacking defenses."
    },
    3: {
      title: "Forward – Versatile Two-Way Player",
      desc: "You do everything — scoring, defending, rebounding, and supporting the team."
    },
    4: {
      title: "Center – Strong Interior Presence",
      desc: "You dominate inside with strength, defense, and control near the basket."
    }
  };

  const role = roles[highest];

  result.innerHTML = `
    <div class="result-overlay">
      <div class="result-card">
        <h1>${role.title}</h1>
        <p>${role.desc}</p>
        <button class="result-btn" onclick="restartQuiz()">Retake Quiz</button>
      </div>
    </div>
  `;
}



// Restart quiz
function restartQuiz(){
  currentQuestion = 0;
  scores = {1:0,2:0,3:0,4:0};

  container.style.display = "block";
  result.innerHTML = "";
  nextButton.textContent = "Next";

  generateQuestion(currentQuestion);
}



// Start quiz
generateQuestion(currentQuestion);

nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click', loadPreviousQuestion);
