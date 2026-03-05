import adminApi from "./adminAxiosInstance";

export const getDashboardData = async () => {
    try {
        const response = await adminApi.get("/api/dashboard");
        return {
            success: true,
            message: response.data.message,
            data: response.data.data,
            status: response.status,
        };
    } catch (error) {
        console.error("An error occurred while fetching dashboard data", error);
        const errorMessage = error.response?.data?.message || "Something went wrong";
        return {
            success: false,
            message: errorMessage,
            data: null,
            status: error.response?.status || 404,
        };
    }
}
