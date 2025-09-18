import { asyncHandler } from "../utils/asyncHandler.js";


const addUser = asyncHandler( async(req, res, next)=>{
    const data = req.body;
// if(!name || ! email || !password){
//     return res.status(400).json({message: "All fields are required"});
// }
console.log(data); 

res.json({message: `User added successfully = ${data}`});
})

export default addUser;