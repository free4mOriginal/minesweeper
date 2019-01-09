export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTilesRemaining = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  get bombBoard() {
    return this._bombBoard;
  }

  /* method sets a specified tile on the players board to a value of 'bomb' if it's a bomb,
  and if not sets the value to how many bomb tiles are adjacent to specified tile (flipped tile):  */
  flipTile(rowIndex, columnIndex) {
    if (this.playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has been flipped');
      return;
    } else if (this.bombBoard[rowIndex][columnIndex] === 'B') {
      this.playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTilesRemaining--;
  }

  // function that checks the number of bombs in the adjacent tiles (adjacent to specified tile indexes), and returns that number:

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];
    const numberOfRows = this.bombBoard.length;
    const numberOfColumns = this.bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
        neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this.bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

// functions that returns the result of evaluating the number of tiles
  hasSafeTiles() {
    return this._numberOfTilesRemaining !== this._numberOfBombs;
  }

// function that visually joins an array into a board:
  print() {
    console.log(this.playerBoard.map(row => row.join(' | ')).join('\n'));
  }

// functions that generates an empty player board:
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    const board = [];
    for (let i=0; i<numberOfRows; i++) {
      const row = [];
      for (let j=0; j<numberOfColumns; j++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

// function that randomly generates bomb positions (bomb board) for specified size of board and number of bombs requested, and returns a full board:
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
/* old version of board
    const board = [];
    for (let i=0; i<numberOfRows; i++) {
      const row = [];
      for (let j=0; j<numberOfColumns; j++) {
        row.push('null');
      }
      board.push(row);
    } */
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      const randomRowIndex = Math.floor(Math.random()*numberOfRows);
      const randomColumnIndex = Math.floor(Math.random()*numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B'){
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return board;
  }
}
