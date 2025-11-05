import { createSlice } from "@reduxjs/toolkit";
import { data } from "react-router-dom";

const loginSlice = createSlice({
    name:"login",
    initialState:{
        data:[],
        isAuthenticated:false
    },

   reducers:{
    getUserData(state,action){
           state.data=action.payload;
    },
    isAuthenticated(state,action){
        state.isAuthenticated=action.payload;
    }
}

})

export const  {getUserData,isAuthenticated} =loginSlice.actions;
export default loginSlice.reducer;