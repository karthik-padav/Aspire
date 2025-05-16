import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./cardsSlice";
import transactionsReducer from "./transactionsSlice";
import commonReducer from "./commonSlice";

export const store = configureStore({
  reducer: {
    cards: cardReducer,
    transactions: transactionsReducer,
    commonSlice: commonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
