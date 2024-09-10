document.addEventListener('DOMContentLoaded', () => {
    const rotateMessage = document.getElementById('rotateMessage');
    const gameContainer = document.getElementById('gameContainer');
    const startScreen = document.getElementById('startscreen');

    let isGameActive = false; 

    /**
     * Checks the device's orientation and screen size to determine whether to display
     * a message prompting the user to rotate their device. The rotate message is shown only
     * if the device is in portrait mode with a small width (e.g., on a mobile phone).
     */
    function checkOrientation() {
        if (window.innerWidth < 600 && window.innerHeight > window.innerWidth) {
            rotateMessage.style.display = 'flex';
            gameContainer.style.display = 'none';
            startScreen.style.display = 'none';
        } else {
            rotateMessage.style.display = 'none';
            if (isGameActive) {
                gameContainer.style.display = 'flex';
                startScreen.style.display = 'none';
            } else {
                startScreen.style.display = 'flex';
                gameContainer.style.display = 'none';
            }
        }
    }

    /**
 * Starts the game by setting the game state to active, hiding the start screen,
 * displaying the game container, and checking the current device orientation.
 * 
 * @function
 */
    function startGame() {
        isGameActive = true; 
        startScreen.style.display = 'none';
        gameContainer.style.display = 'block';
        checkOrientation(); 
    }

    
    document.getElementById('startButton').addEventListener('click', startGame);

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    checkOrientation(); 
});
