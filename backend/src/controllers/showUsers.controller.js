import { asyncHandler } from "../utils/asyncHandler.js";


const showUsers = asyncHandler((req, res, next)=>{
     res.status(200).send("Hello from the Show User");
})

export default showUsers;