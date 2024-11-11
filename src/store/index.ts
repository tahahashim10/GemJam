import { configureStore, createSlice } from "@reduxjs/toolkit";

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

    }
})

export const store = configureStore({
    reducer:{
        gemJam:gemJamSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
