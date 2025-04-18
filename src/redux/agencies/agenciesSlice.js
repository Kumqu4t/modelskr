import { createSlice } from "@reduxjs/toolkit";
import AgencyData from "../../mock/agencies.json";

const agenciesSlice = createSlice({
	name: "agencies",
	initialState: {
		agencies: AgencyData,
	},
	reducers: {
		// 에이전시 추가
		addAgency(state, action) {
			const newAgency = { ...action.payload, id: Date.now() };
			state.agencies.push(newAgency);
		},
		// 에이전시 수정
		updateAgency(state, action) {
			const index = state.agencies.findIndex(
				(agency) => agency.id === action.payload.id
			);
			if (index !== -1) {
				state.agencies[index] = action.payload;
			}
		},
		// 에이전시 삭제
		deleteAgency(state, action) {
			state.agencies = state.agencies.filter(
				(agency) => agency.id !== action.payload
			);
		},
	},
});

export const { addAgency, updateAgency, deleteAgency } = agenciesSlice.actions;
export default agenciesSlice.reducer;
