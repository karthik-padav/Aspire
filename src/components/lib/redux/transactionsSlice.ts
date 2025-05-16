import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ICardTransaction } from "../interface";

interface TransactionsState {
  loading: boolean;
  error: string | null;
  data: { [key: string]: ICardTransaction[] };
}

const initialState: TransactionsState = {
  loading: false,
  error: null,
  data: {},
};

// Simulate API call to fetch transactions for a card
export const fetchTransactionsByCardId = createAsyncThunk(
  "transactions/fetchByCardId",
  async (cardId: string) => {
    await new Promise((r) => setTimeout(r, 500)); // Simulate delay
    return {
      cardId,
      transactions: [
        {
          id: "1",
          title: "Hamleys",
          date: "20 May 2020",
          amount: 100,
          currency: "$",
          action: "CREDIT",
          transType: "FILE_STORAGE",
          description: "Refund on debit card",
        },
        {
          id: "2",
          title: "Hamleys",
          date: "20 May 2020",
          currency: "$",
          amount: 200,
          action: "DEBIT",
          transType: "FLIGHTS",
          description: "Charged to debit card",
        },
        {
          id: "3",
          title: "Hamleys",
          date: "20 May 2020",
          currency: "$",
          amount: 200,
          action: "DEBIT",
          transType: "MEGAPHONE",
          description: "Charged to debit card",
        },
        {
          id: "4",
          title: "Hamleys",
          date: "20 May 2020",
          currency: "$",
          amount: 200,
          action: "DEBIT",
          transType: "FILE_STORAGE",
          description: "Charged to debit card",
        },
      ],
    };
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsByCardId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionsByCardId.fulfilled, (state, action) => {
        const { cardId, transactions } = action.payload;
        state.loading = false;
        state.data[cardId] = transactions;
      })
      .addCase(fetchTransactionsByCardId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      });
  },
});

export default transactionsSlice.reducer;
