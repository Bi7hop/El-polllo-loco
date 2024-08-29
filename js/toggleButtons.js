document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const startScreen = document.getElementById('startscreen');
    const buttons = document.querySelectorAll('.game-button');

    function hideButtons() {
        buttons.forEach(button => button.style.display = 'none');
    }

    document.getElementById('startButton').addEventListener('click', () => {
        gameContainer.style.display = 'block';  
        startScreen.style.display = 'none';     
        hideButtons();                         
    });

    
    document.getElementById('backToStartButton').addEventListener('click', () => {
        gameContainer.style.display = 'none';  
        startScreen.style.display = 'flex';    
        buttons.forEach(button => button.style.display = 'block');  
    });
});
