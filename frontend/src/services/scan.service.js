import apiClient from "./api.service";

async function scamDetectOfTextService({ message, language = 'English' }) {
    try {
        const response = await apiClient.post("/scan/text", { message, language });
        return response.data;
    } catch(error) {
        throw error.response ? error?.response?.data : new Error('Network Error');
    }
}

async function scamDetectOfUrlService({ url, language = 'English' }) {
    try {
        const response = await apiClient.post("/scan/url", { message: url, language });
        return response.data;
    } catch(error) {
        throw error.response ? error?.response?.data : new Error('Network Error');
    }
}

async function scamDetectOfImageService({ image, language = 'English' }) {
    try {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("language", language);

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

export default {
    scamDetectOfTextService,
    scamDetectOfUrlService,
    scamDetectOfImageService,
    fetchMessagesService,
};
