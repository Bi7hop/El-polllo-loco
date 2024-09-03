/**
 * Retrieves the game canvas and fullscreen button elements from the DOM.
 */
const gameCanvas = document.getElementById('canvas');
const fullscreenButton = document.getElementById('fullscreenButton');

/**
 * Adds an event listener to the fullscreen button to toggle fullscreen mode
 * for the game canvas. The function uses different methods depending on the browser.
 */
fullscreenButton.addEventListener('click', () => {
    if (gameCanvas.requestFullscreen) {
        gameCanvas.requestFullscreen();
    } else if (gameCanvas.mozRequestFullScreen) { 
        gameCanvas.mozRequestFullScreen();
    } else if (gameCanvas.webkitRequestFullscreen) { 
        gameCanvas.webkitRequestFullscreen();
    } else if (gameCanvas.msRequestFullscreen) {
        gameCanvas.msRequestFullscreen();
    }
});

/**
 * Adds an event listener to the document that logs a message when the fullscreen mode changes.
 */
document.addEventListener('fullscreenchange', () => {
});
