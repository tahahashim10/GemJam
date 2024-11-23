import { WritableDraft } from "immer";
import { formulaForMoveBelow } from "../../utils/formulas";
import { gems } from "../../utils/gemData";

export const moveBelowReducer = (
  state: WritableDraft<{
    board: string[];
    boardSize: number;
    squareBeingReplaced: Element | undefined;
    squareBeingDragged: Element | undefined;
  }>
) => {
  const newBoard = [...state.board];
  const { boardSize } = state;

  const formulaForMove = formulaForMoveBelow(boardSize);

  for (let i = 0; i <= formulaForMove; i++) {
    const firstRow = Array(boardSize)
      .fill(null)
      .map((_, index) => index);

    if (firstRow.includes(i) && newBoard[i] === "") {
      newBoard[i] = gems[Math.floor(Math.random() * gems.length)];
    }

    if (newBoard[i + boardSize] === "") {
      newBoard[i + boardSize] = newBoard[i];
      newBoard[i] = "";
    }
  }

  state.board = newBoard;
};
