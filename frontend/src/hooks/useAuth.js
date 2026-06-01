import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSlice, logoutSlice, registerSlice, getMeSlice, clearAuthError } from "../features/authSlice";
import { useCallback } from "react";

const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated, loading, error, allUsers } = useSelector((state) => state.auth);

    // Trigger Google OAuth — backend handles the rest, redirects to /auth-success
    const googleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    };

    const registerHook = useCallback(async (userData) => {
        try {
            const result = await dispatch(registerSlice(userData));
            if (registerSlice.fulfilled.match(result)) {
                // Save token from register response too
                const token = result.payload?.token;
                if (token) localStorage.setItem("accessToken", token);
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
                // Save token for bearer-token flow (needed alongside cookie)
                const token = result.payload?.token;
                if (token) localStorage.setItem("accessToken", token);
                navigate("/");
            }
        } catch (error) {
            throw error;
        }
    }, [dispatch, navigate]);

    const logoutHook = useCallback(async () => {
        try {
            await dispatch(logoutSlice());
            // Clear localStorage token on logout
            localStorage.removeItem("accessToken");
            navigate("/");
        } catch (error) {
            throw error;
        }
    }, [dispatch, navigate]);

    const refreshUser = useCallback(async () => {
        return await dispatch(getMeSlice());
    }, [dispatch]);

    const clearError = useCallback(() => {
        dispatch(clearAuthError());
    }, [dispatch]);

    return {
        user,
        isAuthenticated,
        loading,
        googleLogin,
        error,
        clearError,
        registerHook,
        loginHook,
        logoutHook,
        refreshUser,
        allUsers,
    };
};

export default useAuth;
