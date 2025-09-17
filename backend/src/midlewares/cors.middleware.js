import cors from 'cors';

//handle cors
const  coresMiddleware = cors({
    origin:'http://localhost:5173',
    methods:['GET'],
    credentials:true
});

export default coresMiddleware;