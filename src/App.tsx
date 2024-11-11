import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { updateBoard } from './store';
import { createBoard } from './utils/createBoard';
import Board from './components/Board';

function App() {

  // if we want to initilize any reducer, then we need to dispatch it from the dispatch method
  const dispatch = useAppDispatch();

  // grab the board and boardsize from useappselector
  const board = useAppSelector(({gemJam:{board}}) => board);
  const boardSize = useAppSelector(({gemJam:{boardSize}}) => boardSize);

  useEffect(() => {
    dispatch(updateBoard(createBoard(boardSize)))
  }, [boardSize, dispatch]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Board />
    </div>
  );
}

export default App