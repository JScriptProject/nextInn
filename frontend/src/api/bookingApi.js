import api from "@api/axiosInstance.js"; // Use your custom instance instead of raw axios
import adminApi from "@api/adminAxiosInstance.js"

//user side api
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
      data: null,
      status: error.response?.status || 400,
    };
  }
};

//user side api
export const getBookingsByUser = async () => {
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
};

//user side api
export const getRoomsAvailability = async (categoryId, checkIn, checkOut) => {
  try {
    const response = await api.get("/api/booking/check-availability", {
      params: { categoryId, checkIn, checkOut },
    });
    console.log("AVailable RESPONS=> ", response);
    return {
      success: true,
      data: response.data.data,
      message: response.data.message,
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
};

//admin side api
export const getAllBookingsByDate = async (startDate, endDate) => {
  try {
    const response = await adminApi.get("/api/booking/all-booking", {
      params: { startDate: startDate, endDate: endDate },
    });
     
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
};


// admin side api

export const updateBookingStatus = async (data)=>{
  try {
    const response = await adminApi.post("/api/booking/update-status",data);
    console.log("Upadate booking status response =>", response);
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

//admin side api
export const cancelBooking=async(idx)=>{
  console.log("IDDDDD=>", idx);
  try {
     const response = await adminApi.post("/api/booking/update-cancel",idx);
     console.log("cancel booking  response =>", response);
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