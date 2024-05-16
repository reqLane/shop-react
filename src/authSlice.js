import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue,dispatch }) => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '
                },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(setUser(data.user));
                localStorage.setItem('token', data.jwt);
                localStorage.setItem('loggedInUser', JSON.stringify(data.user));
                return data;
            } else {
                return rejectWithValue(data);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userDetails, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer '
                },
                body: JSON.stringify(userDetails),
            });
            const data = await response.json();

            if (response.ok) {
                return data;
            }
            else {
                return rejectWithValue(data);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('token');
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});
export const { setUser,logout } = authSlice.actions;
export default authSlice.reducer;
