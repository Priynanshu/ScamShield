import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import scanService from "../services/scan.service";

const initialState = {
    aiResult: null,
    scanLoading: false,
    totalMessages: 0,
    scanError: null
};

export const scamDetectOfTextSlice = createAsyncThunk(
    "scan/text",
    async (message, thunkAPI) => {
        try {
            const response = await scanService.scamDetectOfTextService(message);
            return response;
        } catch(error) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);

export const scamDetectOfUrlSlice = createAsyncThunk(
    "scan/url",
    async (url, thunkAPI) => {
        try {
            const response = await scanService.scamDetectOfUrlService(url);
            return response;
        } catch(error) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);

export const scamDetectOfImageSlice = createAsyncThunk(
    "scan/image",
    async (message, thunkAPI) => {
        try {
            const response = await scanService.scamDetectOfImageService(message);
            return response;
        } catch(error) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);

export const fetchMessagesSlice = createAsyncThunk(
    "scan/reports",
    async (id, thunkAPI) => {
        try {
            const response = await scanService.scamDetectOfTextService(id);
            return response;
        } catch(error) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);

const scanSlice = createSlice({
    name: "scan",
    initialState,
    reducers: {
        clearScanError: (state) => {
            state.scanError = null;
        },
        setLoading: (state, action) => {
            state.scanLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(scamDetectOfTextSlice.pending, (state) => {
            state.scanLoading = true;
            state.scanError = null;
        })
        .addCase(scamDetectOfTextSlice.fulfilled, (state, action) => {
            state.scanLoading = false;
            state.aiResult = action.payload.aiResult || action.payload;
        })
        .addCase(scamDetectOfTextSlice.rejected, (state, action) => {
            state.scanLoading = false;
            state.scanError = action.payload?.message || "Scam Detect fail of Text";
        })
        
        .addCase(scamDetectOfUrlSlice.pending, (state) => {
            state.scanLoading = true;
            state.scanError = null;
        })
        .addCase(scamDetectOfUrlSlice.fulfilled, (state, action) => {
            state.scanLoading = false;
            state.aiResult = action.payload.aiResult || action.payload;
        })
        .addCase(scamDetectOfUrlSlice.rejected, (state, action) => {
            state.scanLoading = false;
            state.scanError = action.payload?.message || "Scam Detect fail of Url";
        })
        
        .addCase(scamDetectOfImageSlice.pending, (state) => {
            state.scanLoading = true;
            state.scanError = null;
        })
        .addCase(scamDetectOfImageSlice.fulfilled, (state, action) => {
            state.scanLoading = false;
            state.aiResult = action.payload.aiResult || action.payload;
        })
        .addCase(scamDetectOfImageSlice.rejected, (state, action) => {
            state.scanLoading = false;
            state.scanError = action.payload?.message || "Scam Detect fail of Image";
        })
        
        .addCase(fetchMessagesSlice.pending, (state) => {
            state.scanLoading = true;
            state.scanError = null;
        })
        .addCase(fetchMessagesSlice.fulfilled, (state, action) => {
            state.scanLoading = false;
            state.aiResult = action.payload.scamMessages || action.payload;
            state.totalMessages = action.payload.totalMessages || action.payload;
        })
        .addCase(fetchMessagesSlice.rejected, (state, action) => {
            state.scanLoading = false;
            state.scanError = action.payload?.message || "Fetching AI result Failed";
        });
    }
});

export const { clearScanError, setLoading } = scanSlice.actions;
export default scanSlice.reducer;