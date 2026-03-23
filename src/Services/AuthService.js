import API from "../api/axios";

 export const login = async (email, password) => {
    try {
        const body = { email, password };
        const response = await API.post("/Auth/login", body);
        console.log("Login response:", response);  // debug line
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

 export const logout = async () => {
    try {
        await API.post("/Auth/logout");
    } catch (error) {
        console.error("Logout failed:", error);
        throw error;
    }
}

export const  register = async (name, email, password, whatsappNumber) => {
    try {
        const body = { name, email, password, whatsappNumber };
        const response = await API.post("/Auth/register", body);
        return response.data;
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;
    }
}

export const getdashboardData = async () => {
    try {
        const response = await API.get("/dashboard/stats");
        return response.data;
    }
    catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        throw error;
    }
}

