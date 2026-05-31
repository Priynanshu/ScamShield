import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reportService from "../services/reported.service";

const initialState = {
    reportsMessages: null,
    reportLoading: false,
    allReportedMessages: null,
    reportError: null,
    relatableCount: 0,
    stats: null,
    statsLoading: false,
};

export const reportToCommunitySlice = createAsyncThunk(
    "repost/report",
    async (scamId, thunkAPI) => {
        try {
            const response = await reportService.reportToCommunityService(scamId);
            return response;
        } catch(err) {
            return thunkAPI.rejectWithValue(err?.message || "Report to community failed");
        }
    }
);

export const fetchAllReportsMessagesSlcie = createAsyncThunk(
    "repost/community",
    async (_, thunkAPI) => {
        try {
            const response = await reportService.fetchAllReportsMessagesService();
            return response;
        } catch(err) {
            return thunkAPI.rejectWithValue(err?.message || "Fetching reports failed");
        }
    }
);

export const markRelatableSlice = createAsyncThunk(
    "repost/relatable",
    async (scamId, thunkAPI) => {
        try {
            const response = await reportService.markRelatableService(scamId);
            return response;
        } catch(err) {
            return thunkAPI.rejectWithValue(err?.message || "Marking relatable failed");
        }
    }
);

export const fetchStatsSlice = createAsyncThunk(
    "repost/stats",
    async (_, thunkAPI) => {
        try {
            const response = await reportService.fetchStatsService();
            return response;
        } catch(err) {
            return thunkAPI.rejectWithValue(err?.message || "Fetching stats failed");
        }
    }
);

const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {
        clearReportError: (state) => { state.reportError = null; },
        // Reset community list so Community page always re-fetches fresh
        clearCommunityCache: (state) => { state.allReportedMessages = null; },
    },
    extraReducers: (builder) => {
        builder

        // report to community
        .addCase(reportToCommunitySlice.pending, (state) => {
            state.reportLoading = true;
            state.reportError = null;
        })
        .addCase(reportToCommunitySlice.fulfilled, (state, action) => {
            state.reportLoading = false;
            const updated = action.payload?.scamMessage;
            // Inject the newly reported item at the top of community list if list exists
            if (updated && state.allReportedMessages) {
                // Replace if already present, or insert at top
                const exists = state.allReportedMessages.find(r => r._id === updated._id);
                if (exists) {
                    state.allReportedMessages = state.allReportedMessages.map(r =>
                        r._id === updated._id ? updated : r
                    );
                } else {
                    state.allReportedMessages = [updated, ...state.allReportedMessages];
                }
            } else if (updated) {
                // List wasn't loaded yet — seed it
                state.allReportedMessages = [updated];
            }
        })
        .addCase(reportToCommunitySlice.rejected, (state, action) => {
            state.reportLoading = false;
            state.reportError = action.payload;
        })

        // fetch all community reports
        .addCase(fetchAllReportsMessagesSlcie.pending, (state) => {
            state.reportLoading = true;
            state.reportError = null;
        })
        .addCase(fetchAllReportsMessagesSlcie.fulfilled, (state, action) => {
            state.reportLoading = false;
            state.allReportedMessages = action.payload?.reportsMessages ?? action.payload ?? [];
        })
        .addCase(fetchAllReportsMessagesSlcie.rejected, (state, action) => {
            state.reportLoading = false;
            state.reportError = action.payload;
            // Keep stale data on error so UI doesn't flash empty
        })

        // mark relatable — update the specific card in list
        .addCase(markRelatableSlice.fulfilled, (state, action) => {
            const updated = action.payload?.scamMessage;
            if (updated && state.allReportedMessages) {
                state.allReportedMessages = state.allReportedMessages.map(r =>
                    r._id === updated._id ? { ...r, relatableCount: updated.relatableCount } : r
                );
            }
            state.relatableCount = updated?.relatableCount ?? state.relatableCount;
        })
        .addCase(markRelatableSlice.rejected, (state, action) => {
            state.reportError = action.payload;
        })

        // fetch stats
        .addCase(fetchStatsSlice.pending, (state) => { state.statsLoading = true; })
        .addCase(fetchStatsSlice.fulfilled, (state, action) => {
            state.statsLoading = false;
            state.stats = action.payload;
        })
        .addCase(fetchStatsSlice.rejected, (state) => { state.statsLoading = false; })
    }
});

export const { clearReportError, clearCommunityCache } = reportSlice.actions;
export default reportSlice.reducer;
