import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile, updateProfile, createOrUpdateProfile } from "../../services/profile";

export const getUsersProfile = createAsyncThunk(
    'profile/getUsersProfile',
    async (thunkObj, thunkAPI) => {
        const { id, token } = thunkObj;
        const response = await getUserProfile(id,token);
        //thunkAPI.dispatch(loginUser(id))
        console.log(response.data)
        return response.data;
    }
)

export const updateUserProfile = createAsyncThunk(
    'profile/updateProfile',
    async (thunkObj, thunkAPI) => {
        const response = await updateProfile(thunkObj);
        console.log(response)
        return response.data;
    }
)

export const createUserProfile = createAsyncThunk(
    'profile/createProfile',
    async (thunkObj, thunkAPI) => {
        const { id, token } = thunkObj;
        const response = await createOrUpdateProfile(id,token);
        console.log(response)
        return response.data;
    }
)

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        entities: [],
        loading: 'idle',
        error: null,
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsersProfile.rejected, (state, action) => {
                console.log(action.error)
                state.error = action.error;
            })
            .addCase(getUsersProfile.fulfilled, (state, { payload }) => {
                console.log(payload)
                state.entities = payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                    state.error = action.error;
                }
            })
            .addCase(updateUserProfile.pending, (state, action) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending';
                    state.error = null;
                }
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                    state.entities = action.payload;
                }
            })
            .addCase(createUserProfile.pending, (state, action) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending';
                    state.error = null;
                }
            })
            .addCase(createUserProfile.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                    state.entities = action.payload;
                }
            })
    }
})

export const {  } = profileSlice.actions;
export default profileSlice.reducer;