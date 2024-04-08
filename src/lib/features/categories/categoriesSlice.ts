import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CategorySliceState {
  data: Record<string, string>;
  status: "idle" | "loading" | "failed";
}

const initialState: CategorySliceState = {
  data: {},
  status: "idle",
};

export const categorySlice = createAppSlice({
  name: "category",
  initialState,
  reducers: (create) => ({
    setData: create.reducer(
      (state, action: PayloadAction<{ key: string; value: string }>) => {
        const { key, value } = action.payload;
        state.data = {
          ...state.data,
          [key]: value,
        };
      }
    ),
  }),
  selectors: {
    selectData: (category) => category.data,
  },
});

export const { setData } = categorySlice.actions;

export const { selectData } = categorySlice.selectors;
