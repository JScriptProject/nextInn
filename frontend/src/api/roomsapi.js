import axios from "axios"

const API = import.meta.env.VITE_API_URL

export const getRoomsData = async()=>{
    try {
        const res = await axios.get(`${API}/api/rooms`);
        return res.data;
    } catch (error) {
        console.log("Error fetching rooms:", error);
        throw error;
    }
}

export const saveToRoom = async(newData)=>{
    try {
          const res = await axios.post(`${API}/api/rooms`,{
            rooms:newData,
          });
        return res.data;
    } catch (error) {
        console.error("Error saving to rooms:", error);
        throw error;
    }
}


export const fetchRoomById = async(roomId) =>{
   try {
      const response = await axios.post(`${API}/api/rooms/get-room`, {
        roomId: roomId,
      });
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
}