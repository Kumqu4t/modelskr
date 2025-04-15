import { createSlice } from "@reduxjs/toolkit";
import modelsData from "../../mock/models.json";

const modelsSlice = createSlice({
	name: "models",
	initialState: {
		models: modelsData, // 초기 모델 데이터
	},
	reducers: {
		// 모델 추가
		addModel(state, action) {
			state.models.push(action.payload);
		},
		// 모델 수정
		updateModel(state, action) {
			const index = state.models.findIndex(
				(model) => model.id === action.payload.id
			);
			if (index !== -1) {
				state.models[index] = action.payload;
			}
		},
		// 모델 삭제
		deleteModel(state, action) {
			state.models = state.models.filter(
				(model) => model.id !== action.payload
			);
		},
	},
});

export const { addModel, updateModel, deleteModel } = modelsSlice.actions;
export default modelsSlice.reducer;
