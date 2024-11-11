// subtract by 3 boardSize's because we want to skip 3 rows from the bottom since they cannot be matched with columns of 4
// subtract 1 because were indicing arrays from 0

export const formulaForColumnOfFour = (boardSize: number) =>
    boardSize * boardSize - (boardSize + boardSize + boardSize) - 1;

// same logic
export const formulaForColumnOfThree = (boardSize: number) =>
    boardSize * boardSize - (boardSize + boardSize) - 1;

export const formulaForMoveBelow = (boardSize: number) =>
    boardSize * boardSize - boardSize -1;

// generate invalidmoves for row of 4 and 3
export const generateInvalidMoves = (
    boardSize: number,
    isFour: boolean = false
) => {
    const invalidMoves: Array<number> = [];
    for (let i: number = boardSize; i <= boardSize * boardSize; i += boardSize) {
        if (isFour) invalidMoves.push(i-3);
        invalidMoves.push(i-2);
        invalidMoves.push(i-1);
    }
    return invalidMoves;
};

