import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { updateBoard } from './store';
import { createBoard } from './utils/createBoard';
import Board from './components/Board';
import { isColumnOfFour, isColumnOfThree } from './utils/moveCheckLogic';
import { formulaForColumnOfFour, formulaForColumnOfThree } from './utils/formulas';

function App() {

  // if we want to initilize any reducer, then we need to dispatch it from the dispatch method
  const dispatch = useAppDispatch();

  // grab the board and boardsize from useappselector
  const board = useAppSelector(({gemJam:{board}}) => board);
  const boardSize = useAppSelector(({gemJam:{boardSize}}) => boardSize);

  useEffect(() => {
    dispatch(updateBoard(createBoard(boardSize)))
  }, [boardSize, dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newBoard = [...board];
      // always check four before three, greedy approach to maximize popping
      isColumnOfFour(newBoard, boardSize, formulaForColumnOfFour(boardSize));
      isColumnOfThree(newBoard, boardSize, formulaForColumnOfThree(boardSize));
      dispatch(updateBoard(newBoard));
    }, 150);
    return () => clearInterval(timeout)
  }, [board, boardSize, dispatch]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Board />
    </div>
  );
}

export default App