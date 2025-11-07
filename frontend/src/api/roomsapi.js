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
          const res = await axios.post('http://localhost:8000/api/rooms',{
            rooms:newData,
          });
        return res.data;
    } catch (error) {
        console.error("Error saving to rooms:", error);
        throw error;
    }
}
