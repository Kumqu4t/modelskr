import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import favoritesReducer from "./favorites/favoritesSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		favorites: favoritesReducer,
	},
});

export default store;
