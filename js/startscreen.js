/**
 * Initializes the game once the DOM is fully loaded.
 * Handles the initialization of the game world, music control, and screen transitions.
 */
document.addEventListener('DOMContentLoaded', function() {
    let world;
    let musicPlaying = !soundManager.muted;

    /**
     * Initializes the game world and starts playing background music.
     */
    function init() {
        const keyboard = new Keyboard();
        world = new World(document.getElementById('canvas'), keyboard);
        soundManager.play('backgroundMusic');
    }

    /**
     * Toggles the background music on or off.
     * Updates the button text to reflect the current state of the music.
     * @param {HTMLElement} button - The button that was clicked to toggle the music.
     */
    function toggleMusic(button) {
        soundManager.toggleMute();
        button.textContent = soundManager.muted ? 'Music On' : 'Music Off';
        musicPlaying = !soundManager.muted;
    }

    const musicToggleButtonStart = document.getElementById('musicToggleButtonStart');
    const musicToggleButtonGame = document.getElementById('musicToggleButtonGame');

    if (musicToggleButtonStart) {
        musicToggleButtonStart.addEventListener('click', function() {
            toggleMusic(musicToggleButtonStart);
        });
    } else {
        console.error('Element with ID "musicToggleButtonStart" not found.');
    }

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

        if (musicToggleButtonStart) musicToggleButtonStart.classList.add('hidden');
        if (musicToggleButtonGame) musicToggleButtonGame.classList.remove('hidden');

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

            if (world.character.gameOverSound && typeof world.character.gameOverSound.pause === 'function') {
                if (!world.character.gameOverSound.paused) {
                    world.character.gameOverSound.pause();
                    world.character.gameOverSound.currentTime = 0;
                }
            }
        }

        soundManager.stop('backgroundMusic');

        document.getElementById('gameContainer').style.display = 'none';
        document.getElementById('startscreen').style.display = 'flex';

        if (musicToggleButtonStart) musicToggleButtonStart.classList.remove('hidden');
        if (musicToggleButtonGame) musicToggleButtonGame.classList.add('hidden');
    });

    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            if (world && world.character.isOnGround()) {
                world.character.jump();
            }
        }
    });

    if (musicToggleButtonStart) musicToggleButtonStart.classList.add('hidden');
    if (musicToggleButtonGame) musicToggleButtonGame.classList.add('hidden');
});
