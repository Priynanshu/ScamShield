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
    async ({ message, language }, thunkAPI) => {
        try {
            const response = await scanService.scamDetectOfTextService({ message, language });
            return response;
        } catch(error) {
            return thunkAPI.rejectWithValue(error?.response?.data || error);
        }
    }
);

export const scamDetectOfUrlSlice = createAsyncThunk(
    "scan/url",
    async ({ url, language }, thunkAPI) => {
        try {
            const response = await scanService.scamDetectOfUrlService({ url, language });
            return response;
        } catch(error) {
            return thunkAPI.rejectWithValue(error?.response?.data || error);
        }
    }
);

export const scamDetectOfImageSlice = createAsyncThunk(
    "scan/image",
    async ({ image, language }, thunkAPI) => {
        try {
            const response = await scanService.scamDetectOfImageService({ image, language });
            return response;
        } catch(error) {
            return thunkAPI.rejectWithValue(error?.response?.data || error);
        }
    }
);

export const fetchMessagesSlice = createAsyncThunk(
    "scan/reports",
    async (id, thunkAPI) => {
        try {
            const response = await scanService.fetchMessagesService(id);
            return response;
        } catch(error) {
            return thunkAPI.rejectWithValue(error?.response?.data || error);
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
            state.totalMessages = action.payload.totalMessages || 0;
        })
        .addCase(fetchMessagesSlice.rejected, (state, action) => {
            state.scanLoading = false;
            state.scanError = action.payload?.message || "Fetching AI result Failed";
        });
    }
});

export const { clearScanError, setLoading } = scanSlice.actions;
export default scanSlice.reducer;
