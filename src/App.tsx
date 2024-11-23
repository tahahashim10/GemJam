import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { moveBelow, updateBoard } from "./store";
import { createBoard } from "./utils/createBoard";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import {
  checkForRowOfFour,
  checkForRowOfThree,
  isColumnOfFour,
  isColumnOfThree,
} from "./utils/moveCheckLogic";
import {
  formulaForColumnOfFour,
  formulaForColumnOfThree,
  generateInvalidMoves,
} from "./utils/formulas";

function App() {
  const dispatch = useAppDispatch();
  const board = useAppSelector(({ gemJam: { board } }) => board);
  const boardSize = useAppSelector(({ gemJam: { boardSize } }) => boardSize);

  // Initialize the board when the component mounts
  useEffect(() => {
    dispatch(updateBoard(createBoard(boardSize)));
  }, [boardSize, dispatch]);

  // Game loop to handle matches and falling gems
  useEffect(() => {
    const timeout = setTimeout(() => {
      const newBoard = [...board];

      // Check for matches
      const hasMatches =
        isColumnOfFour(newBoard, boardSize, formulaForColumnOfFour(boardSize)) ||
        checkForRowOfFour(
          newBoard,
          boardSize,
          generateInvalidMoves(boardSize, true)
        ) ||
        isColumnOfThree(newBoard, boardSize, formulaForColumnOfThree(boardSize)) ||
        checkForRowOfThree(newBoard, boardSize, generateInvalidMoves(boardSize));

      if (hasMatches) {
        dispatch(updateBoard(newBoard));
        dispatch(moveBelow());
      }
    }, 150);

    return () => clearTimeout(timeout);
  }, [board, boardSize, dispatch]);

  return (
    <div className="flex items-center justify-center h-screen">
      <ScoreBoard />
      <Board />
    </div>
  );
}

export default App;
