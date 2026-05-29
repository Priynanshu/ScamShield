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

export default {
    reportToCommunityService,
    fetchAllReportsMessagesService
}