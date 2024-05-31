import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	_id: JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user"))._id || null,
	email: JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).email || null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state._id = action.payload._id;
			state.email = action.payload.email;
			localStorage.setItem("user", JSON.stringify(action.payload));
		},
		setToken: (state, action) => {
			state.token = action.token;
		},
		// eslint-disable-next-line no-unused-vars
		logout: (state, action) => {
			state._id = "";
			state.email = "";
			localStorage.removeItem("user");
		},
	},
});

export const { setUser, setToken, logout } = userSlice.actions;

export default userSlice.reducer;
