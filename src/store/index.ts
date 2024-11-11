import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { moveBelowReducer } from "./reducers/moveBelow";
import { dragEndReducer } from "./reducers/dragEnd";

const initialState : {
    board:string[];
    boardSize:number;
    squareBeingDragged: Element | undefined;
    squareBeingReplaced: Element | undefined;
} = {
    board:[], 
    boardSize: 8,
    squareBeingDragged: undefined,
    squareBeingReplaced: undefined,
};

const gemJamSlice = createSlice({
    name:"gemJam",
    initialState,
    reducers: {
        updateBoard: (state, action: PayloadAction<string[]>) => {
            state.board = action.payload;
        },
        dragStart: (state, action: PayloadAction<any>) => {
            state.squareBeingDragged = action.payload;
        },
        dragDrop: (state, action: PayloadAction<any>) => {
            state.squareBeingReplaced = action.payload;
        },
        dragEnd: dragEndReducer,
        moveBelow: moveBelowReducer,
    },
})

export const store = configureStore({
    reducer:{
        gemJam:gemJamSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const {updateBoard, moveBelow, dragDrop, dragEnd, dragStart} = gemJamSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
