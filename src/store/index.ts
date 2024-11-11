import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { moveBelowReducer } from "./reducers/moveBelow";

const initialState : {
    board:string[];
    boardSize:number;
} = {
    board:[], 
    boardSize: 8,
};

const gemJamSlice = createSlice({
    name:"gemJam",
    initialState,
    reducers: {
        updateBoard: (state, action: PayloadAction<string[]>) => {
            state.board = action.payload;
        },
        moveBelow: moveBelowReducer,
    },
})

export const store = configureStore({
    reducer:{
        gemJam:gemJamSlice.reducer,
    },
});

export const {updateBoard, moveBelow} = gemJamSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
