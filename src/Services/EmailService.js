import API from "../api/axios";

export const fetchEmailById = async (id) => {
    try {
        const response = await API.get(`/email/Email/getEmail`, {
          params: { emailId: id }, // ✅ query parameter
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch email:", error);
        throw error;
    }
}

export const fetchAllEmails = async () => {
    try {
        const response = await API.get("/email/Email/getEmails");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch all emails:", error);
        throw error;
    }
}

export const toggleGmail = async (gmailAddress) => {
    try {
        const response = await API.put(
            "/email/Email/emailactivation",
            null,
            {
                params: { email: gmailAddress }
            }
        );

        return response.data;
    } catch (error) {
        console.error("Failed to toggle Gmail connection:", error);
        throw error;
    }
};