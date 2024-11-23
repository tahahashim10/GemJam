import React from "react";
import { dragDrop, dragEnd, dragStart } from "../store";
import { useAppDispatch } from "../store/hooks";
import dragSound from "../assets/sounds/dragSound.mp3";

const dragAudio = new Audio(dragSound);

function Tile({ gem, gemId }: { gem: string; gemId: number }) {
  const dispatch = useAppDispatch();

  return (
    <div
      className="h-24 w-24 flex justify-center items-center m-0.5 rounded-lg select-none"
      style={{
        boxShadow: "inset 5px 5px 15px #062525, inset -5px -5px 15px #aaaab7bb",
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        e.currentTarget.classList.add("hover-highlight");
      }}
      onDragLeave={(e) => {
        e.currentTarget.classList.remove("hover-highlight");
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.currentTarget.classList.remove("hover-highlight");
        dispatch(dragDrop(e.target));
      }}
    >
      {gem && (
        <img
          src={gem}
          alt=""
          className="h-20 w-20"
          gem-id={gemId}
          draggable={true}
          onDragStart={(e) => {
            dragAudio.play();
            e.currentTarget.classList.add("dragging-highlight");
            dispatch(dragStart(e.target));
          }}
          onDragEnd={(e) => {
            e.currentTarget.classList.remove("dragging-highlight");
            dispatch(dragEnd());
          }}
          onDragOver={(e) => e.preventDefault()}
        />
      )}
    </div>
  );
}

export default Tile;
