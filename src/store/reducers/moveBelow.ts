import { WritableDraft } from "immer";
import { gems } from "../../utils/gemData";
import { formulaForMoveBelow } from "../../utils/formulas";

export const moveBelowReducer = (
  state: WritableDraft<{
    board: string[];
    boardSize: number;
    squareBeingReplaced: Element | undefined;
    squareBeingDragged: Element | undefined;
    score: number;
  }>
) => {
  const newBoard = [...state.board];
  const { boardSize } = state;

  for (let i = 0; i < formulaForMoveBelow(boardSize); i++) {
    const firstRow = Array(boardSize)
      .fill(null)
      .map((_, index) => index);

    // Handle the first row (generate new gems for empty spaces)
    if (firstRow.includes(i) && newBoard[i] === "") {
      const randomGem = gems[Math.floor(Math.random() * gems.length)];
      newBoard[i] = randomGem;
    }

    // Move gems down if there's an empty space below
    if (newBoard[i + boardSize] === "") {
      newBoard[i + boardSize] = newBoard[i];
      newBoard[i] = "";
    }
  }

  state.board = newBoard;
};
