import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { currentUser } from "../../services/auth";

export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async (id, thunkAPI) => {
        const response = await currentUser(id);
        thunkAPI.dispatch(loginUser(id))
        console.log(response.data)
        return response.data;
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        email: '',
        token: '',
        role: '',
        _id: 0,
        error: null,
    },
    reducers: {
        loginUser: (state, { payload }) => {
            state.token = payload;
            console.log(payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfo.rejected, (state, action) => {
                console.log(action.error)
                state.error = action.error;
            })
            .addCase(getUserInfo.fulfilled, (state, { payload }) => {
                console.log(payload)
                state.name = payload.name;
                state.email = payload.email;
                state.role = payload.role;
                state._id = payload._id;
            })
    }
})

export const {loginUser } = userSlice.actions;
export default userSlice.reducer;