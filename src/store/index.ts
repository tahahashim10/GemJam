import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { moveBelowReducer } from "./reducers/moveBelow";
import { dragEndReducer } from "./reducers/dragEnd"; // Import dragEndReducer

// Define the initial state for the Redux slice
const initialState: {
  board: string[];
  boardSize: number;
  squareBeingDragged: Element | undefined;
  squareBeingReplaced: Element | undefined;
  score: number;
} = {
  board: [],
  boardSize: 8,
  squareBeingDragged: undefined,
  squareBeingReplaced: undefined,
  score: 0,
};

// Create the Redux slice
const gemJamSlice = createSlice({
  name: "gemJam",
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
    dragEnd: dragEndReducer, // Use dragEndReducer here
    moveBelow: moveBelowReducer,
  },
});

// Create the Redux store
export const store = configureStore({
  reducer: {
    gemJam: gemJamSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks for Elements in state
    }),
});

// Export actions and types for usage in the app
export const { updateBoard, moveBelow, dragDrop, dragEnd, dragStart } =
  gemJamSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
