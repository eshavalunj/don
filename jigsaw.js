const jigsawContainer = document.getElementById('jigsaw-container');
let pieces = [];

function createJigsaw(imageUrl) {
    jigsawContainer.innerHTML = '';
    pieces = [];

    // Adjust the loop to create a 3x4 grid (12 pieces)
    for (let i = 0; i < 12; i++) {
        const piece = document.createElement('div');
        piece.classList.add('jigsaw-piece');
        piece.style.backgroundImage = `url(${imageUrl})`;
        piece.style.backgroundPosition = `${(i % 4) * -100}px ${(Math.floor(i / 4)) * -100}px`;
        piece.draggable = true;
        piece.addEventListener('dragstart', handleDragStart);
        piece.addEventListener('dragover', handleDragOver);
        piece.addEventListener('drop', handleDrop);
        jigsawContainer.appendChild(piece);
        pieces.push(piece);
    }

    shufflePieces();
}

function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.style.backgroundPosition);
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const draggedPosition = event.dataTransfer.getData('text/plain');
    const targetPosition = event.target.style.backgroundPosition;

    event.target.style.backgroundPosition = draggedPosition;
    event.target.draggable = true;
    const draggedPiece = pieces.find(piece => piece.style.backgroundPosition === draggedPosition);
    draggedPiece.style.backgroundPosition = targetPosition;
}

function shufflePieces() {
    pieces.sort(() => Math.random() - 0.5);
    pieces.forEach((piece, i) => {
        jigsawContainer.appendChild(piece);
    });
}

// Initialize the jigsaw with an example image
createJigsaw('img2.jpg');
