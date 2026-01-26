// Get elements
const cvModal = document.querySelector('#cv-modal');
const minesweeperModal = document.querySelector('#minesweeper-modal');
const tictactoeModal = document.querySelector('#tictactoe-modal');
const settingsModal = document.querySelector('#settings-modal');
const workModal = document.querySelector('#work-modal');
const certificateModal = document.querySelector('#certificate');

const cvIcon = document.querySelector('#cv-icon');
const minesweeperIcon = document.querySelector('#minesweeper-icon');
const tictactoeIcon = document.querySelector('#tictactoe-icon');
const settingsBtn = document.querySelector('.settings-btn');
const restartBtn = document.querySelector('.restart-btn');
const workIcon = document.querySelector('#work-icon');
const certificationIcon = document.querySelector('#certification-icon');

const dateTimeDisplay = document.querySelector('.dateTime');

// Hide modals initially
cvModal.style.display = 'flex';
minesweeperModal.style.display = 'none';
tictactoeModal.style.display = 'none';
settingsModal.style.display = 'none';
workModal.style.display = 'none';
certificateModal.style.display = 'none';

// Open modals on double-click
cvIcon.addEventListener('dblclick', () => {
    cvModal.style.display = 'flex';
});

minesweeperIcon.addEventListener('dblclick', () => {
    minesweeperModal.style.display = 'flex';
    initMinesweeper();
});

tictactoeIcon.addEventListener('dblclick', () => {
    tictactoeModal.style.display = 'flex';
    initTicTacToe();
});

workIcon.addEventListener('dblclick', () => {
    workModal.style.display = 'flex';
});

certificationIcon.addEventListener('dblclick', () => {
    certificateModal.style.display = 'flex';
});

// Open settings modal
settingsBtn.addEventListener('click', () => {
    settingsModal.style.display = 'flex';
});

// Restart button
restartBtn.addEventListener('click', () => {
    location.reload();
});

// Close buttons
document.querySelectorAll('.X').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.target.closest('.modal').style.display = 'none';
    });
});

// Make icons draggable
function makeDraggable(element) {
    let isDragging = false;
    let currentX, currentY, initialX, initialY, xOffset = 0, yOffset = 0;
    
    element.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    function dragStart(e) {
        const rect = element.getBoundingClientRect();
        initialX = e.clientX - rect.left + xOffset;
        initialY = e.clientY - rect.top + yOffset;
        isDragging = true;
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            
            element.style.left = `${currentX}px`;
            element.style.top = `${currentY}px`;
        }
    }
    
    function dragEnd() {
        isDragging = false;
    }
}

makeDraggable(cvIcon);
makeDraggable(minesweeperIcon);
makeDraggable(tictactoeIcon);
makeDraggable(workIcon);
makeDraggable(certificationIcon);

// Make modals draggable by header
function makeModalDraggable(modal) {
    const header = modal.querySelector('.modal-top-aboutMe');
    let isDragging = false;
    let currentX, currentY, initialX, initialY, xOffset = 0, yOffset = 0;
    
    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    function dragStart(e) {
        if (e.target.classList.contains('X')) return;
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        isDragging = true;
        header.style.cursor = 'grabbing';
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            
            modal.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))`;
        }
    }
    
    function dragEnd() {
        isDragging = false;
        header.style.cursor = 'grab';
    }
}

makeModalDraggable(cvModal);
makeModalDraggable(minesweeperModal);
makeModalDraggable(tictactoeModal);
makeModalDraggable(settingsModal);
makeModalDraggable(workModal);
makeModalDraggable(certificateModal);

// Date and Time
function updateDateTime() {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    const formattedDateTime = `${dayName}, ${monthName} ${date}, ${year} ${hours}:${minutes} ${ampm}`;
    dateTimeDisplay.textContent = formattedDateTime;
}

updateDateTime();
setInterval(updateDateTime, 1000);

// SELECTION BOX FEATURE
const container = document.querySelector('.container');
let selectionBox = document.createElement('div');
selectionBox.className = 'selection-box';
document.body.appendChild(selectionBox);

let isSelecting = false;
let selectionStartX, selectionStartY;
let selectedIcons = [];

container.addEventListener('mousedown', (e) => {
    // Only start selection if clicking on empty space (not on an icon)
    if (e.target === container) {
        isSelecting = true;
        selectionStartX = e.clientX;
        selectionStartY = e.clientY;
        
        // Clear previous selections
        selectedIcons.forEach(icon => icon.classList.remove('selected'));
        selectedIcons = [];
        
        selectionBox.style.left = selectionStartX + 'px';
        selectionBox.style.top = selectionStartY + 'px';
        selectionBox.style.width = '0px';
        selectionBox.style.height = '0px';
        selectionBox.style.display = 'block';
        
        e.preventDefault();
    }
});

document.addEventListener('mousemove', (e) => {
    if (isSelecting) {
        const currentX = e.clientX;
        const currentY = e.clientY;
        
        const width = Math.abs(currentX - selectionStartX);
        const height = Math.abs(currentY - selectionStartY);
        const left = Math.min(currentX, selectionStartX);
        const top = Math.min(currentY, selectionStartY);
        
        selectionBox.style.left = left + 'px';
        selectionBox.style.top = top + 'px';
        selectionBox.style.width = width + 'px';
        selectionBox.style.height = height + 'px';
        
        // Check which icons are within the selection box
        const icons = document.querySelectorAll('.img-container');
        const selectionRect = {
            left: left,
            top: top,
            right: left + width,
            bottom: top + height
        };
        
        icons.forEach(icon => {
            const iconRect = icon.getBoundingClientRect();
            const iconBox = {
                left: iconRect.left,
                top: iconRect.top,
                right: iconRect.right,
                bottom: iconRect.bottom
            };
            
            // Check if icon intersects with selection box
            if (!(iconBox.right < selectionRect.left ||
                  iconBox.left > selectionRect.right ||
                  iconBox.bottom < selectionRect.top ||
                  iconBox.top > selectionRect.bottom)) {
                if (!icon.classList.contains('selected')) {
                    icon.classList.add('selected');
                    if (!selectedIcons.includes(icon)) {
                        selectedIcons.push(icon);
                    }
                }
            } else {
                icon.classList.remove('selected');
                const index = selectedIcons.indexOf(icon);
                if (index > -1) {
                    selectedIcons.splice(index, 1);
                }
            }
        });
    }
});

document.addEventListener('mouseup', () => {
    if (isSelecting) {
        isSelecting = false;
        selectionBox.style.display = 'none';
    }
});

// MINESWEEPER GAME
let mineGrid = [];
let mineRows = 10;
let mineCols = 10;
let mineCount = 15;
let revealedCount = 0;
let gameOver = false;

function initMinesweeper() {
    mineGrid = [];
    revealedCount = 0;
    gameOver = false;
    
    const gridContainer = document.querySelector('.minesweeper-grid');
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${mineCols}, 30px)`;
    
    // Create grid
    for (let i = 0; i < mineRows; i++) {
        mineGrid[i] = [];
        for (let j = 0; j < mineCols; j++) {
            mineGrid[i][j] = {
                mine: false,
                revealed: false,
                flagged: false,
                adjacentMines: 0
            };
            
            const cell = document.createElement('div');
            cell.className = 'mine-cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            
            cell.addEventListener('click', () => revealCell(i, j));
            cell.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                toggleFlag(i, j);
            });
            
            gridContainer.appendChild(cell);
        }
    }
    
    // Place mines
    let placedMines = 0;
    while (placedMines < mineCount) {
        const r = Math.floor(Math.random() * mineRows);
        const c = Math.floor(Math.random() * mineCols);
        
        if (!mineGrid[r][c].mine) {
            mineGrid[r][c].mine = true;
            placedMines++;
        }
    }
    
    // Calculate adjacent mines
    for (let i = 0; i < mineRows; i++) {
        for (let j = 0; j < mineCols; j++) {
            if (!mineGrid[i][j].mine) {
                let count = 0;
                for (let di = -1; di <= 1; di++) {
                    for (let dj = -1; dj <= 1; dj++) {
                        const ni = i + di;
                        const nj = j + dj;
                        if (ni >= 0 && ni < mineRows && nj >= 0 && nj < mineCols && mineGrid[ni][nj].mine) {
                            count++;
                        }
                    }
                }
                mineGrid[i][j].adjacentMines = count;
            }
        }
    }
    
    updateMineCounter();
}

function revealCell(row, col) {
    if (gameOver || mineGrid[row][col].revealed || mineGrid[row][col].flagged) return;
    
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    mineGrid[row][col].revealed = true;
    cell.classList.add('revealed');
    revealedCount++;
    
    if (mineGrid[row][col].mine) {
        cell.classList.add('mine');
        cell.textContent = '💣';
        gameOver = true;
        revealAllMines();
        alert('Game Over! You hit a mine!');
        return;
    }
    
    const adjacent = mineGrid[row][col].adjacentMines;
    if (adjacent > 0) {
        cell.textContent = adjacent;
        const colors = ['', 'blue', 'green', 'red', 'purple', 'maroon', 'turquoise', 'black', 'gray'];
        cell.style.color = colors[adjacent];
    } else {
        // Reveal adjacent cells
        for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
                const ni = row + di;
                const nj = col + dj;
                if (ni >= 0 && ni < mineRows && nj >= 0 && nj < mineCols) {
                    revealCell(ni, nj);
                }
            }
        }
    }
    
    // Check win
    if (revealedCount === mineRows * mineCols - mineCount) {
        gameOver = true;
        alert('Congratulations! You won!');
    }
}

function toggleFlag(row, col) {
    if (gameOver || mineGrid[row][col].revealed) return;
    
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    mineGrid[row][col].flagged = !mineGrid[row][col].flagged;
    
    if (mineGrid[row][col].flagged) {
        cell.classList.add('flagged');
        cell.textContent = '🚩';
    } else {
        cell.classList.remove('flagged');
        cell.textContent = '';
    }
    
    updateMineCounter();
}

function revealAllMines() {
    for (let i = 0; i < mineRows; i++) {
        for (let j = 0; j < mineCols; j++) {
            if (mineGrid[i][j].mine) {
                const cell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
                cell.classList.add('mine');
                cell.textContent = '💣';
            }
        }
    }
}

function updateMineCounter() {
    let flaggedCount = 0;
    for (let i = 0; i < mineRows; i++) {
        for (let j = 0; j < mineCols; j++) {
            if (mineGrid[i][j].flagged) flaggedCount++;
        }
    }
    document.querySelector('#mine-counter').textContent = `Mines: ${mineCount - flaggedCount}`;
}

document.querySelector('#mine-reset').addEventListener('click', initMinesweeper);

// TIC TAC TOE GAME
let tttBoard = ['', '', '', '', '', '', '', '', ''];
let tttCurrentPlayer = 'X';
let tttGameActive = true;

function initTicTacToe() {
    tttBoard = ['', '', '', '', '', '', '', '', ''];
    tttCurrentPlayer = 'X';
    tttGameActive = true;
    
    const cells = document.querySelectorAll('.ttt-cell');
    cells.forEach((cell, index) => {
        cell.textContent = '';
        cell.disabled = false;
        cell.style.color = '#333';
        cell.onclick = () => handleTTTClick(index);
    });
    
    document.querySelector('#ttt-status').textContent = `Player ${tttCurrentPlayer}'s Turn`;
}

function handleTTTClick(index) {
    if (tttBoard[index] !== '' || !tttGameActive) return;
    
    tttBoard[index] = tttCurrentPlayer;
    const cell = document.querySelectorAll('.ttt-cell')[index];
    cell.textContent = tttCurrentPlayer;
    cell.style.color = tttCurrentPlayer === 'X' ? '#e74c3c' : '#3498db';
    cell.disabled = true;
    
    if (checkTTTWinner()) {
        document.querySelector('#ttt-status').textContent = `Player ${tttCurrentPlayer} Wins!`;
        tttGameActive = false;
        document.querySelectorAll('.ttt-cell').forEach(c => c.disabled = true);
        return;
    }
    
    if (!tttBoard.includes('')) {
        document.querySelector('#ttt-status').textContent = `It's a Draw!`;
        tttGameActive = false;
        return;
    }
    
    tttCurrentPlayer = tttCurrentPlayer === 'X' ? 'O' : 'X';
    document.querySelector('#ttt-status').textContent = `Player ${tttCurrentPlayer}'s Turn`;
}

function checkTTTWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return tttBoard[a] !== '' && tttBoard[a] === tttBoard[b] && tttBoard[a] === tttBoard[c];
    });
}

document.querySelector('#ttt-reset').addEventListener('click', initTicTacToe);