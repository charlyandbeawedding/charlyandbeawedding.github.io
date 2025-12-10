// Countdown Logic
const weddingDate = new Date('July 4, 2026 18:00:00').getTime();

let timer;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        clearInterval(timer);
        if (document.getElementById("countdown")) {
            document.getElementById("countdown").innerHTML = "¡Llegó el gran día!";
        }
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (document.getElementById("days")) document.getElementById("days").innerText = String(days).padStart(2, '0');
    if (document.getElementById("hours")) document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    if (document.getElementById("minutes")) document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    if (document.getElementById("seconds")) document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}

// Update immediately then every second
updateCountdown();
timer = setInterval(updateCountdown, 1000);

// Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        navbar.style.padding = '1rem 0';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        navbar.style.padding = '1.5rem 0';
    }
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Toggle Bus Options
function toggleBusOptions(checkbox) {
    const optionsDiv = document.getElementById('bus-options');
    if (checkbox.checked) {
        optionsDiv.style.display = 'block';
    } else {
        optionsDiv.style.display = 'none';
    }
}

// Story Carousel Logic
const storySlides = document.querySelectorAll('.story-slide');
const storyPrevBtn = document.getElementById('story-prev');
const storyNextBtn = document.getElementById('story-next');
let currentStorySlide = 0;
let storyInterval;

function startStoryCarousel() {
    storyInterval = setInterval(nextStorySlide, 5000);
}

function showStorySlide(index) {
    storySlides.forEach(slide => slide.classList.remove('active'));
    currentStorySlide = (index + storySlides.length) % storySlides.length;
    storySlides[currentStorySlide].classList.add('active');
}

function nextStorySlide() {
    showStorySlide(currentStorySlide + 1);
}

function prevStorySlide() {
    showStorySlide(currentStorySlide - 1);
}

// Event Listeners for Story Controls
if (storySlides.length > 0) {
    startStoryCarousel(); // Auto-play

    if (storyNextBtn) {
        storyNextBtn.addEventListener('click', () => {
            clearInterval(storyInterval); // Stop auto-play on interaction
            nextStorySlide();
            startStoryCarousel(); // Restart timer
        });
    }

    if (storyPrevBtn) {
        storyPrevBtn.addEventListener('click', () => {
            clearInterval(storyInterval);
            prevStorySlide();
            startStoryCarousel();
        });
    }
}

// Music Player Logic
// Placeholder files. User will add real files to /musica folder.
const playlist = [
    { title: "Killing In The Name", artist: "Rage Against The Machine", file: "musica/Killing In The Name.mp3" },
    { title: "Perfect", artist: "Ed Sheeran", file: "musica/song1.mp3" }, // Keep placeholders as secondary
    { title: "All of Me", artist: "John Legend", file: "musica/song2.mp3" }
];

let currentSongIndex = 0;
let isPlaying = false;

const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const playlistBtn = document.getElementById('playlist-btn');
const playerCd = document.getElementById('player-cd');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const playlistContainer = document.getElementById('playlist-container');
const playlistList = document.getElementById('playlist-list');
const audio = document.getElementById('audio-element');

// Initialize Playlist UI
function initPlaylist() {
    playlistList.innerHTML = '';
    playlist.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerText = `${song.title} - ${song.artist}`;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playMusic();
        });
        playlistList.appendChild(li);
    });
}

function updatePlaylistUI() {
    const items = playlistList.querySelectorAll('li');
    items.forEach((item, index) => {
        if (index === currentSongIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function loadSong(index) {
    const song = playlist[index];
    songTitle.innerText = song.title;
    songArtist.innerText = song.artist;
    audio.src = song.file;
    updatePlaylistUI();
}

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.innerText = "⏸";
    playerCd.classList.add('spinning');

    // Play audio
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Autoplay started
        }).catch(error => {
            console.log("Auto-play was prevented");
            isPlaying = false;
            playBtn.innerText = "▶";
            playerCd.classList.remove('spinning');
        });
    }
}

function pauseMusic() {
    isPlaying = false;
    playBtn.innerText = "▶";
    playerCd.classList.remove('spinning');
    audio.pause();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    if (isPlaying) playMusic();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    if (isPlaying) playMusic();
}

// Update Progress Bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

// Set Progress on Click
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Toggle Playlist Visibility
function togglePlaylist(e) {
    e.stopPropagation(); // Prevent immediate closing
    playlistContainer.classList.toggle('show');
}

// Close Playlist when clicking outside
document.addEventListener('click', function (e) {
    if (!playlistContainer.contains(e.target) && e.target !== playlistBtn) {
        playlistContainer.classList.remove('show');
    }
});

// Event Listeners
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
playlistBtn.addEventListener('click', togglePlaylist);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgress);

// AJAX Form Submission
const rsvpForm = document.querySelector('.rsvp-form');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const action = form.action;
        const button = form.querySelector('button');
        const originalText = button.innerText;

        button.innerText = 'Enviando...';
        button.disabled = true;

        fetch(action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                form.style.display = 'none';
                document.getElementById('rsvp-success-message').style.display = 'block';
                // Trigger confetti or similar effect if desired in future
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert("Error: " + data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert("Oops, hubo un problema al enviar el formulario.");
                    }
                });
                button.innerText = originalText;
                button.disabled = false;
            }
        }).catch(error => {
            alert("Oops, hubo un problema al enviar el formulario.");
            button.innerText = originalText;
            button.disabled = false;
        });
    });
}

// Initialize
initPlaylist();
loadSong(currentSongIndex);

/* --- Chrome Dino Game Clone (Wedding Edition) --- */
const canvas = document.getElementById('dino-game');
if (canvas) {
    const ctx = canvas.getContext('2d');
    const instructionElement = document.getElementById('game-instruction');

    // Game Variables
    let gamePlaying = false;
    let score = 0;
    let highScore = localStorage.getItem('dinoHighScore') || 0; // Load High Score
    let animationId;
    let frames = 0;
    let gameSpeed = 5;

    // Load Image Assets
    const brideImg = new Image();
    brideImg.onload = () => {
        if (!gamePlaying) {
            // Clear canvas to remove fallback rect
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw Ground Line
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.fillRect(0, 150 - 2, canvas.width, 2);
            // Draw Dino
            dino.draw();
        }
    };
    brideImg.src = 'imagenes/game/marriage.png';

    const ringImg = new Image();
    ringImg.src = 'imagenes/game/ring.png';

    // Dino Object (Bea)
    const dino = {
        x: 50,
        y: 150 - 40, // Ground - height
        width: 40,
        height: 40,
        dy: 0,
        jumpPower: -10,
        gravity: 0.6,
        grounded: true,
        jump: function () {
            if (this.grounded) {
                this.dy = this.jumpPower;
                this.grounded = false;
            }
        },
        update: function () {
            this.dy += this.gravity;
            this.y += this.dy;

            // Ground Collision
            if (this.y + this.height >= 150) {
                this.y = 150 - this.height;
                this.dy = 0;
                this.grounded = true;
            }

            this.draw();
        },
        draw: function () {
            if (brideImg.complete) {
                ctx.drawImage(brideImg, this.x, this.y, this.width, this.height);
            } else {
                // Fallback while loading
                ctx.fillStyle = 'white';
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
    };

    // Obstacle Array (Rings)
    const obstacles = [];

    class Obstacle {
        constructor() {
            this.x = canvas.width;
            this.width = 30; // Adjusted for ring image aspect
            this.height = 30;
            this.y = 150 - this.height; // Ground - height
            this.markedForDeletion = false;
        }

        update() {
            this.x -= gameSpeed;
            if (this.x + this.width < 0) this.markedForDeletion = true;
            this.draw();
        }

        draw() {
            if (ringImg.complete) {
                ctx.drawImage(ringImg, this.x, this.y, this.width, this.height);
            } else {
                ctx.fillStyle = '#C5A059';
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
    }

    function spawnObstacle() {
        if (frames % 120 === 0) { // Slightly slower spawn for new items
            if (Math.random() > 0.5) {
                obstacles.push(new Obstacle());
            }
        }
    }

    function initGame() {
        gamePlaying = true;
        score = 0;
        frames = 0;
        gameSpeed = 5;
        obstacles.length = 0; // Clear obstacles
        instructionElement.style.display = 'none';
        animate();
    }

    function animate() {
        animationId = requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Ground Line
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillRect(0, 150 - 2, canvas.width, 2);

        // Draw Dino
        dino.update();

        // Spawn and Update Obstacles
        spawnObstacle();
        obstacles.forEach((obstacle, index) => {
            obstacle.update();

            // Collision Detection (Box)
            // Shrink hitboxes slightly for forgiveness
            const hitX = dino.x + 5;
            const hitY = dino.y + 5;
            const hitW = dino.width - 10;
            const hitH = dino.height - 10;

            if (
                hitX < obstacle.x + obstacle.width &&
                hitX + hitW > obstacle.x &&
                hitY < obstacle.y + obstacle.height &&
                hitY + hitH > obstacle.y
            ) {
                // Game Over
                cancelAnimationFrame(animationId);
                gamePlaying = false;

                // Update High Score
                if (score > highScore) {
                    highScore = score;
                    localStorage.setItem('dinoHighScore', highScore);
                }

                ctx.fillStyle = 'rgba(0,0,0,0.5)'; // Dark overlay
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.font = '20px "Courier Prime"';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                // Moved text higher to separate from the instruction overlay
                ctx.fillText('Oh no! Te casaste la cagaste!', canvas.width / 2, canvas.height / 2 - 25);
                instructionElement.textContent = "Pulsa para intentar de nuevo";
                instructionElement.style.display = 'block';
            }
        });

        // Cleanup
        for (let i = obstacles.length - 1; i >= 0; i--) {
            if (obstacles[i].markedForDeletion) {
                obstacles.splice(i, 1);
                score++;
            }
        }

        // Score Display
        ctx.fillStyle = 'white';
        ctx.font = '16px "Courier Prime"';
        ctx.textAlign = 'left';
        ctx.fillText(`Puntuación: ${score}  |  Récord: ${highScore}`, 10, 20);

        frames++;
        if (frames % 500 === 0) gameSpeed += 0.5;
    }

    // Initial Draw
    dino.draw();

    // Input Handling
    function handleInput(e) {
        if ((e.code === 'Space' || e.code === 'ArrowUp' || e.type === 'touchstart' || e.type === 'click')) {
            if (e.code === 'Space' || e.code === 'ArrowUp') e.preventDefault();

            if (!gamePlaying) {
                initGame();
            } else {
                dino.jump();
            }
        }
    }

    window.addEventListener('keydown', handleInput);
    canvas.addEventListener('touchstart', handleInput);
    canvas.addEventListener('click', handleInput);
}
