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
