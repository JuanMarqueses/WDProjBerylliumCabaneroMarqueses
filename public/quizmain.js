let currentQuestion = 0;
let scores = { 1: 0, 2: 0, 3: 0, 4: 0 };

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

function generateQuestion(index) {
  const q = questions[index];
  questionEl.textContent = ${index + 1}. ${q.question};

  options.forEach((opt, i) => {
    opt.textContent = q[answer${i + 1}];
    opt.dataset.total = q[answer${i + 1}Total];
  });
}

function loadNextQuestion() {
  const selected = document.querySelector('input[type="radio"]:checked');
  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  const value = selected.nextElementSibling.dataset.total;
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

function loadPreviousQuestion() {
  if (currentQuestion === 0) return;
  currentQuestion--;
  generateQuestion(currentQuestion);
  
}
function showResult() {
  container.style.display = "none";

  const highest = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  const roles = {
    1: "Point Guard – Playmaker & Leader",
    2: "Shooting Guard – Scorer & Shooter",
    3: "Forward – Versatile Two-Way Player",
    4: "Center – Strong Interior Presence"
  };

  result.innerHTML = `
    <h1 class="final-score">${roles[highest]}</h1>
    
  `
}



generateQuestion(currentQuestion);

nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click', loadPreviousQuestion);