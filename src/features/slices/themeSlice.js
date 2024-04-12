import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    dark: true,
  },
  reducers: {
    toggleTheme: (state) => {
      state.dark = !state.dark;
    },
  },
});


export const { toggleTheme } = themeSlice.actions;
export const selectTheme = (state) => state.theme.dark;
export default themeSlice.reducer;