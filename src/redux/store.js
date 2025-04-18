import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import favoritesReducer from "./favorites/favoritesSlice";
import modelsReducer from "./models/modelsSlice";
import agenciesReducer from "./agencies/agenciesSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		favorites: favoritesReducer,
		models: modelsReducer,
		agencies: agenciesReducer,
	},
});

export default store;
