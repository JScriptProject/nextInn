import axios from "axios"


export const signup = async(signUpData) =>{
    try{
        const res = await axios.post("http://localhost:8000/api/signup",{
            form:signUpData,
        })
        return res.data;
    }
    catch(error)
    {
        console.error("Error in signup", error);
        throw error;
    }
}