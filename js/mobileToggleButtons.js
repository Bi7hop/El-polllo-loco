document.addEventListener('DOMContentLoaded', () => {
    const mobileButtonsContainer = document.getElementById('mobileButtons');

    function toggleMobileButtons() {
        const isLandscape = window.matchMedia('(orientation: landscape)').matches;
        const isMobile = window.innerWidth < 1024;
        const isSmallDevice = window.innerWidth < 600;

        if (isMobile && isLandscape && !isSmallDevice) {
            mobileButtonsContainer.style.display = 'flex';
        } else {
            mobileButtonsContainer.style.display = 'none';
        }
    }

    toggleMobileButtons();
    window.addEventListener('resize', toggleMobileButtons);
    window.addEventListener('orientationchange', toggleMobileButtons);
});

document.addEventListener('DOMContentLoaded', () => {
    const musikButton = document.getElementById('mobileButtonMusik');
    const pauseButton = document.getElementById('mobileButtonPause');

    musikButton.addEventListener('click', () => {
        musikButton.style.display = 'none';
        pauseButton.style.display = 'block';
    });

    pauseButton.addEventListener('click', () => {
        pauseButton.style.display = 'none';
        musikButton.style.display = 'block';
    });
});
