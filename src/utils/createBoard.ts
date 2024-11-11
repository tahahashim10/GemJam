import { gems } from "./gemData";

export const createBoard = (boardSize:number=8) => 
    Array(boardSize*boardSize).fill(null).map(()=>gems[Math.floor(Math.random()*gems.length)])