// ========================
// Reaction Time Game ⚡
// ========================
function startReactionGame() {
  const gameArea = document.getElementById('gameArea');
  gameArea.innerHTML = `
    <div id="reactionGame" class="game-box">Wait for green...</div>
  `;

  const box = document.getElementById('reactionGame');
  box.style.background = 'red';
  let startTime, endTime, timeout;

  timeout = setTimeout(() => {
    box.style.background = 'green';
    startTime = Date.now();
  }, Math.random() * 4000 + 1000);

  box.onclick = () => {
    if (box.style.background === 'green') {
      endTime = Date.now();
      const reactionTime = (endTime - startTime) / 1000;
      box.innerHTML = `Your reaction time: <strong>${reactionTime.toFixed(3)}s</strong>`;
      box.style.background = '#222';
      clearTimeout(timeout);
    } else {
      box.innerHTML = 'Too soon! Wait for green!';
      box.style.background = 'orange';
      clearTimeout(timeout);
    }
  };
}

// ========================
// F1 Quiz 🏁
// ========================
function startQuiz() {
  const gameArea = document.getElementById('gameArea');
  const quizData = [
    { question: "Which team has the prancing horse logo?", answer: "Ferrari" },
    { question: "Who is the 3-time World Champion from the Netherlands?", answer: "Max Verstappen" },
    { question: "Which race is known as the 'Temple of Speed'?", answer: "Monza" },
    { question: "What color flag means 'race finished'?", answer: "Chequered" }
  ];

  let index = 0, score = 0;

  function showQuestion() {
    if (index < quizData.length) {
      const q = quizData[index];
      gameArea.innerHTML = `
        <div class="quiz-box">
          <h3>Q${index + 1}: ${q.question}</h3>
          <input type="text" id="answerInput" placeholder="Your answer...">
          <button id="submitBtn">Submit</button>
        </div>
      `;
      document.getElementById('submitBtn').onclick = () => {
        const userAns = document.getElementById('answerInput').value.trim();
        if (userAns.toLowerCase() === q.answer.toLowerCase()) score++;
        index++;
        showQuestion();
      };
    } else {
      gameArea.innerHTML = `
        <div class="quiz-box">
          <h3>Quiz Complete!</h3>
          <p>Your Score: <strong>${score}/${quizData.length}</strong></p>
        </div>
      `;
    }
  }

  showQuestion();
}

// ========================
// Guess the F1 Car 🚘
// ========================
function startGuessCar() {
  const gameArea = document.getElementById('gameArea');

  const cars = [
    { img: "images/ferrari.jpg", answer: "Ferrari" },
    { img: "images/redbull.jpg", answer: "Red Bull" },
    { img: "images/mclaren.jpg", answer: "McLaren" },
    { img: "images/mercedes.jpg", answer: "Mercedes" },
    { img: "images/vscrb.jpg", answer: "Visa Cash App RB" },
    { img: "images/williams.jpg", answer: "Williams" },
    { img: "images/sauber.jpg", answer: "Sauber" },
    { img: "images/haas.avif", answer: "Hass" },
    { img: "images/alpine.jpg", answer: "Alpine" },
  ];

  let index = 0;
  let score = 0;

  function showCar() {
    if (index < cars.length) {
      const c = cars[index];
      gameArea.innerHTML = `
        <div class="quiz-box">
          <h3>Guess the Team!</h3>
          <img src="${c.img}" alt="F1 Car" class="car-img">
          <input type="text" id="carAnswer" placeholder="Enter team name...">
          <button id="submitCar">Submit</button>
        </div>
      `;
      document.getElementById('submitCar').onclick = () => {
        const ans = document.getElementById('carAnswer').value.trim();
        if (ans.toLowerCase() === c.answer.toLowerCase()) {
          score++;
        }
        index++;
        showCar();
      };
    } else {
      gameArea.innerHTML = `
        <div class="quiz-box">
          <h3>🏁 Game Over!</h3>
          <p>Your Score: <strong>${score}/${cars.length}</strong></p>
        </div>
      `;
    }
  }

  showCar();
}

// ========================
// Connect Buttons
// ========================
document.getElementById('quizGameBtn').onclick = startQuiz;
document.getElementById('reactionGameBtn').onclick = startReactionGame;
document.getElementById('guessCarBtn').onclick = startGuessCar;
