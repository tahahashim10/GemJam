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
  const { boardSize, squareBeingDragged, squareBeingReplaced } = state;

  if (!squareBeingDragged || !squareBeingReplaced) return;

  const squareBeingDraggedId = parseInt(
    squareBeingDragged?.getAttribute("gem-id") || "-1"
  );
  const squareBeingReplacedId = parseInt(
    squareBeingReplaced?.getAttribute("gem-id") || "-1"
  );

  const draggedGem = squareBeingDragged?.getAttribute("src");
  const replacedGem = squareBeingReplaced?.getAttribute("src");

  newBoard[squareBeingReplacedId] = draggedGem || "";
  newBoard[squareBeingDraggedId] = replacedGem || "";

  const validMoves = [
    squareBeingDraggedId - 1,
    squareBeingDraggedId + 1,
    squareBeingDraggedId - boardSize,
    squareBeingDraggedId + boardSize,
  ];

  const validMove = validMoves.includes(squareBeingReplacedId);

  const isAColumnOfFour = isColumnOfFour(
    newBoard,
    boardSize,
    formulaForColumnOfFour(boardSize)
  );
  const isARowOfFour = checkForRowOfFour(
    newBoard,
    boardSize,
    generateInvalidMoves(boardSize, true)
  );
  const isAColumnOfThree = isColumnOfThree(
    newBoard,
    boardSize,
    formulaForColumnOfThree(boardSize)
  );
  const isARowOfThree = checkForRowOfThree(
    newBoard,
    boardSize,
    generateInvalidMoves(boardSize)
  );

  if (validMove && (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)) {
    if (isAColumnOfThree || isARowOfThree) state.score += 10;
    if (isAColumnOfFour || isARowOfFour) state.score += 20;

    dropAudio.play();
  } else {
    newBoard[squareBeingDraggedId] = draggedGem || "";
    newBoard[squareBeingReplacedId] = replacedGem || "";
  }

  state.board = newBoard;
  state.squareBeingDragged = undefined;
  state.squareBeingReplaced = undefined;
};
