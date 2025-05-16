import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { ICardDetails } from "../interface";
import { generateCardNumber, generateCVV, generateExpiryDate } from "../common";
import { v4 } from "uuid";

const dummyCards: ICardDetails[] = [
  {
    id: v4(),
    cardNumber: generateCardNumber(),
    cardHolder: "John Doe",
    expiryDate: generateExpiryDate(),
    cvv: generateCVV(),
    cardType: "VISA",
    status: "active",
  },
  {
    id: v4(),
    cardNumber: generateCardNumber(),
    cardHolder: "Alex Carter",
    expiryDate: generateExpiryDate(),
    cvv: generateCVV(),
    cardType: "VISA",
    status: "active",
  },
  {
    id: v4(),
    cardNumber: generateCardNumber(),
    cardHolder: "Daniel Brooks",
    expiryDate: generateExpiryDate(),
    cvv: generateCVV(),
    cardType: "VISA",
    status: "active",
  },
];

interface CardState {
  loading: boolean;
  error: string | null;
  data: ICardDetails[];
}

const initialState: CardState = {
  loading: false,
  error: null,
  data: [],
};

// Simulate API call to fetch cards
export const fetchCards = createAsyncThunk("cards/fetchCards", async () => {
  await new Promise((r) => setTimeout(r, 500)); // simulate delay
  return dummyCards;
});

export const updateCardById = createAsyncThunk(
  "cards/updateCardById",
  async (updatedCard: ICardDetails) => {
    await new Promise((r) => setTimeout(r, 300)); // simulate delay
    return updatedCard;
  }
);

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<ICardDetails>) {
      state.data = [action.payload, ...state.data];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(updateCardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCardById.fulfilled, (state, action) => {
        const updatedCard = action.payload;
        const index = state.data.findIndex(
          (card) => card.id === updatedCard.id
        );
        if (index !== -1)
          state.data[index] = { ...state.data[index], ...updatedCard };
      })
      .addCase(updateCardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      });
  },
});

export const { addCard } = cardSlice.actions;
export default cardSlice.reducer;
