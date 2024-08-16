document.addEventListener('DOMContentLoaded', function() {
    let world;
    const backgroundMusic = new Audio('audio/Cultura en Cada Verso.mp3'); 
    backgroundMusic.loop = true; 
    backgroundMusic.volume = 0.3; 

    let musicPlaying = false;

    function init() {
        const keyboard = new Keyboard();
        world = new World(document.getElementById('canvas'), keyboard);
    }

    function toggleMusic(button) {
        if (musicPlaying) {
            backgroundMusic.pause();
            button.textContent = 'Music On';
        } else {
            backgroundMusic.play().catch(error => {
                console.log('Musik konnte nicht automatisch abgespielt werden. Warten auf Benutzerinteraktion.', error);
            });
            button.textContent = 'Music Off';
        }
        musicPlaying = !musicPlaying;
    }

    const musicToggleButtonStart = document.getElementById('musicToggleButtonStart');
    musicToggleButtonStart.addEventListener('click', function() {
        toggleMusic(musicToggleButtonStart);
    });

    const musicToggleButtonGame = document.getElementById('musicToggleButtonGame');
    musicToggleButtonGame.addEventListener('click', function() {
        toggleMusic(musicToggleButtonGame);
    });

    document.getElementById('startButton').addEventListener('click', function() {
        document.getElementById('startscreen').style.display = 'none';
        document.getElementById('gameContainer').style.display = 'flex';
        setTimeout(init, 100); 
    });

    document.getElementById('instructionsButton').addEventListener('click', function() {
        document.getElementById('startscreen').style.display = 'none';
        document.getElementById('instructions').style.display = 'flex';
    });

    document.getElementById('backButton').addEventListener('click', function() {
        document.getElementById('instructions').style.display = 'none';
        document.getElementById('startscreen').style.display = 'flex';
    });

    document.getElementById('backToStartButton').addEventListener('click', function() {
        document.getElementById('gameContainer').style.display = 'none';
        document.getElementById('startscreen').style.display = 'flex';
        
        if (world) {
            world.reset();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            if (world && world.character.isOnGround()) { 
                world.character.jump(); 
            }
        }
    });
});
