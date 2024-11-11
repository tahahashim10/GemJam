import React from 'react'

function Tile({gem, gemId}:{gem:string, gemId:number}) {
  return (
    <div className='h-24 w-24 flex justify-center items-center m-0.5 rounded-lg select-none' 
    style={{
      boxShadow: "inset 5px 5px 15px #062525, inset -5px -5px 15px #aaaab7bb",
    }}
    >
      {
        gem && <img src={gem} alt='candy' className='h-20 w-20' gem-id={gemId} />
      }
    </div>
  )
}

export default Tile