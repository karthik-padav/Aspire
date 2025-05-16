import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
  currentCard: string | null;
}

const initialState: CommonState = {
  currentCard: null,
};

const commonSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCurrectCard(state, action: PayloadAction<string | null>) {
      state.currentCard = action.payload;
    },
  },
});

export const { setCurrectCard } = commonSlice.actions;
export default commonSlice.reducer;
