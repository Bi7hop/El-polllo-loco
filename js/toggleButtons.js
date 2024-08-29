document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const startScreen = document.getElementById('startscreen');
    const buttons = document.querySelectorAll('.game-button');

    function hideButtonsAfterGameStart() {
        const isLandscape = window.matchMedia('(orientation: landscape)').matches;
        const isMobile = window.innerWidth < 1024 && window.innerHeight < window.innerWidth;
        const isSmallDevice = window.innerWidth < 600; 

        if (isMobile && isLandscape && !isSmallDevice) {
            buttons.forEach(button => button.style.display = 'none');
        }
    }

    function ensureButtonsVisibleOnStartScreen() {
        const isLandscape = window.matchMedia('(orientation: landscape)').matches;
        const isMobile = window.innerWidth < 1024 && window.innerHeight < window.innerWidth;
        const isSmallDevice = window.innerWidth < 700;

        if (!(isMobile && isLandscape && !isSmallDevice)) {
            buttons.forEach(button => button.style.display = 'block');
        }
    }

    document.getElementById('startButton').addEventListener('click', () => {
        gameContainer.style.display = 'block';  
        startScreen.style.display = 'none';     
        hideButtonsAfterGameStart();
    });

    document.getElementById('backToStartButton').addEventListener('click', () => {
        gameContainer.style.display = 'none';  
        startScreen.style.display = 'flex';    
        ensureButtonsVisibleOnStartScreen();
    });
    
    window.addEventListener('resize', ensureButtonsVisibleOnStartScreen);
    ensureButtonsVisibleOnStartScreen();
});
