import React, { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";

function ScoreBoard() {
  const score = useAppSelector(({ gemJam: { score } }) => score);
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger animation when the score changes
  useEffect(() => {
    if (score > 0) {
      setIsAnimating(true);
      const timeout = setTimeout(() => setIsAnimating(false), 1000); // Animation duration
      return () => clearTimeout(timeout);
    }
  }, [score]);

  return (
    <div
      className={`fixed top-4 left-4 flex items-center justify-center p-4 rounded-full shadow-lg bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 ${
        isAnimating ? "score-animate" : ""
      }`}
      style={{
        width: "150px",
        height: "150px",
        border: "5px solid rgba(255, 255, 255, 0.7)",
        boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)",
      }}
    >
      <h2
        className="text-center text-white text-3xl font-bold"
        style={{
          textShadow: "0px 0px 8px rgba(255, 255, 255, 0.9), 0px 0px 15px #ff007f",
        }}
      >
        Score: {score}
      </h2>
    </div>
  );
}

export default ScoreBoard;
