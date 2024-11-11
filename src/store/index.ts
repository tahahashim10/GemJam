import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

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
    },
})

export const store = configureStore({
    reducer:{
        gemJam:gemJamSlice.reducer,
    },
});

export const {updateBoard} = gemJamSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
