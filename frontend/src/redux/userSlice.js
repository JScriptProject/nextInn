import { createSlice } from '@reduxjs/toolkit';
import { id } from 'date-fns/locale';

const initialState = {
    id:"",
    firstname:"",
    lastname:"",
    email:"",
    mobile:"",
    city:""
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser:(state, action)=>{
            state.id=action.payload.id,
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.email = action.payload.email;
            state.mobile = action.payload.mobile;
            state.city = action.payload.city;
        },
        clearUser:()=>{initialState},
    }
})

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;