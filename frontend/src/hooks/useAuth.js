import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { loginSlice, logoutSlice, registerSlice, clearAuthError } from "../features/authSlice";
import { useCallback } from "react";

// FIX: Removed the useEffect that called clearAuthError on every mount.
// That was wiping errors immediately after they were set, so the user
// never saw them. Call clearAuthError explicitly (e.g. on input change)
// instead of automatically on component mount.

const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated, loading, error, allUsers } = useSelector((state) => state.auth);

    // Google Login Trigger
    const googleLogin = () => {
        // Backend URL jahan passport-google-oauth20 setup hai
        window.location.href = "http://localhost:3000/api/auth/google";
    };

    // OAuth Success verify karne ke liye
    const handleOAuthSuccess = async (token) => {
        localStorage.setItem("accessToken", token);
        const result = await dispatch(user()); // Profile fetch karo verify karne ke liye
        if (user.fulfilled.match(result)) {
            Navigate("/");
        }
    };

    const registerHook = useCallback(async (userData) => {
        try {
            const result = await dispatch(registerSlice(userData));
            if (registerSlice.fulfilled.match(result)) {
                navigate("/");
            }
        } catch (error) {
            throw error;
        }
    }, [dispatch, navigate]);

    const loginHook = useCallback(async (userData) => {
        try {
            const result = await dispatch(loginSlice(userData));
            if (loginSlice.fulfilled.match(result)) {
                navigate("/");
            }
        } catch (error) {
            throw error;
        }
    }, [dispatch, navigate]);

    const logoutHook = useCallback(async () => {
        try {
            return await dispatch(logoutSlice());
        } catch (error) {
            throw error;
        }
    }, [dispatch]);

    const clearError = useCallback(() => {
        dispatch(clearAuthError());
    }, [dispatch]);

    return {
        user,
        isAuthenticated,
        loading,
        googleLogin,
        handleOAuthSuccess,
        error,
        clearError,       // renamed from clearAuthError to avoid confusion with the action creator
        registerHook,
        loginHook,
        allUsers,
        logoutHook,
    };
};

export default useAuth;