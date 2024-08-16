document.addEventListener('DOMContentLoaded', function() {
    let world;  

    function init() {
        const keyboard = new Keyboard();  
        world = new World(document.getElementById('canvas'), keyboard);
    }

    document.getElementById('startButton').addEventListener('click', function() {
        document.getElementById('startscreen').style.display = 'none';
        document.getElementById('gameContainer').style.display = 'flex';
        setTimeout(init, 100); 
    });

    document.getElementById('instructionsButton').addEventListener('click', function() {
        document.getElementById('startscreen').style.display = 'none';
        document.getElementById('instructions').style.display = 'flex';
    });

    document.getElementById('backButton').addEventListener('click', function() {
        document.getElementById('instructions').style.display = 'none';
        document.getElementById('startscreen').style.display = 'flex';
    });

    
    document.getElementById('backToStartButton').addEventListener('click', function() {
        document.getElementById('gameContainer').style.display = 'none';
        document.getElementById('startscreen').style.display = 'flex';
        
       
        if (world) {
            world.reset();  
        }
    });
});
