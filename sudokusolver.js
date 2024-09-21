function generateSudokuGrid() {
	const grid = document.querySelector('.sudoku-grid');
	for (let row = 1; row <= 9; row++) {
		for (let col = 1; col <= 9; col++) {
			const cell = document.createElement('div');
			cell.className = 'cell';
			let numbersHtml = '<div class="cell-numbers">';
			for (let i = 1; i <= 9; i++) {
				numbersHtml += `<span id="cell_${row}_${col}_${i}">${i}</span>`;
			}
			numbersHtml += '</div>';
			cell.innerHTML = `
				${numbersHtml}
				<input type="number" min="1" max="9" id="cell_${row}_${col}">
			`;
			grid.appendChild(cell);
		}
	}
	addInputListeners();
}

function addInputListeners() {
	const inputs = document.querySelectorAll('.sudoku-grid input');
	inputs.forEach((input, index) => {
		input.addEventListener('input', function () {
			var errorCell = false;

			// Check if the input is a number between 1 and 9
			if (this.value < 1 || this.value > 9) {
				console.warn(`Invalid input: ${this.value}.`);
				this.value = '';
				errorCell = true;
			}

			// Get the cell position and value
			const row = Math.floor(index / 9) + 1;
			const col = index % 9 + 1;
			const value = this.value;

			// Check if the cell is valid
			if (!isValidCell(row, col, value)) {
				console.warn(`Invalid cell: ${this.id}.`);
				this.value = '';
				errorCell = true;
			}

			// Clear previous highlights
			document.querySelectorAll('.cell-numbers span').forEach(span => span.classList.remove('highlighted'));

			// Highlight current cell
			if (!errorCell) {
				highlightRelatedCells(row, col, value);
			}

			// Highlight other filled cells
			const allCells = document.querySelectorAll('.sudoku-grid input');
			allCells.forEach(cell => {
				if (cell.value) {
					const row = Math.floor(cell.id.split('_')[1]);
					const col = Math.floor(cell.id.split('_')[2]);
					const value = cell.value;
					highlightRelatedCells(row, col, value);
				}
			});
		});
	});
}

function highlightRelatedCells(row, col, value) {
	if (value) {
		// Highlight the cell
		for (let i = 1; i <= 9; i++) {
			highlightCell(row, col, i);
		}

		// Highlight row
		for (let i = 1; i <= 9; i++) {
			highlightCell(row, i, value);
		}

		// Highlight column
		for (let i = 1; i <= 9; i++) {
			highlightCell(i, col, value);
		}

		// Highlight 3×3 block
		const blockStartRow = Math.floor((row - 1) / 3) * 3 + 1;
		const blockStartCol = Math.floor((col - 1) / 3) * 3 + 1;
		for (let row = blockStartRow; row < blockStartRow + 3; row++) {
			for (let col = blockStartCol; col < blockStartCol + 3; col++) {
				highlightCell(row, col, value);
			}
		}
	}
}

function highlightCell(row, col, value) {
	const span = document.getElementById(`cell_${row}_${col}_${value}`);
	if (span) {
		span.classList.add('highlighted');
	}
}

function resolveSudoku() {
	// Implement Sudoku solving logic here
	console.log('Resolve button clicked.');

	// First step is to check if the grid is valid
	if (isValidGrid()) {
		console.log('Grid is valid.');
	} else {
		console.warn('Grid is not valid.');
	}

	// Second step: fill the cells with obvious values
	var cellsFilled = true;

	while (cellsFilled) {
		cellsFilled = false;

		// Check if there are any cells that can be filled
		for (let row = 1; row <= 9; row++) {
			for (let col = 1; col <= 9; col++) {
				if (!document.getElementById(`cell_${row}_${col}`).value) {
					// Get the cell possible values
					const possibleValues = getCellPossibleValues(row, col);

					// If there is only one possible value, fill the cell
					if (possibleValues.length === 1) {
						document.getElementById(`cell_${row}_${col}`).value = possibleValues[0];
						highlightRelatedCells(row, col, possibleValues[0]);
						cellsFilled = true;
					}
				}
			}
		}
	}

	// Third step: use the backtracking algorithm to solve the rest of the grid

	// Get the grid from the document
	var grid = [];

	for (let row = 1; row <= 9; row++) {
		grid[row - 1] = [];
		for (let col = 1; col <= 9; col++) {
			grid[row - 1][col - 1] = parseInt(document.getElementById(`cell_${row}_${col}`).value) || 0;
		}
	}

	// Solve the grid using the backtracking algorithm
	if (backtrackSolveSudoku(grid, 0, 0)) {
		// Fill the grid with the solved grid
		fillGrid(grid);

		setTimeout(function () {
			alert('\u{1F92F} Sudoku solved.');
		}, 100);
	} else {
		// No solution found
		alert('\u{1F62D}No solution found.');
	}
}

function backtrackSolveSudoku(grid, row, col) {
	// Backtracking algorithm to solve the grid

	while (grid[row][col] !== 0) {
		if (col < 8) {
			col++;
		} else if (col === 8 && row < 8) {
			row++;
			col = 0;
		} else {
			return true;
		}
	}

	for (let i = 1; i <= 9; i++) {
		if (isValidCell(row + 1, col + 1, i, grid)) {
			grid[row][col] = i;
			if (backtrackSolveSudoku(grid, row, col)) {
				return true;
			}
			grid[row][col] = 0;
		}
	}

	return false;
}

function isValidGrid() {
	// Check if the grid is valid
	for (let row = 1; row <= 9; row++) {
		for (let col = 1; col <= 9; col++) {
			if (!isValidCell(row, col, document.getElementById(`cell_${row}_${col}`).value)) {
				return false;
			}
		}
	}

	// All cells are valid, the grid is valid
	return true;
}

function isValidCell(row, col, value, grid) {
	// Check if the cell is valid

	// If the cell is empty, it is valid
	if (value === '') {
		return true;
	}

	// Check if the number is already in the row
	for (let i = 1; i <= 9; i++) {
		if (grid) {
			if (i !== row && grid[i - 1][col - 1] === value) {
				return false;
			}
		} else {
			if (i !== row && document.getElementById(`cell_${i}_${col}`).value == value) {
				return false;
			}
		}
	}

	// Check if the number is already in the column
	for (let i = 1; i <= 9; i++) {
		if (grid) {
			if (i !== col && grid[row - 1][i - 1] === value) {
				return false;
			}
		} else {
			if (i !== col && document.getElementById(`cell_${row}_${i}`).value == value) {
				return false;
			}
		}
	}

	// Check if the number is already in the 3×3 block
	const blockStartRow = Math.floor((row - 1) / 3) * 3 + 1;
	const blockStartCol = Math.floor((col - 1) / 3) * 3 + 1;
	for (let i = blockStartRow; i < blockStartRow + 3; i++) {
		for (let j = blockStartCol; j < blockStartCol + 3; j++) {
			if (grid) {
				if (i !== row && j !== col && grid[i - 1][j - 1] === value) {
					return false;
				}
			} else {
				if (i !== row && j !== col && document.getElementById(`cell_${i}_${j}`).value == value) {
					return false;
				}
			}
		}
	}

	// All checks passed, the cell is valid
	return true;
}

function getCellPossibleValues(row, col, grid) {
	// Get the cell possible values
	const possibleValues = [];
	for (let i = 1; i <= 9; i++) {
		if (isValidCell(row, col, i, grid)) {
			possibleValues.push(i);
		}
	}

	// Return the possible values
	return possibleValues;
}

function clearSudoku() {
	// Clear the grid
	const inputs = document.querySelectorAll('.sudoku-grid input');
	inputs.forEach(input => input.value = '');
	document.querySelectorAll('.cell-numbers span').forEach(span => span.classList.remove('highlighted'));
}

function fillGrid(grid) {
	// Clear the grid
	clearSudoku();

	// Fills the grid with the array
	for (let row = 1; row <= 9; row++) {
		for (let col = 1; col <= 9; col++) {
			if (grid[row - 1][col - 1] !== 0) {
				document.getElementById(`cell_${row}_${col}`).value = grid[row - 1][col - 1];
				highlightRelatedCells(row, col, grid[row - 1][col - 1]);
			}
		}
	}
}

generateSudokuGrid();