class CrosswordGame {
    constructor() {
        this.currentPuzzle = null;
        this.currentCell = null;
        this.currentWord = null;
        this.isAcross = true;
        this.startTime = null;
        this.timerInterval = null;
        this.gameCompleted = false;
        
        this.initializeGame();
        this.bindEvents();
    }

    // Sample crossword puzzles
    puzzles = [
        {
            size: { rows: 5, cols: 5 },
            grid: [
                ['C', 'A', 'T', '#', '#'],
                ['A', '#', 'H', '#', 'D'],
                ['R', 'U', 'N', '#', 'O'],
                ['#', '#', '#', '#', 'G'],
                ['#', '#', '#', '#', '#']
            ],
            numbers: [
                [1, 2, 3, 0, 0],
                [4, 0, 5, 0, 6],
                [7, 8, 9, 0, 10],
                [0, 0, 0, 0, 11],
                [0, 0, 0, 0, 0]
            ],
            clues: {
                across: [
                    { number: 1, clue: "Feline pet", answer: "CAT", startRow: 0, startCol: 0 },
                    { number: 4, clue: "Vehicle", answer: "CAR", startRow: 1, startCol: 0 },
                    { number: 7, clue: "Move quickly", answer: "RUN", startRow: 2, startCol: 0 }
                ],
                down: [
                    { number: 2, clue: "Exist", answer: "ARE", startRow: 0, startCol: 1 },
                    { number: 3, clue: "Pronoun", answer: "THE", startRow: 0, startCol: 2 },
                    { number: 6, clue: "Canine", answer: "DOG", startRow: 1, startCol: 4 },
                    { number: 8, clue: "Employ", answer: "USE", startRow: 2, startCol: 1 },
                    { number: 9, clue: "Negative", answer: "NO", startRow: 2, startCol: 2 }
                ]
            }
        },
        {
            size: { rows: 6, cols: 6 },
            grid: [
                ['S', 'U', 'N', '#', '#', '#'],
                ['T', '#', 'E', 'A', 'R', '#'],
                ['A', '#', 'W', '#', 'E', 'D'],
                ['R', 'E', 'D', '#', 'A', '#'],
                ['#', '#', '#', '#', 'D', '#'],
                ['#', '#', '#', '#', '#', '#']
            ],
            numbers: [
                [1, 2, 3, 0, 0, 0],
                [4, 0, 5, 6, 7, 0],
                [8, 0, 9, 0, 10, 11],
                [12, 13, 14, 0, 15, 0],
                [0, 0, 0, 0, 16, 0],
                [0, 0, 0, 0, 0, 0]
            ],
            clues: {
                across: [
                    { number: 1, clue: "Bright star", answer: "SUN", startRow: 0, startCol: 0 },
                    { number: 4, clue: "Begin", answer: "START", startRow: 1, startCol: 0 },
                    { number: 5, clue: "Drop of sorrow", answer: "TEAR", startRow: 1, startCol: 2 },
                    { number: 8, clue: "Celestial body", answer: "STAR", startRow: 2, startCol: 0 },
                    { number: 9, clue: "Fresh", answer: "NEW", startRow: 2, startCol: 2 },
                    { number: 10, clue: "Marry", answer: "WED", startRow: 2, startCol: 4 },
                    { number: 12, clue: "Color", answer: "RED", startRow: 3, startCol: 0 },
                    { number: 15, clue: "Peruse", answer: "READ", startRow: 3, startCol: 4 }
                ],
                down: [
                    { number: 2, clue: "Employ", answer: "USE", startRow: 0, startCol: 1 },
                    { number: 3, clue: "Negative", answer: "NO", startRow: 0, startCol: 2 },
                    { number: 6, clue: "Exist", answer: "ARE", startRow: 1, startCol: 3 },
                    { number: 7, clue: "Color", answer: "RED", startRow: 1, startCol: 4 },
                    { number: 11, clue: "Father", answer: "DAD", startRow: 2, startCol: 5 },
                    { number: 13, clue: "Consume", answer: "EAT", startRow: 3, startCol: 1 },
                    { number: 14, clue: "Perform", answer: "DO", startRow: 3, startCol: 2 },
                    { number: 16, clue: "Sum", answer: "ADD", startRow: 4, startCol: 4 }
                ]
            }
        }
    ];

    initializeGame() {
        this.loadRandomPuzzle();
        this.renderGrid();
        this.renderClues();
        this.startTimer();
    }

    loadRandomPuzzle() {
        const randomIndex = Math.floor(Math.random() * this.puzzles.length);
        this.currentPuzzle = JSON.parse(JSON.stringify(this.puzzles[randomIndex]));
        this.gameCompleted = false;
        
        // Initialize user answers
        this.userAnswers = Array(this.currentPuzzle.size.rows).fill().map(() => 
            Array(this.currentPuzzle.size.cols).fill('')
        );
    }

    renderGrid() {
        const gridElement = document.getElementById('crosswordGrid');
        const { rows, cols } = this.currentPuzzle.size;
        
        gridElement.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gridElement.innerHTML = '';

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;

                if (this.currentPuzzle.grid[row][col] === '#') {
                    cell.classList.add('black');
                } else {
                    cell.classList.add('white');
                    
                    // Add number if this cell starts a word
                    const number = this.currentPuzzle.numbers[row][col];
                    if (number > 0) {
                        const numberSpan = document.createElement('span');
                        numberSpan.className = 'cell-number';
                        numberSpan.textContent = number;
                        cell.appendChild(numberSpan);
                    }

                    // Add input field
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.maxLength = 1;
                    input.dataset.row = row;
                    input.dataset.col = col;
                    cell.appendChild(input);
                }

                gridElement.appendChild(cell);
            }
        }
    }

    renderClues() {
        const acrossClues = document.getElementById('acrossClues');
        const downClues = document.getElementById('downClues');
        
        acrossClues.innerHTML = '';
        downClues.innerHTML = '';

        // Render across clues
        this.currentPuzzle.clues.across.forEach(clue => {
            const clueElement = document.createElement('div');
            clueElement.className = 'clue';
            clueElement.dataset.number = clue.number;
            clueElement.dataset.direction = 'across';
            clueElement.innerHTML = `<span class="clue-number">${clue.number}.</span>${clue.clue}`;
            acrossClues.appendChild(clueElement);
        });

        // Render down clues
        this.currentPuzzle.clues.down.forEach(clue => {
            const clueElement = document.createElement('div');
            clueElement.className = 'clue';
            clueElement.dataset.number = clue.number;
            clueElement.dataset.direction = 'down';
            clueElement.innerHTML = `<span class="clue-number">${clue.number}.</span>${clue.clue}`;
            downClues.appendChild(clueElement);
        });
    }

    bindEvents() {
        // Grid cell clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.cell.white') || e.target.matches('.cell.white input')) {
                const cell = e.target.closest('.cell');
                this.selectCell(parseInt(cell.dataset.row), parseInt(cell.dataset.col));
            }
        });

        // Input handling
        document.addEventListener('input', (e) => {
            if (e.target.matches('.cell input')) {
                this.handleInput(e);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.target.matches('.cell input')) {
                this.handleKeyDown(e);
            }
        });

        // Clue clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.clue') || e.target.closest('.clue')) {
                const clueElement = e.target.closest('.clue');
                this.selectClue(parseInt(clueElement.dataset.number), clueElement.dataset.direction);
            }
        });

        // Button events
        document.getElementById('newGame').addEventListener('click', () => this.newGame());
        document.getElementById('checkAnswers').addEventListener('click', () => this.checkAnswers());
        document.getElementById('revealAnswers').addEventListener('click', () => this.revealAnswers());
    }

    selectCell(row, col) {
        this.clearHighlights();
        
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (!cell || cell.classList.contains('black')) return;

        this.currentCell = { row, col };
        cell.classList.add('active');
        
        // Find the word this cell belongs to
        this.findCurrentWord(row, col);
        this.highlightCurrentWord();
        this.highlightCurrentClue();
        
        // Focus the input
        const input = cell.querySelector('input');
        if (input) input.focus();
    }

    findCurrentWord(row, col) {
        // Try to find across word first
        let acrossWord = this.findWordInDirection(row, col, 'across');
        let downWord = this.findWordInDirection(row, col, 'down');
        
        // If we have both directions, choose based on current preference or default to across
        if (acrossWord && downWord) {
            this.currentWord = this.isAcross ? acrossWord : downWord;
        } else {
            this.currentWord = acrossWord || downWord;
            this.isAcross = !!acrossWord;
        }
    }

    findWordInDirection(row, col, direction) {
        const clues = this.currentPuzzle.clues[direction];
        
        for (let clue of clues) {
            const { startRow, startCol, answer } = clue;
            
            if (direction === 'across') {
                if (row === startRow && col >= startCol && col < startCol + answer.length) {
                    return clue;
                }
            } else {
                if (col === startCol && row >= startRow && row < startRow + answer.length) {
                    return clue;
                }
            }
        }
        return null;
    }

    highlightCurrentWord() {
        if (!this.currentWord) return;
        
        const { startRow, startCol, answer } = this.currentWord;
        const direction = this.isAcross ? 'across' : 'down';
        
        for (let i = 0; i < answer.length; i++) {
            const cellRow = direction === 'across' ? startRow : startRow + i;
            const cellCol = direction === 'across' ? startCol + i : startCol;
            
            const cell = document.querySelector(`[data-row="${cellRow}"][data-col="${cellCol}"]`);
            if (cell && !cell.classList.contains('active')) {
                cell.classList.add('highlight');
            }
        }
    }

    highlightCurrentClue() {
        document.querySelectorAll('.clue.active').forEach(clue => clue.classList.remove('active'));
        
        if (this.currentWord) {
            const direction = this.isAcross ? 'across' : 'down';
            const clueElement = document.querySelector(
                `.clue[data-number="${this.currentWord.number}"][data-direction="${direction}"]`
            );
            if (clueElement) clueElement.classList.add('active');
        }
    }

    selectClue(number, direction) {
        const clue = this.currentPuzzle.clues[direction].find(c => c.number === number);
        if (clue) {
            this.isAcross = direction === 'across';
            this.selectCell(clue.startRow, clue.startCol);
        }
    }

    clearHighlights() {
        document.querySelectorAll('.cell.active, .cell.highlight').forEach(cell => {
            cell.classList.remove('active', 'highlight');
        });
        document.querySelectorAll('.clue.active').forEach(clue => {
            clue.classList.remove('active');
        });
    }

    handleInput(e) {
        const input = e.target;
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        
        // Convert to uppercase and store
        const value = input.value.toUpperCase();
        input.value = value;
        this.userAnswers[row][col] = value;
        
        // Move to next cell if there's input
        if (value && this.currentWord) {
            this.moveToNextCell();
        }
        
        this.updateStatus();
    }

    handleKeyDown(e) {
        const input = e.target;
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        
        switch (e.key) {
            case 'Backspace':
                if (!input.value) {
                    this.moveToPreviousCell();
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.isAcross = true;
                this.moveInDirection(1, 0);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.isAcross = true;
                this.moveInDirection(-1, 0);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.isAcross = false;
                this.moveInDirection(0, 1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.isAcross = false;
                this.moveInDirection(0, -1);
                break;
            case 'Tab':
                e.preventDefault();
                this.isAcross = !this.isAcross;
                this.findCurrentWord(row, col);
                this.highlightCurrentWord();
                this.highlightCurrentClue();
                break;
        }
    }

    moveToNextCell() {
        if (!this.currentWord || !this.currentCell) return;
        
        const { startRow, startCol, answer } = this.currentWord;
        const direction = this.isAcross ? 'across' : 'down';
        const currentIndex = direction === 'across' 
            ? this.currentCell.col - startCol 
            : this.currentCell.row - startRow;
        
        if (currentIndex < answer.length - 1) {
            const nextRow = direction === 'across' ? startRow : startRow + currentIndex + 1;
            const nextCol = direction === 'across' ? startCol + currentIndex + 1 : startCol;
            this.selectCell(nextRow, nextCol);
        }
    }

    moveToPreviousCell() {
        if (!this.currentWord || !this.currentCell) return;
        
        const { startRow, startCol } = this.currentWord;
        const direction = this.isAcross ? 'across' : 'down';
        const currentIndex = direction === 'across' 
            ? this.currentCell.col - startCol 
            : this.currentCell.row - startRow;
        
        if (currentIndex > 0) {
            const prevRow = direction === 'across' ? startRow : startRow + currentIndex - 1;
            const prevCol = direction === 'across' ? startCol + currentIndex - 1 : startCol;
            this.selectCell(prevRow, prevCol);
        }
    }

    moveInDirection(deltaCol, deltaRow) {
        if (!this.currentCell) return;
        
        const newRow = this.currentCell.row + deltaRow;
        const newCol = this.currentCell.col + deltaCol;
        
        if (newRow >= 0 && newRow < this.currentPuzzle.size.rows && 
            newCol >= 0 && newCol < this.currentPuzzle.size.cols &&
            this.currentPuzzle.grid[newRow][newCol] !== '#') {
            this.selectCell(newRow, newCol);
        }
    }

    checkAnswers() {
        let correct = 0;
        let total = 0;
        
        // Clear previous styling
        document.querySelectorAll('.cell.correct, .cell.incorrect').forEach(cell => {
            cell.classList.remove('correct', 'incorrect');
        });
        
        for (let row = 0; row < this.currentPuzzle.size.rows; row++) {
            for (let col = 0; col < this.currentPuzzle.size.cols; col++) {
                if (this.currentPuzzle.grid[row][col] !== '#') {
                    total++;
                    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                    const userAnswer = this.userAnswers[row][col];
                    const correctAnswer = this.currentPuzzle.grid[row][col];
                    
                    if (userAnswer === correctAnswer) {
                        correct++;
                        cell.classList.add('correct');
                    } else if (userAnswer) {
                        cell.classList.add('incorrect');
                    }
                }
            }
        }
        
        const percentage = Math.round((correct / total) * 100);
        this.updateStatus(`${correct}/${total} correct (${percentage}%)`);
        
        if (correct === total) {
            this.gameCompleted = true;
            this.updateStatus('🎉 Congratulations! Puzzle completed!');
            document.querySelector('.crossword-grid').classList.add('celebration');
            setTimeout(() => {
                document.querySelector('.crossword-grid').classList.remove('celebration');
            }, 600);
        }
    }

    revealAnswers() {
        for (let row = 0; row < this.currentPuzzle.size.rows; row++) {
            for (let col = 0; col < this.currentPuzzle.size.cols; col++) {
                if (this.currentPuzzle.grid[row][col] !== '#') {
                    const input = document.querySelector(`input[data-row="${row}"][data-col="${col}"]`);
                    if (input) {
                        input.value = this.currentPuzzle.grid[row][col];
                        this.userAnswers[row][col] = this.currentPuzzle.grid[row][col];
                    }
                }
            }
        }
        this.updateStatus('All answers revealed!');
    }

    newGame() {
        this.clearHighlights();
        this.loadRandomPuzzle();
        this.renderGrid();
        this.renderClues();
        this.resetTimer();
        this.updateStatus('New puzzle loaded! Click on a numbered cell to start.');
        
        // Clear any answer styling
        document.querySelectorAll('.cell.correct, .cell.incorrect').forEach(cell => {
            cell.classList.remove('correct', 'incorrect');
        });
    }

    startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            const elapsed = Date.now() - this.startTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            document.getElementById('timer').textContent = 
                `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    resetTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        this.startTimer();
    }

    updateStatus(message = 'Click on a numbered cell to start!') {
        document.getElementById('gameStatus').textContent = message;
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CrosswordGame();
});