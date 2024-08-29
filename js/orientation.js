document.addEventListener('DOMContentLoaded', () => {
    const rotateMessage = document.getElementById('rotateMessage');
    const gameContainer = document.getElementById('gameContainer');
    const startScreen = document.getElementById('startscreen');

    function checkOrientation() {
        if (window.innerWidth < 600 && window.innerHeight > window.innerWidth) {
            rotateMessage.style.display = 'flex';
            gameContainer.style.display = 'none';
            startScreen.style.display = 'none';
        } else {
            rotateMessage.style.display = 'none';
            startScreen.style.display = 'flex';
        }
    }

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    checkOrientation();
});
