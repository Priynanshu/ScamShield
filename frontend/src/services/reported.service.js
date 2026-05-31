import apiClient from "./api.service"

async function reportToCommunityService(scamId) {
    try {
        const response = await apiClient.post("/repost/", {scamId})
        return response.data
    }catch(error) {
        throw error.response ? error?.response?.data : new Error('Network Error'); 
    }
}

async function fetchAllReportsMessagesService() {
    try {
        const response = await apiClient.get("/repost/community")
        return response.data
    }catch(error) {
        throw error.response ? error?.response?.data : new Error('Network Error'); 
    }
}

// NEW: Mark a report as relatable
async function markRelatableService(scamId) {
    try {
        const response = await apiClient.post("/repost/relatable", { scamId })
        return response.data
    }catch(error) {
        throw error.response ? error?.response?.data : new Error('Network Error'); 
    }
}

// NEW: Fetch real stats from DB
async function fetchStatsService() {
    try {
        const response = await apiClient.get("/scan/stats")
        return response.data
    }catch(error) {
        throw error.response ? error?.response?.data : new Error('Network Error');
    }
}

export default {
    reportToCommunityService,
    fetchAllReportsMessagesService,
    markRelatableService,
    fetchStatsService
}
