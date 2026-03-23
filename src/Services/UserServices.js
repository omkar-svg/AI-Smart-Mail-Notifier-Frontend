import API from "../api/axios";

export const getprofile = async () => {
    try {
        const response = await API.get("/dashboard/profile");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch profile:", error);
        throw error;
    }
}