import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authService from "../services/auth.service"


let initialState = {
    user: null,
    allUsers: 0,
    isAuthenticated: !!localStorage.getItem("accessToken"),
    loading: false, // Initialized to true for session verification
    userLoading: false, // Added separate loading for users list
    error: null,
    token: localStorage.getItem("accessToken") || null
}
export const registerSlice = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try{
      const response = await authService.registerService(userData)
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginSlice = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try{
      const response = await authService.loginService(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getMeSlice = createAsyncThunk(
  "auth/me",
  async (_, thunkAPI) => {
    try{
      const response = await authService.getMeService();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsersSlice = createAsyncThunk(
  "auth/users",
  async (_, thunkAPI) => {
    try{
      const response = await authService.getAllUsersService();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutSlice = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try{
      const response = await authService.logoutService();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder

    .addCase(registerSlice.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(registerSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user || action.payload?.data?.user || action.payload;
      state.isAuthenticated = true;
    })
    .addCase(registerSlice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Registration failed";
    })

    //Login
    .addCase(loginSlice.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(loginSlice.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload.user || action.payload.data?.user || action.payload;
      state.isAuthenticated = true
    })
    .addCase(loginSlice.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload?.message || "Login Failed"
    })

    //logout
    .addCase(logoutSlice.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(logoutSlice.fulfilled, (state, action) => {
      state.loading = false
      state.user = null
      state.isAuthenticated = false
    })
    .addCase(logoutSlice.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload?.message || "Logout Failed"
    })

    //getME
    .addCase(getMeSlice.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(getMeSlice.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload.user || action.payload.data?.user || action.payload;
      state.isAuthenticated = true;
      state.error = null
    })
    .addCase(getMeSlice.rejected, (state, action) => {
      state.loading = false
      state.isAuthenticated = false;
      // Don't set error on session verification fail, it's normal if not logged in
    })

    //getAllUsers
    .addCase(getAllUsersSlice.pending, (state) => {
      state.userLoading = true
      state.error = null
    })
    .addCase(getAllUsersSlice.fulfilled, (state, action) => {
      state.userLoading = false
      state.allUsers = action.payload.totalUsers || action.payload.count || action.payload || 0;
      state.error = null
    })
    .addCase(getAllUsersSlice.rejected, (state, action) => {
      state.userLoading = false
      state.error = action.payload?.message || "Get All Users Failed"
      localStorage.removeItem("accessToken");
    })
  }
})

export const { clearAuthError, setLoading } = authSlice.actions
export default authSlice.reducer