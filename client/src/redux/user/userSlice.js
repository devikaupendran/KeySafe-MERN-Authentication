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
        },
        updateUserStart: (state) => {
            state.loading = true
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        signout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false
        }
    }
})

//exporting functions for action dispatch
export const { signInStart, signInSuccess, signInFailure,
    updateUserStart, updateUserFailure, updateUserSuccess,
    deleteUserStart, deleteUserSuccess, deleteUserFailure, signout } = userSlice.actions

//export reducer
export default userSlice.reducer