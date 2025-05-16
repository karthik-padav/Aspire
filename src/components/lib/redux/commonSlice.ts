import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICardDetails } from "../interface";

interface CommonState {
  currentCard: ICardDetails | null;
}

const initialState: CommonState = {
  currentCard: null,
};

const commonSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCurrectCard(state, action: PayloadAction<ICardDetails | null>) {
      state.currentCard = action.payload;
    },
  },
});

export const { setCurrectCard } = commonSlice.actions;
export default commonSlice.reducer;
