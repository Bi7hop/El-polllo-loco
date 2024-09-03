document.addEventListener('DOMContentLoaded', () => {
    const mobileButtonsContainer = document.getElementById('mobileButtons');
    const footer = document.getElementById('footer');
    const startscreen = document.getElementById('startscreen');
    const gameContainer = document.getElementById('gameContainer');
    const musikButton = document.getElementById('mobileButtonMusik');
    const pauseButton = document.getElementById('mobileButtonPause');

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

    musikButton.addEventListener('click', () => {
        musikButton.style.display = 'none';
        pauseButton.style.display = 'block';
        soundManager.toggleMute();
    });

    pauseButton.addEventListener('click', () => {
        pauseButton.style.display = 'none';
        musikButton.style.display = 'block';
        soundManager.toggleMute();
    });

    document.getElementById('startButton').addEventListener('click', () => {
        startscreen.style.display = 'none';
        gameContainer.style.display = 'block';
        updateFooterVisibility();
    });

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
