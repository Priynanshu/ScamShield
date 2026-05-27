import apiClient from "./api.service";

async function scamDetectOfTextService(message) {
    try {
        const response = await apiClient.post("/scan/text", { message });
        return response.data;
    } catch(error) {
        throw error.response ? error?.response?.data : new Error('Network Error');
    }
}

async function scamDetectOfUrlService(message) {
    try {
        const response = await apiClient.post("/scan/url", { message });
        return response.data;
    } catch(error) {
        throw error.response ? error?.response?.data : new Error('Network Error');
    }
}

async function scamDetectOfImageService(imageFile) {
    try {
        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await apiClient.post("/scan/image", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    } catch(error) {
        throw error.response ? error?.response?.data : new Error('Network Error');
    }
}

async function fetchMessagesService(id) {
    try {
        const response = await apiClient.get("/scan/reports", { params: { id } });
        return response.data;
    } catch(error) {
        throw error.response ? error?.response?.data : new Error('Network Error');
    }
}

async function reportScam(reportData) {
    try {
        const response = await apiClient.post("/scan/report-community", reportData);
        return response.data;
    } catch(error) {
        throw error.response ? error?.response?.data : new Error('Network Error');
    }
}

export default {
    scamDetectOfTextService,
    scamDetectOfUrlService,
    scamDetectOfImageService,
    fetchMessagesService,
    reportScam
};