import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: JSON.parse(localStorage.getItem("favorites")) || [],
};

const favoritesSlice = createSlice({
	name: "favorites",
	initialState,
	reducers: {
		toggleFavorite(state, action) {
			const id = action.payload;
			if (state.items.includes(id)) {
				state.items = state.items.filter((favId) => favId !== id);
			} else {
				state.items.push(id);
			}
			localStorage.setItem("favorites", JSON.stringify(state.items));
			console.log("dispatch됨", id);
		},
	},
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
