/**
 * Event listener for DOMContentLoaded. Initializes the game start logic
 * and sets up event listeners for various UI elements.
 */
document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const startScreen = document.getElementById('startscreen');
    const buttons = document.querySelectorAll('.game-button');

    /**
     * Hides game buttons after the game starts based on screen orientation and device type.
     * Buttons are hidden on mobile devices in landscape mode, except for small devices.
     */
    function hideButtonsAfterGameStart() {
        const isLandscape = window.matchMedia('(orientation: landscape)').matches;
        const isMobile = window.innerWidth < 1024 && window.innerHeight < window.innerWidth;
        const isSmallDevice = window.innerWidth < 600; 

        if (isMobile && isLandscape && !isSmallDevice) {
            buttons.forEach(button => button.style.display = 'none');
        }
    }

    /**
     * Ensures that the game buttons are visible on the start screen based on screen orientation and device type.
     * Buttons are shown unless the device is a mobile in landscape mode, except for small devices.
     */
    function ensureButtonsVisibleOnStartScreen() {
        const isLandscape = window.matchMedia('(orientation: landscape)').matches;
        const isMobile = window.innerWidth < 1024 && window.innerHeight < window.innerWidth;
        const isSmallDevice = window.innerWidth < 700;

        if (!(isMobile && isLandscape && !isSmallDevice)) {
            buttons.forEach(button => button.style.display = 'block');
        }
    }

    /**
     * Event listener for the start button. Displays the game container and hides the start screen.
     * Hides the game buttons based on the current screen and device configuration.
     */
    document.getElementById('startButton').addEventListener('click', () => {
        gameContainer.style.display = 'block';  
        startScreen.style.display = 'none';     
        hideButtonsAfterGameStart();
    });

    /**
     * Event listener for the back to start button. Hides the game container and shows the start screen.
     * Ensures the game buttons are visible on the start screen.
     */
    document.getElementById('backToStartButton').addEventListener('click', () => {
        gameContainer.style.display = 'none';  
        startScreen.style.display = 'flex';    
        ensureButtonsVisibleOnStartScreen();
    });
    
    window.addEventListener('resize', ensureButtonsVisibleOnStartScreen);
    ensureButtonsVisibleOnStartScreen();
});
