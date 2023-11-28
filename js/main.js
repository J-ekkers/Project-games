document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    // Create grid
    for (let i = 0; i < 100; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridContainer.appendChild(gridItem);
    }
    // Add ships (for simplicity, one ship placed at random)
    const ships = [getRandomGridIndex()];
    document.getElementById('grid-container').children[ships[0]].classList.add('ship');
    // Handle grid item click
    gridContainer.addEventListener('click', (event) => {
        const clickedIndex = Array.from(gridContainer.children).indexOf(event.target);
        // Check if the clicked cell is a ship
        if (ships.includes(clickedIndex)) {
            event.target.classList.add('hit');
            alert('Hit!');
        } else {
            event.target.style.backgroundColor = '#95a5a6';
            alert('Miss!');
        }
    });
    // Function to get a random grid index
    function getRandomGridIndex() {
        return Math.floor(Math.random() * 100);
    }
});