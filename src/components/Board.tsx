import React from "react";
import { useAppSelector } from "../store/hooks";
import Tile from "./Tile";

function Board() {
  const board = useAppSelector(({ gemJam: { board } }) => board);
  const boardSize = useAppSelector(({ gemJam: { boardSize } }) => boardSize);

  return (
    <div
      className="flex items-center justify-center mx-auto"
      style={{
        padding: "10px",
        borderRadius: "20px",
        background: "rgba(255, 255, 255, 0.2)",
        boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.6)",
      }}
    >
      <div
        className="grid gap-0.5 rounded-lg"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, 6.25rem)`,
          width: `${6.25 * boardSize}rem`,
        }}
      >
        {board.map((gem: string, index: number) => (
          <Tile gem={gem} key={index} gemId={index} />
        ))}
      </div>
    </div>
  );
}

export default Board;
