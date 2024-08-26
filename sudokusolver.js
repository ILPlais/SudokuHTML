function generateSudokuGrid() {
	const grid = document.querySelector('.sudoku-grid');
	for (let y = 1; y <= 9; y++) {
		for (let x = 1; x <= 9; x++) {
			const cell = document.createElement('div');
			cell.className = 'cell';
			let numbersHtml = '<div class="cell-numbers">';
			for (let i = 1; i <= 9; i++) {
				numbersHtml += `<span id="cell_${x}_${y}_${i}">${i}</span>`;
			}
			numbersHtml += '</div>';
			cell.innerHTML = `
				${numbersHtml}
				<input type="number" min="1" max="9" id="cell_${x}_${y}">
			`;
			grid.appendChild(cell);
		}
	}
	addInputListeners();
}

function addInputListeners() {
	const inputs = document.querySelectorAll('.sudoku-grid input');
	inputs.forEach((input, index) => {
		input.addEventListener('input', function() {
			const value = this.value;
			const x = Math.floor(index / 9);
			const y = index % 9;
			highlightRelatedCells(x, y, value);
		});
	});
}

function highlightRelatedCells(x, y, value) {
	// Clear previous highlights
	document.querySelectorAll('.cell-numbers span').forEach(span => span.classList.remove('highlighted'));

	if (value) {
		// Highlight row
		for (let i = 1; i <= 9; i++) {
			highlightCell(i, y, value);
		}

		// Highlight column
		for (let i = 1; i <= 9; i++) {
			highlightCell(x, i, value);
		}

		// Highlight 3x3 block
		const blockStartX = Math.floor(x / 3) * 3;
		const blockStartY = Math.floor(y / 3) * 3;
		for (let i = blockStartX; i < blockStartX + 3; i++) {
			for (let j = blockStartY; j < blockStartY + 3; j++) {
				highlightCell(i, j, value);
			}
		}
	}
}

function highlightCell(x, y, value) {
	const span = document.getElementById(`cell_${x}_${y}_${value}`);
	if (span) {
		span.classList.add('highlighted');
	}
}

function resolveSudoku() {
	// Implement Sudoku solving logic here
	console.log('Resolve button clicked');
}

function clearSudoku() {
	const inputs = document.querySelectorAll('.sudoku-grid input');
	inputs.forEach(input => input.value = '');
	document.querySelectorAll('.cell-numbers span').forEach(span => span.classList.remove('highlighted'));
}

generateSudokuGrid();