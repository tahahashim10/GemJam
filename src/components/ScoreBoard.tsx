import React from "react";
import { useAppSelector } from "../store/hooks";

function ScoreBoard() {
  const score = useAppSelector(({ gemJam: { score } }) => score);

  return (
    <div className="fixed top-4 left-4 bg-white p-4 rounded shadow-lg">
      <h2 className="text-2xl font-bold">Score: {score}</h2>
    </div>
  );
}

export default ScoreBoard;
