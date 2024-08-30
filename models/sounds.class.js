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
            victory: new Audio('audio/win.mp3')
        };

        this.muted = false;

        for (let key in this.sounds) {
            this.sounds[key].volume = 0.5;
        }

        this.sounds.endboss.loop = true;
    }

    play(soundName) {
        if (this.sounds[soundName] && !this.muted) {
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
