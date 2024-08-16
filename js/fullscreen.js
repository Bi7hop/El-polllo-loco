const gameCanvas = document.getElementById('canvas');
const fullscreenButton = document.getElementById('fullscreenButton');

fullscreenButton.addEventListener('click', () => {
    if (gameCanvas.requestFullscreen) {
        gameCanvas.requestFullscreen();
    } else if (gameCanvas.mozRequestFullScreen) { // Firefox
        gameCanvas.mozRequestFullScreen();
    } else if (gameCanvas.webkitRequestFullscreen) { // Chrome, Safari and Opera
        gameCanvas.webkitRequestFullscreen();
    } else if (gameCanvas.msRequestFullscreen) { // IE/Edge
        gameCanvas.msRequestFullscreen();
    }
});

// Optional: Handling fullscreen changes
document.addEventListener('fullscreenchange', () => {
    console.log('Fullscreen mode changed');
});
