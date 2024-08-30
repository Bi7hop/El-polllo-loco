document.addEventListener('DOMContentLoaded', function() {
    let world;
    let musicPlaying = !soundManager.muted; 

    function init() {
        const keyboard = new Keyboard();
        world = new World(document.getElementById('canvas'), keyboard);
        soundManager.play('backgroundMusic');
    }

    function toggleMusic(button) {
        soundManager.toggleMute();
        button.textContent = soundManager.muted ? 'Music On' : 'Music Off';
        musicPlaying = !soundManager.muted;
    }

    const musicToggleButtonStart = document.getElementById('musicToggleButtonStart');
    if (musicToggleButtonStart) {
        musicToggleButtonStart.addEventListener('click', function() {
            toggleMusic(musicToggleButtonStart);
        });
    } else {
        console.error('Element with ID "musicToggleButtonStart" not found.');
    }

    const musicToggleButtonGame = document.getElementById('musicToggleButtonGame');
    if (musicToggleButtonGame) {
        musicToggleButtonGame.addEventListener('click', function() {
            toggleMusic(musicToggleButtonGame);
        });
    } else {
        console.error('Element with ID "musicToggleButtonGame" not found.');
    }

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
            
            if (world.character.gameOverSound && !world.character.gameOverSound.paused) {
                world.character.gameOverSound.pause(); 
                world.character.gameOverSound.currentTime = 0; 
            }
        }
        
        soundManager.stop('backgroundMusic');  
    
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
});
