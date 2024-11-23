import React, { useState } from "react";
import { dragDrop, dragEnd, dragStart } from "../store";
import { useAppDispatch } from "../store/hooks";
import dragSound from "../assets/sounds/dragSound.mp3";

const dragAudio = new Audio(dragSound);

function Tile({ gem, gemId }: { gem: string; gemId: number }) {
  const dispatch = useAppDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    dragAudio.play();
    setIsDragging(true);
    dispatch(dragStart(e.target));
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    dispatch(dragEnd());
  };

  const handleDragEnter = () => {
    setIsHovered(true);
  };

  const handleDragLeave = () => {
    setIsHovered(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLImageElement>) => {
    setIsHovered(false);
    dispatch(dragDrop(e.target));
  };

  return (
    <div
      className={`h-24 w-24 flex justify-center items-center m-0.5 rounded-lg select-none ${
        isHovered ? "highlight" : ""
      }`}
      style={{
        boxShadow: "inset 5px 5px 15px #062525, inset -5px -5px 15px #aaaab7bb",
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {gem && (
        <img
          src={gem}
          alt=""
          className={`h-20 w-20 ${isDragging ? "dragging" : ""}`}
          gem-id={gemId}
          draggable={true}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      )}
    </div>
  );
}

export default Tile;
