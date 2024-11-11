import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { updateBoard } from './store';
import { createBoard } from './utils/createBoard';

function App() {

  // if we want to initilize any reducer, then we need to dispatch it from the dispatch method
  const dispatch = useAppDispatch();

  // grab the board and boardsize from useappselector
  const board = useAppSelector(({gemJam:{board}}) => board);
  const boardSize = useAppSelector(({gemJam:{boardSize}}) => boardSize);

  useEffect(() => {
    console.log(createBoard(boardSize));
  }, []);

  return (
    <div>App</div>
  )
}

export default App