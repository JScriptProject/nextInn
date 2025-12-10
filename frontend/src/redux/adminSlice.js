import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin:null,
    isAdminLoading:true,
    isAdminAthenticated:false
};

const adminSlice = createSlice(
    {admin:null,
     initialState,
     reducers:{
        setAdmin:(state, action)=>{
            state.admin=action.payload;
            state.isAdminAthenticated=true;
        },
        setLoading:(state, action)=>{
            state.isAdminLoading=action.payload;
        },
        clearAdmin:(state, action)=>{
            state.admin=null;
            state.isAdminAthenticated=false;
        }
     }
    }
);

export const {setAdmin, clearAdmin, setLoading} = adminSlice.actions;
export default adminSlice.reducer;