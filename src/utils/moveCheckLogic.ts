export const isColumnOfFour = (
    newBoard: string[],
    boardSize: number,
    formulaForColumnOfFour: number
) => {
    for (let i: number = 0; i <= formulaForColumnOfFour; i++) {
        const columnOfFour: number[] = [
            i,
            i + boardSize,
            i + boardSize * 2,
            i + boardSize * 3,
        ];
        const decidedColor:string = newBoard[i];
        const isBlank:boolean = newBoard[i] === "";

        // check if gems are the same and are not blank, if true make the new tile blank
        if(columnOfFour.every((gem:number) => newBoard[gem] === decidedColor && !isBlank)) {
            columnOfFour.forEach((gem:number) => newBoard[gem] ="");
            return true;
        }
    }
};

export const isColumnOfThree = (
    newBoard: string[],
    boardSize: number,
    formulaForColumnOfThree: number
) => {
    for (let i: number = 0; i <= formulaForColumnOfThree; i++) {
        const columnOfThree: number[] = [
            i,
            i + boardSize,
            i + boardSize * 2,
        ];
        const decidedColor:string = newBoard[i];
        const isBlank:boolean = newBoard[i] === "";

        // check if gems are the same and are not blank, if true make the new tile blank
        if(columnOfThree.every((gem:number) => newBoard[gem] === decidedColor && !isBlank)) {
            columnOfThree.forEach((gem:number) => newBoard[gem] ="");
            return true;
        }
    }
};