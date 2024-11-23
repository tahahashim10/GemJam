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

  if (!squareBeingDragged || !squareBeingReplaced) {
    return; // Exit early if drag or drop elements are undefined
  }

  // Get IDs of the dragged and replaced squares
  const squareBeingDraggedId = parseInt(
    squareBeingDragged?.getAttribute("gem-id") || "-1"
  );
  const squareBeingReplacedId = parseInt(
    squareBeingReplaced?.getAttribute("gem-id") || "-1"
  );

  // Swap the gems on the board
  const draggedGem = squareBeingDragged?.getAttribute("src");
  const replacedGem = squareBeingReplaced?.getAttribute("src");

  newBoard[squareBeingReplacedId] = draggedGem || "";
  newBoard[squareBeingDraggedId] = replacedGem || "";

  // Calculate valid moves (left, right, up, down)
  const validMoves = [
    squareBeingDraggedId - 1, // Left
    squareBeingDraggedId + 1, // Right
    squareBeingDraggedId - boardSize, // Up
    squareBeingDraggedId + boardSize, // Down
  ];

  const validMove = validMoves.includes(squareBeingReplacedId);

  // Check for matches after the move
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

  if (
    validMove &&
    (isAColumnOfThree || isARowOfThree || isAColumnOfFour || isARowOfFour)
  ) {
    if (isAColumnOfThree || isARowOfThree) state.score += 10;
    if (isAColumnOfFour || isARowOfFour) state.score += 20;

    // Play the drop sound for valid moves
    dropAudio.play();

    // Clear dragged and replaced squares
    state.squareBeingDragged = undefined;
    state.squareBeingReplaced = undefined;
  } else {
    // Revert the move if invalid
    newBoard[squareBeingReplacedId] = replacedGem || "";
    newBoard[squareBeingDraggedId] = draggedGem || "";
  }

  // Update the board state
  state.board = newBoard;
};
