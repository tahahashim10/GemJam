export const formulaForColumnOfFour = (boardSize: number) =>
    boardSize * boardSize - (boardSize + boardSize + boardSize) - 1;

// subtract by 3 boardSize's because we want to skip 3 rows from the bottom since they cannot be matched with columns of 4
// subtract 1 because were indicing arrays from 0