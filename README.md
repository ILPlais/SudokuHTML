# Sudoku HTML

An HTML/JS sudoku solver

![](https://tokei.rs/b1/github/ILPlais/SudokuHTML?category=code&style=flat)
![](https://tokei.rs/b1/github/ILPlais/SudokuHTML?category=files&style=flat)
![](https://tokei.rs/b1/github/ILPlais/SudokuHTML?showLanguage=true&languageRank=1&label=most%20used%20language&style=flat)
![](https://tokei.rs/b1/github/ILPlais/SudokuHTML?showLanguage=true&languageRank=2&label=2nd%20most%20used%20language&style=flat)
![](https://tokei.rs/b1/github/ILPlais/SudokuHTML?showLanguage=true&languageRank=3&label=3rd%20most%20used%20language&style=flat)

## How to use

1. Clone the repository
2. Open `index.html` in your browser

## How to play

Enter the numbers in the sudoku grid, then click on the “🧠 Resolve” button.

## How it works

The sudoku grid is a 9×9 grid of numbers. The numbers can be from 1 to 9. The grid is solved in two steps. First the empty cells are filled with the possible values. Then the grid is solved by the backtracking algorithm.

The algorithm works by trying to fill the grid with the numbers from 1 to 9. If a number is not valid, the algorithm tries the next number. If a number is valid, the algorithm fills the grid with the number. If the grid is full, the algorithm checks if the grid is valid. If the grid is valid, the algorithm returns the grid. If the grid is not valid, the algorithm returns false.

The algorithm is implemented in the `sudokusolver.js` file.

