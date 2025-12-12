import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin:null,
    isAdminLoading:true,
    isAdminAthenticated:false
};

const adminSlice = createSlice(
    {name:"admin",
     initialState,
     reducers:{
        setAdmin:(state, action)=>{
            state.admin=action.payload;
            state.isAdminAthenticated=true;
        },
        setAdminLoading:(state, action)=>{
            state.isAdminLoading=action.payload;
        },
        clearAdmin:(state, action)=>{
            state.admin=null;
            state.isAdminAthenticated=false;
        }
     }
    }
);

export const { setAdmin, clearAdmin, setAdminLoading } = adminSlice.actions;
export default adminSlice.reducer;