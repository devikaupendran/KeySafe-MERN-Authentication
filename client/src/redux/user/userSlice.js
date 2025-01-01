import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false
};

//Create slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },

        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false
        },
        signInFailure: (state, action) => {
            state.loading = false,
            state.error = action.payload
        }
    }
})

//exporting functions for action dispatch
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions

//export reducer
export default userSlice.reducer