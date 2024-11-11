import React from 'react'
import { useAppSelector } from '../store/hooks';
import Tile from './Tile';

function Board() {
  const board = useAppSelector(({gemJam:{board}}) => board);
  const boardSize = useAppSelector(({gemJam:{boardSize}}) => boardSize);

  return (
    <div className='flex flex-wrap rounded-lg' style={{
      width:'${6.25 * boardSize}rem',
    }}
    >
      {board.map((gem:string, index:number) => (
        <Tile gem={gem} key={index} gemId={index}/>
      ))}
    </div>
    );
  }

export default Board