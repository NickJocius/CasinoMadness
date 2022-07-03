import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { currentUser,createOrUpdateUser } from "../../services/auth";

export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async (id, thunkAPI) => {
        const response = await currentUser(id);
        thunkAPI.dispatch(loginUser(id))
        console.log(response.data)
        return response.data;
    }
)

export const newOrUpdateUser = createAsyncThunk(
    'user/createOrUpdate',
    async (token, thunkAPI) => {
        const response = await createOrUpdateUser(token);
        thunkAPI.dispatch(loginUser(token))
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
        },
        logout: (state) => {
            state.name = '';
            state.email = '';
            state.token = '';
            state.role = '';
            state._id = '';
            state.error = null;
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
            .addCase(newOrUpdateUser.fulfilled, (state, { payload }) => {
                console.log(payload)
                state.name = payload.name;
                state.email = payload.email;
                state.role = payload.role;
                state._id = payload._id;
            })
    }
})

export const {loginUser,logout } = userSlice.actions;
export default userSlice.reducer;