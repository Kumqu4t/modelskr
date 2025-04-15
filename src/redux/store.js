import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import favoritesReducer from "./favorites/favoritesSlice";
import modelsReducer from "./models/modelsSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		favorites: favoritesReducer,
		models: modelsReducer,
	},
});

export default store;
