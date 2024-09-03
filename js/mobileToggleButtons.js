/**
 * Event listener for DOMContentLoaded. Initializes the mobile button display logic
 * and sets up event listeners for various UI elements.
 */
document.addEventListener('DOMContentLoaded', () => {
    const mobileButtonsContainer = document.getElementById('mobileButtons');
    const footer = document.getElementById('footer');
    const startscreen = document.getElementById('startscreen');
    const gameContainer = document.getElementById('gameContainer');
    const musikButton = document.getElementById('mobileButtonMusik');
    const pauseButton = document.getElementById('mobileButtonPause');

    /**
     * Toggles the visibility of mobile buttons and footer based on the screen orientation,
     * device type, and screen width.
     */
    function toggleMobileButtons() {
        const isLandscape = window.matchMedia('(orientation: landscape)').matches;
        const isMobile = window.innerWidth < 1024;
        const isSmallDevice = window.innerWidth < 600;

        if (isMobile && isLandscape && !isSmallDevice) {
            mobileButtonsContainer.style.display = 'flex';
            footer.style.display = 'none';  
        } else {
            mobileButtonsContainer.style.display = 'none';
            footer.style.display = 'block';  
        }
    }

    /**
     * Updates the visibility of the footer based on the screen width and the display state
     * of the startscreen.
     */
    function updateFooterVisibility() {
        const isMobile = window.innerWidth < 1024;

        if (isMobile && startscreen.style.display !== 'none') {
            footer.style.display = 'block';  
        } else if (isMobile && startscreen.style.display === 'none') {
            footer.style.display = 'none'; 
        } else {
            footer.style.display = 'block'; 
        }
    }

    /**
     * Event listener for the music button. Toggles the display between music and pause buttons
     * and mutes/unmutes the sound using the soundManager.
     */
    musikButton.addEventListener('click', () => {
        musikButton.style.display = 'none';
        pauseButton.style.display = 'block';
        soundManager.toggleMute();
    });

      /**
     * Event listener for the pause button. Toggles the display between pause and music buttons
     * and mutes/unmutes the sound using the soundManager.
     */
    pauseButton.addEventListener('click', () => {
        pauseButton.style.display = 'none';
        musikButton.style.display = 'block';
        soundManager.toggleMute();
    });

     /**
     * Event listener for the start button. Hides the startscreen and displays the game container.
     * Updates the footer visibility accordingly.
     */
    document.getElementById('startButton').addEventListener('click', () => {
        startscreen.style.display = 'none';
        gameContainer.style.display = 'block';
        updateFooterVisibility();
    });

    /**
     * Event listener for the back to start button. Hides the game container and displays the startscreen.
     * Updates the footer visibility accordingly.
     */
    document.getElementById('backToStartButton').addEventListener('click', () => {
        gameContainer.style.display = 'none';
        startscreen.style.display = 'block';
        updateFooterVisibility();
    });

    toggleMobileButtons();
    updateFooterVisibility();

    window.addEventListener('resize', () => {
        toggleMobileButtons();
        updateFooterVisibility();
    });

    window.addEventListener('orientationchange', () => {
        toggleMobileButtons();
        updateFooterVisibility();
    });
});
