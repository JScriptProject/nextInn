import api from "@api/axiosInstance.js"; // Use your custom instance instead of raw axios

export const confirmBooking = async (payload) => {
  try {
    // Use 'api' instead of 'axios'
    const response = await api.post("/api/booking/create", payload);
    console.log("RESPONSE ===>", response);
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      status: response.status,
    };
  } catch (error) {
    console.error("An error occurred while booking", error);
     const errorMessage = error.response.data.message || "Something went wrong";
     return {
       success: false,
       message: errorMessage,
       data:null,
       status: error.response?.status || 400,
     };
  }
};


export const getBookingByUser = async()=>{

  try {
    const response = await api.get("/api/booking/get-by-user");
    console.log("RESPONSE ===>", response);
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      status: response.status,
    };
  } catch (error) {
     console.error("An error occurred while booking", error);
     const errorMessage = error.response.data.message || "Something went wrong";
     return {
       success: false,
       message: errorMessage,
       data: null,
       status: error.response?.status || 404,
     };
  }
}