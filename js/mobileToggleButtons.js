document.addEventListener('DOMContentLoaded', () => {
    const mobileButtonsContainer = document.getElementById('mobileButtons');
    const footer = document.getElementById('footer');
    const startscreen = document.getElementById('startscreen');
    const gameContainer = document.getElementById('gameContainer');
    const musikButton = document.getElementById('mobileButtonMusik');
    const pauseButton = document.getElementById('mobileButtonPause');
    const fullscreenButton = document.getElementById('fullscreenButton');
    const mobileButtons = document.querySelectorAll('.mobile-button');

    /**
     * Toggles the visibility of the mobile buttons based on the device orientation, screen width, 
     * and whether it's a touch device.
     */
    function toggleMobileButtons() {
        const isLandscape = window.matchMedia('(orientation: landscape)').matches;
        const isMobile = window.innerWidth < 1024;

        if (isMobile && isLandscape) {
            mobileButtonsContainer.style.display = 'flex';
        } else {
            mobileButtonsContainer.style.display = 'none';
        }
    }

    /**
     * Dynamically toggles the fullscreen button based on the input type.
     * Listens for pointer events to detect whether the user is using touch or mouse.
     */
    function setupPointerEvents() {
        window.addEventListener('pointerdown', (event) => {
            if (event.pointerType === 'touch') {
                fullscreenButton.classList.add('hidden');
            } else if (event.pointerType === 'mouse') {
                fullscreenButton.classList.remove('hidden');
            }
        });
    }

    /**
     * Updates the visibility of the footer based on the screen width and 
     * the current display state of the start screen.
     */
    function updateFooterVisibility() {
        const isMobile = window.innerWidth < 1024;

        if (isMobile && startscreen.style.display !== 'none') {
            footer.style.display = 'block';
        } else {
            footer.style.display = 'none';
        }
    }

    /**
     * Prevents the context menu from appearing when holding down on mobile buttons.
     * This avoids unwanted behavior on touch devices.
     */
    mobileButtons.forEach(button => {
        button.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    });

    /**
     * Initializes the button visibility based on the mute state.
     * Displays the pause button if muted, or the music button if not muted.
     */
    if (soundManager.muted) {
        musikButton.style.display = 'none';
        pauseButton.style.display = 'block';
    } else {
        musikButton.style.display = 'block';
        pauseButton.style.display = 'none';
    }

    /**
     * Handles the click event on the music button.
     * Hides the music button, shows the pause button, and toggles the mute state.
     */
    musikButton.addEventListener('click', () => {
        musikButton.style.display = 'none';
        pauseButton.style.display = 'block';
        soundManager.toggleMute();
    });

    /**
     * Handles the click event on the pause button.
     * Hides the pause button, shows the music button, and toggles the mute state.
     */
    pauseButton.addEventListener('click', () => {
        pauseButton.style.display = 'none';
        musikButton.style.display = 'block';
        soundManager.toggleMute();
    });

    /**
     * Event listener for the start button. Hides the start screen, displays the game container,
     * and updates the visibility of the footer.
     */
    document.getElementById('startButton').addEventListener('click', () => {
        startscreen.style.display = 'none';
        gameContainer.style.display = 'block';
        updateFooterVisibility();
    });

    /**
     * Event listener for the back-to-start button. Hides the game container, displays the start screen,
     * and updates the visibility of the footer.
     */
    document.getElementById('backToStartButton').addEventListener('click', () => {
        gameContainer.style.display = 'none';
        startscreen.style.display = 'block';
        updateFooterVisibility();
    });

    toggleMobileButtons();
    updateFooterVisibility();
    setupPointerEvents();

    window.addEventListener('resize', () => {
        toggleMobileButtons();
        updateFooterVisibility();
    });

    window.addEventListener('orientationchange', () => {
        toggleMobileButtons();
        updateFooterVisibility();
    });
});
