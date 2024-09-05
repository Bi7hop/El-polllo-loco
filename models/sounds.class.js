/**
 * Class responsible for managing game sounds, including playing, pausing, stopping, and muting sounds.
 */
class SoundManager {

    /**
     * Creates a new SoundManager instance and initializes all the game sounds.
     * Sets default volume levels and looping settings for specific sounds.
     */
    constructor() {
        this.sounds = {
            walking: new Audio('audio/walking.mp3'),
            jump: new Audio('audio/jump.mp3'),
            snoring: new Audio('audio/schnarchen.mp3'),
            gameOver: new Audio('audio/gameover.mp3'),
            chickenDeath: new Audio('audio/chicken.mp3'),
            bottleThrow: new Audio('audio/bottle2.mp3'),
            coinPickup: new Audio('audio/coinpick.mp3'),
            bottlePickup: new Audio('audio/bottlepick.mp3'),
            endboss: new Audio('audio/round1.mp3'),
            victory: new Audio('audio/win.mp3'),
            backgroundMusic: new Audio('audio/Cultura en Cada Verso.mp3'),
            playerhurt: new Audio('audio/playerhurt.mp3') 
        };

        this.muted = false;

        for (let key in this.sounds) {
            this.sounds[key].volume = 0.5; 
        }

        this.sounds.endboss.loop = false;
        this.sounds.backgroundMusic.loop = true; 
        this.sounds.backgroundMusic.volume = 0.2; 
    }

    /**
     * Plays the specified sound if it is not muted and not already playing.
     * @param {string} soundName - The name of the sound to play.
     * @returns {Promise<void>} A promise that resolves when the sound starts playing.
     */
    async play(soundName) {
        if (this.sounds[soundName] && !this.muted) {
            if (this.sounds[soundName].paused) {
                this.sounds[soundName].currentTime = 0;
                await this.sounds[soundName].play();
            }
        }
    }

    /**
     * Pauses the specified sound.
     * @param {string} soundName - The name of the sound to pause.
     */
    pause(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].pause();
        }
    }

    /**
     * Stops the specified sound, resetting its playback position to the beginning.
     * @param {string} soundName - The name of the sound to stop.
     */
    stop(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].pause();
            this.sounds[soundName].currentTime = 0;
        }
    }

    /**
     * Stops all sounds currently managed by the SoundManager.
     */
    stopAll() {
        for (let key in this.sounds) {
            this.stop(key);
        }
    }

    /**
     * Toggles the mute state for all sounds.
     * When muted, all sounds will be silenced without stopping them.
     */
    toggleMute() {
        this.muted = !this.muted;
        for (let key in this.sounds) {
            this.sounds[key].muted = this.muted;
        }
    }

    /**
     * Toggles the background music on or off.
     * If music is playing, it will be paused; otherwise, it will start playing.
     */
    toggleBackgroundMusic() {
        if (this.sounds.backgroundMusic.paused) {
            this.sounds.backgroundMusic.play();
        } else {
            this.sounds.backgroundMusic.pause();
        }
    }
}

const soundManager = new SoundManager();

document.addEventListener('DOMContentLoaded', () => {
    const musicToggleButtonGame = document.getElementById('musicToggleButtonGame');
    const musicToggleButtonStart = document.getElementById('musicToggleButtonStart');

    function updateMusicButtonText(button) {
        button.textContent = soundManager.sounds.backgroundMusic.paused ? 'Music Off' : 'Music On';
    }

    function handleMusicToggle(button) {
        soundManager.toggleBackgroundMusic();
        updateMusicButtonText(button);
        button.blur();  
    }

    if (musicToggleButtonStart) {
        updateMusicButtonText(musicToggleButtonStart);

        musicToggleButtonStart.addEventListener('click', () => {
            handleMusicToggle(musicToggleButtonStart);
        });
    }

    if (musicToggleButtonGame) {
        updateMusicButtonText(musicToggleButtonGame);

        musicToggleButtonGame.addEventListener('click', () => {
            handleMusicToggle(musicToggleButtonGame);
        });
    }
});
