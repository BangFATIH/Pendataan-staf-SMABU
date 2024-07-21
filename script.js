const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('time');
const resultMessage = document.getElementById('resultMessage');
const resultDiv = document.getElementById('result');
const restartButton = document.getElementById('restartButton');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');
const endGameSound = document.getElementById('endGameSound'); // Ambil elemen audio untuk akhir permainan
let score = 0;
let activeHole;
let timer;
let timeLeft = 30; // Durasi waktu permainan diubah menjadi 30 detik

function randomHole() {
    holes.forEach(hole => hole.classList.remove('active'));
    const randomIndex = Math.floor(Math.random() * holes.length);
    activeHole = holes[randomIndex];
    activeHole.classList.add('active');
}

function startGame() {
    score = 0;
    timeLeft = 30; // Atur ulang waktu menjadi 30 detik
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    resultDiv.style.display = 'none';
    document.getElementById('game').style.pointerEvents = 'auto'; // Enable game interaction

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);

    setInterval(randomHole, 1000);
}

function endGame() {
    document.getElementById('game').style.pointerEvents = 'none'; // Disable game interaction
    resultMessage.textContent = `Selamat! Kamu memperoleh skor: ${score}`;
    resultDiv.style.display = 'block';
    endGameSound.play(); // Putar suara akhir permainan
}

holes.forEach(hole => {
    hole.addEventListener('click', () => {
        if (hole === activeHole) {
            score++;
            scoreDisplay.textContent = score;
            correctSound.play(); // Putar suara benar
            randomHole();
        } else {
            wrongSound.play(); // Putar suara salah
        }
    });
});

restartButton.addEventListener('click', startGame);

// Mulai permainan saat halaman dimuat
startGame();
