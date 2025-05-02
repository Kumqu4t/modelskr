import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoggedIn: null,
	user: null,
	isLoading: true,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login(state, action) {
			state.isLoggedIn = true;
			state.user = action.payload;
			state.isLoading = false;
		},
		logout(state) {
			state.isLoggedIn = false;
			state.user = null;
			state.isLoading = false;
		},
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
