import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reportService from "../services/reported.service"

const initialState = {
    reportsMessages: null,
    reportLoading: false,
    allReportedMessages: null,
    reportError: null
}

export const reportToCommunitySlice = createAsyncThunk(
    "repost/report",
    async (scamId, thunkAPI) => {
        try {
            const response = await reportService.reportToCommunityService(scamId)
            return response
        }catch(err) {
            return thunkAPI.rejectWithValue(err?.message || "Report to community failed");
        }
    }
)

export const fetchAllReportsMessagesSlcie = createAsyncThunk(
    "repost/community",
    async (_, thunkAPI) => {
        try {
            const response = await reportService.fetchAllReportsMessagesService()
            return response
        }catch(err) {
            return thunkAPI.rejectWithValue(err?.message || "Fetching reports failed")
        }
    }
)

const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {
        clearReportError: (state) => {
            state.reportError = null
        },
        setLoading: (state, action) => {
            state.reportLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder

        //reported to community
        .addCase(reportToCommunitySlice.pending, (state) => {
            state.reportLoading = true
            state.reportError = null
        })
        .addCase(reportToCommunitySlice.fulfilled, (state, action) => {
            state.reportLoading = false
            state.reportsMessages = action.payload.scamMessage || action.payload
        })
        .addCase(reportToCommunitySlice.rejected, (state, action) => {
            state.reportLoading = false
            state.reportError = action.payload
        })

        //fetch reported data
        .addCase(fetchAllReportsMessagesSlcie.pending, (state) => {
            state.reportLoading = true
            state.reportError = null
        })
        .addCase(fetchAllReportsMessagesSlcie.fulfilled, (state, action) => {
            state.reportLoading = false
            state.allReportedMessages = action.payload.reportsMessages || action.payload
        })
        .addCase(fetchAllReportsMessagesSlcie.rejected, (state, action) => {
            state.reportLoading = false
            state.reportError = action.payload
        })
    }
})

export const {clearReportError, setLoading} = reportSlice.actions
export default reportSlice.reducer