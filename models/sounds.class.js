class SoundManager {
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
            backgroundMusic: new Audio('audio/Cultura en Cada Verso.mp3') 
        };

        this.muted = false;

        for (let key in this.sounds) {
            this.sounds[key].volume = 0.5; 
        }

        this.sounds.endboss.loop = false;
        this.sounds.backgroundMusic.loop = true; 
        this.sounds.backgroundMusic.volume = 0.2; 
    }

    play(soundName) {
        if (this.sounds[soundName] && !this.muted) {
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play();
        }
    }

    pause(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].pause();
        }
    }

    stop(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].pause();
            this.sounds[soundName].currentTime = 0;
        }
    }

    stopAll() {
        for (let key in this.sounds) {
            this.stop(key);
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        for (let key in this.sounds) {
            this.sounds[key].muted = this.muted;
        }
    }
}

const soundManager = new SoundManager();

document.addEventListener('DOMContentLoaded', () => {
    const musicToggleButton = document.getElementById('musicToggleButtonStart');

    if (musicToggleButton) {
        musicToggleButton.textContent = soundManager.muted ? 'Music Off' : 'Music On';

        musicToggleButton.addEventListener('click', () => {
            soundManager.toggleMute();
            musicToggleButton.textContent = soundManager.muted ? 'Music Off' : 'Music On';
        });
    } else {
        console.error('Element with ID "musicToggleButtonStart" not found.');
    }
});
