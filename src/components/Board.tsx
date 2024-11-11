import React from 'react'
import { useAppSelector } from '../store/hooks';
import Tile from './Tile';

function Board() {
  const board = useAppSelector(({ gemJam: { board } }) => board);
  const boardSize = useAppSelector(({ gemJam: { boardSize } }) => boardSize);

  return (
    <div 
      className='grid gap-0.5 rounded-lg'
      style={{
        gridTemplateColumns: `repeat(${boardSize}, 6.25rem)`, // Set dynamic columns based on boardSize
        width: `${6.25 * boardSize}rem`, // Set total width
      }}
    >
      {board.map((gem: string, index: number) => (
        <Tile gem={gem} key={index} gemId={index} />
      ))}
    </div>
  );
}

export default Board;
