// ====== HOMEPAGE INTERACTIONS ======
if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
  // Smooth scroll for navigation links
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href').startsWith('#')) {
      link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(link.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    }
  });

  // Fade-in animation for homepage elements
  const revealElements = document.querySelectorAll('.card, .info-img, .hero-text');
  revealElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
  });

  window.addEventListener('scroll', () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
      const boxTop = el.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
        el.style.transition = 'all 0.8s ease-out';
      }
    });
  });

  console.log("🏎️ Welcome to F1 Insights Hub — Home of Speed & Data!");
}
// ====== LOAD DRIVER DATA ======
async function loadDrivers() {
  const response = await fetch('data/drivers.json');
  const drivers = await response.json();
  const container = document.getElementById('driversContainer');
  const searchBar = document.getElementById('searchBar');

  if (!container || !searchBar) return;

  function displayDrivers(filteredDrivers) {
    container.innerHTML = '';

    // Agar sirf ek driver mila, to special class add karein
    if (filteredDrivers.length === 1) {
      container.classList.add('single-driver-view');
    } else {
      container.classList.remove('single-driver-view');
    }

    filteredDrivers.forEach(driver => {
      const card = document.createElement('div');
      card.classList.add('driver-card');
      card.innerHTML = `
        <img src="${driver.image}" alt="${driver.name}">
        <h3>${driver.name}</h3>
        <p><strong>Team:</strong> ${driver.team}</p>
        <p><strong>Wins:</strong> ${driver.wins}</p>
        <p><strong>Podiums:</strong> ${driver.podiums}</p>
        <p><strong>Nationality:</strong> ${driver.nationality}</p>
      `;
      container.appendChild(card);
    });
  }

  displayDrivers(drivers);

  // Search functionality
  searchBar.addEventListener('input', e => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = drivers.filter(driver =>
      driver.name.toLowerCase().includes(searchValue)
    );
    displayDrivers(filtered);
  });
}

// Run only on drivers.html
if (window.location.pathname.includes("drivers.html")) {
  loadDrivers();
}


// ====== LOAD CIRCUIT DATA ======
async function loadCircuits() {
  const response = await fetch('data/circuits.json');
  const circuits = await response.json();
  const container = document.getElementById('circuitsContainer');

  if (!container) return; // prevents error on other pages

  circuits.forEach(circuit => {
    const card = document.createElement('div');
    card.classList.add('circuit-card');
    card.innerHTML = `
      <img src="${circuit.image}" alt="${circuit.name}">
      <h3>${circuit.name}</h3>
      <p><strong>Country:</strong> ${circuit.country}</p>
      <p><strong>Laps:</strong> ${circuit.laps}</p>
      <p><strong>Length:</strong> ${circuit.length_km} km</p>
      <p class="fact">🏁 ${circuit.fun_fact}</p>
    `;
    container.appendChild(card);
  });
}

// Run only on circuits.html
if (window.location.pathname.includes("circuits.html")) {
  loadCircuits();
}
// === FUN ZONE INTERACTIVES ===

// --- QUIZ SECTION ---
function startQuiz() {
  const gameArea = document.getElementById('gameArea');
  gameArea.innerHTML = `
    <div class="quiz-section">
      <img id="quiz-image" src="images/car1.jpg" alt="F1 Car">
      <h3>Which team uses this car?</h3>
      <div class="options">
        <button onclick="checkAnswer('Ferrari')">Ferrari</button>
        <button onclick="checkAnswer('Mercedes')">Mercedes</button>
        <button onclick="checkAnswer('Red Bull')">Red Bull</button>
      </div>
    </div>
  `;
}

function checkAnswer(answer) {
  const quizImage = document.getElementById('quiz-image');
  if (answer === 'Ferrari') {
    alert('🏆 Correct! Forza Ferrari!');
  } else {
    alert('❌ Wrong! That’s a Ferrari car.');
  }
}

// --- REACTION GAME ---
function startGame() {
  const gameArea = document.getElementById('gameArea');
  gameArea.innerHTML = `<div class="game-box">Wait for green...</div>`;
  const box = document.querySelector('.game-box');
  box.style.backgroundColor = 'red';

  const randomTime = Math.random() * 3000 + 2000; // between 2–5 sec
  setTimeout(() => {
    box.style.backgroundColor = 'green';
    box.textContent = 'CLICK!';
    const startTime = Date.now();

    box.onclick = () => {
      const reaction = Date.now() - startTime;
      box.textContent = `Your Reaction: ${reaction} ms`;
      box.style.backgroundColor = '#FF1801';
    };
  }, randomTime);
}
