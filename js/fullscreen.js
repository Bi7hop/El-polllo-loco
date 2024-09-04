/**
 * References to DOM elements for game canvas, fullscreen button, 
 * startscreen, and gameContainer.
 */
const gameCanvas = document.getElementById('canvas');
const fullscreenButton = document.getElementById('fullscreenButton');
const startscreen = document.getElementById('startscreen');
const gameContainer = document.getElementById('gameContainer');

/**
 * Toggles fullscreen mode when the fullscreen button is clicked.
 * Depending on the browser, different methods are used to request fullscreen.
 */
fullscreenButton.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        if (gameCanvas.requestFullscreen) {
            gameCanvas.requestFullscreen();
        } else if (gameCanvas.mozRequestFullScreen) {
            gameCanvas.mozRequestFullScreen();
        } else if (gameCanvas.webkitRequestFullscreen) {
            gameCanvas.webkitRequestFullscreen();
        } else if (gameCanvas.msRequestFullscreen) {
            gameCanvas.msRequestFullscreen();
        }
    }
});

/**
 * Listens for changes to fullscreen mode.
 * Ensures that after exiting fullscreen, only the game container is visible,
 * while the start screen is hidden.
 */
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        startscreen.style.display = 'none';  
        gameContainer.style.display = 'flex';  
    }
});
