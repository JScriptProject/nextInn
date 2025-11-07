import axios from "axios"

 const API = import.meta.env.VITE_API_URL

export const signup = async(signUpData) =>{
    try{
        const res = await axios.post(`$API}/api/signup`,signUpData)
        return res.data;
    }
    catch(error)
    {
        console.error("Error in signup", error);
        throw error;
    }
}
