import { WritableDraft } from "immer";
import {
  formulaForColumnOfFour,
  formulaForColumnOfThree,
  generateInvalidMoves,
} from "../../utils/formulas";
import {
  isColumnOfThree,
  checkForRowOfFour,
  checkForRowOfThree,
  isColumnOfFour,
} from "../../utils/moveCheckLogic";
import dropSound from "../../assets/sounds/dropSound.mp3";

const dropAudio = new Audio(dropSound);

export const dragEndReducer = (
  state: WritableDraft<{
    board: string[];
    boardSize: number;
    squareBeingReplaced: Element | undefined;
    squareBeingDragged: Element | undefined;
    score: number;
  }>
) => {
  const newBoard = [...state.board];
  let { boardSize, squareBeingDragged, squareBeingReplaced } = state;

  const squareBeingDraggedId: number = parseInt(
    squareBeingDragged?.getAttribute("gem-id") as string
  );
  const squareBeingReplacedId: number = parseInt(
    squareBeingReplaced?.getAttribute("gem-id") as string
  );

  newBoard[squareBeingReplacedId] = squareBeingDragged?.getAttribute(
    "src"
  ) as string;
  newBoard[squareBeingDraggedId] = squareBeingReplaced?.getAttribute(
    "src"
  ) as string;

  const validMoves: number[] = [
    squareBeingDraggedId - 1,
    squareBeingDraggedId - boardSize,
    squareBeingDraggedId + 1,
    squareBeingDraggedId + boardSize,
  ];

  const validMove: boolean = validMoves.includes(squareBeingReplacedId);

  const isAColumnOfFour: boolean | undefined = isColumnOfFour(
    newBoard,
    boardSize,
    formulaForColumnOfFour(boardSize)
  );
  const isARowOfFour: boolean | undefined = checkForRowOfFour(
    newBoard,
    boardSize,
    generateInvalidMoves(boardSize, true)
  );
  const isAColumnOfThree: boolean | undefined = isColumnOfThree(
    newBoard,
    boardSize,
    formulaForColumnOfThree(boardSize)
  );
  const isARowOfThree: boolean | undefined = checkForRowOfThree(
    newBoard,
    boardSize,
    generateInvalidMoves(boardSize)
  );

  if (
    squareBeingReplacedId &&
    validMove &&
    (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
  ) {
    if (isARowOfThree || isAColumnOfThree) state.score += 10;
    if (isARowOfFour || isAColumnOfFour) state.score += 20;

    dropAudio.play();

    squareBeingDragged = undefined;
    squareBeingReplaced = undefined;
  } else {
    newBoard[squareBeingReplacedId] = squareBeingReplaced?.getAttribute(
      "src"
    ) as string;
    newBoard[squareBeingDraggedId] = squareBeingDragged?.getAttribute(
      "src"
    ) as string;
  }

  state.board = newBoard;
};
