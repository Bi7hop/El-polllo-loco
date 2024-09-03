/**
 * Event listener for DOMContentLoaded. Initializes the orientation check
 * and sets up event listeners for window resize and orientation change.
 */
document.addEventListener('DOMContentLoaded', () => {
    const rotateMessage = document.getElementById('rotateMessage');
    const gameContainer = document.getElementById('gameContainer');
    const startScreen = document.getElementById('startscreen');

    /**
     * Checks the device's orientation and screen size to determine whether to display
     * a message prompting the user to rotate their device. If the device is in portrait mode
     * with a small width (e.g., on a mobile phone), the rotate message is shown and other
     * containers are hidden.
     */
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
