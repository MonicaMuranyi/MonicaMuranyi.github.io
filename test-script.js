function createHexagon(number, row) {
    const hexagon = document.createElement('div');
    hexagon.classList.add('hexagon', `hex${number}`, `row${row}`);
    hexagon.innerHTML = `<span>${number}</span>`;

    hexagon.addEventListener('click', () => {
        number++;
        if (number > 7) {
            number = 1;
        }
        hexagon.querySelector('span').textContent = number;
        hexagon.className = `hexagon hex${number}`;
    });

    return hexagon;
}

function createHexGrid() {
    const container = document.getElementById('container');
    const HEXAGONS_ON_A_SIDE = 6;
    const CONTAINER_WIDTH = 800;
    const numRows = HEXAGONS_ON_A_SIDE * 3 - 2;
    const HEX_WIDTH = 100;
    const HEX_HEIGHT = 87;

    // Is it easier to draw them column by column?
    // Might be, let's start wit

    for (let row = 0; row < numRows; row++) {
        const cols = row < HEXAGONS_ON_A_SIDE ? row + 1 : (row > HEXAGONS_ON_A_SIDE - 1 ? numRows - row : HEXAGONS_ON_A_SIDE);
        for (let col = 0; col < cols; col++) {
            const hex = createHexagon(Math.floor(Math.random() * 7) + 1, row);
            const rowWidth = cols * HEX_WIDTH * 2 - HEX_WIDTH; // the width the row will have
            const middleOfContainer = CONTAINER_WIDTH / 2;
            const rowOffset = middleOfContainer - rowWidth / 2;
            const hexOffset = col * HEX_WIDTH * 2;
            const middleCol = Math.floor(cols / 2);
            let overlapLength = 0;

            if (cols % 2 === 1 && col !== middleCol) {
                const divider = col < middleCol ? 4 : -4;
                overlapLength = HEX_WIDTH * (col >= middleCol ? col - middleCol : middleCol - col) / divider;
                
            }

            if (cols % 2 === 0) {
                const divider = col < middleCol ? 4 : -4;
                overlapLength = HEX_WIDTH * (col >= middleCol ? col - middleCol + 1: middleCol - col) / divider;
            }

            console.log(`Row ${row}, col ${col}, overlapL: ${overlapLength}`);

            const x = rowOffset + hexOffset + overlapLength;
            const y = row * HEX_HEIGHT / 2;



            hex.style.left = `${x}px`;
            hex.style.top = `${y}px`;
            container.appendChild(hex);
        }
    }
}

createHexGrid();
