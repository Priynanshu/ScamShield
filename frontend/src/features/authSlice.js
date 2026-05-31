import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";

let initialState = {
    user: null,
    allUsers: 0,
    // isAuthenticated optimistically from localStorage so navbar shows correct state
    isAuthenticated: !!localStorage.getItem("accessToken"),
    // Start true — App dispatches getMeSlice() on mount; ProtectedRoute waits for this
    loading: true,
    userLoading: false,
    error: null,
    token: localStorage.getItem("accessToken") || null,
};

export const registerSlice = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            const response = await authService.registerService(userData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.message || error);
        }
    }
);

export const loginSlice = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            const response = await authService.loginService(userData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.message || error);
        }
    }
);

export const getMeSlice = createAsyncThunk(
    "auth/me",
    async (_, thunkAPI) => {
        try {
            const response = await authService.getMeService();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.message || error);
        }
    }
);

export const getAllUsersSlice = createAsyncThunk(
    "auth/users",
    async (_, thunkAPI) => {
        try {
            const response = await authService.getAllUsersService();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.message || error);
        }
    }
);

export const logoutSlice = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            const response = await authService.logoutService();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.message || error);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthError: (state) => { state.error = null; },
        setLoading: (state, action) => { state.loading = action.payload; },
    },
    extraReducers: (builder) => {
        builder

        // Register
        .addCase(registerSlice.pending,   (state) => { state.loading = true; state.error = null; })
        .addCase(registerSlice.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user || action.payload?.data?.user || action.payload;
            const token = action.payload?.token;
            if (token) { localStorage.setItem("accessToken", token); state.token = token; }
            state.isAuthenticated = true;
        })
        .addCase(registerSlice.rejected,  (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.payload || "Registration failed";
        })

        // Login
        .addCase(loginSlice.pending,   (state) => { state.loading = true; state.error = null; })
        .addCase(loginSlice.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user || action.payload.data?.user || action.payload;
            const token = action.payload?.token;
            if (token) { localStorage.setItem("accessToken", token); state.token = token; }
            state.isAuthenticated = true;
        })
        .addCase(loginSlice.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.payload || "Login Failed";
        })

        // Logout
        .addCase(logoutSlice.pending,   (state) => { state.loading = true; state.error = null; })
        .addCase(logoutSlice.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem("accessToken");
        })
        .addCase(logoutSlice.rejected, (state, action) => {
            // Even if the backend logout call fails, clear client state
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem("accessToken");
        })

        // Get Me (session restore)
        .addCase(getMeSlice.pending,   (state) => { state.loading = true; state.error = null; })
        .addCase(getMeSlice.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user || action.payload.data?.user || action.payload;
            state.isAuthenticated = true;
        })
        .addCase(getMeSlice.rejected, (state) => {
            state.loading = false;
            // Only mark unauthenticated if there's no localStorage token
            // (covers the case where cookie expired but localStorage token is still valid)
            if (!localStorage.getItem("accessToken")) {
                state.isAuthenticated = false;
                state.user = null;
            }
        })

        // Get All Users
        .addCase(getAllUsersSlice.pending,   (state) => { state.userLoading = true; state.error = null; })
        .addCase(getAllUsersSlice.fulfilled, (state, action) => {
            state.userLoading = false;
            state.allUsers = action.payload.totalUsers || action.payload.count || action.payload || 0;
        })
        .addCase(getAllUsersSlice.rejected, (state, action) => {
            state.userLoading = false;
            state.error = action.payload?.message || "Get All Users Failed";
        })
    }
});

export const { clearAuthError, setLoading } = authSlice.actions;
export default authSlice.reducer;
