document.addEventListener('DOMContentLoaded', function() {
    let world;
    let musicPlaying = false;


    const track1 = new Audio('audio/Cultura en Cada Verso.mp3');
    const track2 = new Audio('audio/Cruisin\' the Barrio.mp3');
    let backgroundMusic = track1;

    track1.loop = true;
    track2.loop = true;
    track1.volume = 0.3;
    track2.volume = 0.3;

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
        if (world && world.character) {
            world.character.stopAllSounds();  
        }
        document.getElementById('gameContainer').style.display = 'none';
        document.getElementById('startscreen').style.display = 'flex';
    });

    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            if (world && world.character.isOnGround()) { 
                world.character.jump(); 
            }
        }
    });

    const musicSlider = document.getElementById('musicSlider');
    const musicLabel = document.getElementById('musicLabel');
    
    musicSlider.addEventListener('input', function() {
        backgroundMusic.pause();
        
        if (musicSlider.value == 1) {
            backgroundMusic = track1;
            musicLabel.textContent = 'Cultura en Cada Verso';
        } else {
            backgroundMusic = track2;
            musicLabel.textContent = 'Cruisin Down the Barrio';
        }
    
        backgroundMusic.loop = true;  // Sicherstellen, dass die Schleifenwiedergabe aktiviert ist
        
        if (musicPlaying) {
            backgroundMusic.play();
        }
    });
});
