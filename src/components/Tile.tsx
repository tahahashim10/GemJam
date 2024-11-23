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
            dispatch(dragStart(e.target));
          }}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={(e) => dispatch(dragDrop(e.target))}
          onDragEnd={() => dispatch(dragEnd())}
        />
      )}
    </div>
  );
}

export default Tile;
