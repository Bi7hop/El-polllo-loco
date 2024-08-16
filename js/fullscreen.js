const gameCanvas = document.getElementById('canvas');
const fullscreenButton = document.getElementById('fullscreenButton');

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


document.addEventListener('fullscreenchange', () => {
    console.log('Fullscreen mode changed');
});
