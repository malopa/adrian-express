import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:null,
    user:{},
    isLoggedIn:false
}

const userSlice  = createSlice({
    name:"user",
    initialState,
    reducers:{
    _login:(state,action)=>{
        return {...state,isLoggedIn:true,token:action.payload.token,user:action.payload.data}
    },
    _signup:(state,action)=>{
        return {...state,isLoggedIn:true,user:action.payload}

    },
     _updateProfile:(state,action)=>{
        return {...state,isLoggedIn:true,user:action.payload.data}
    },
    _logout:(state)=>{
        // alert(state)
        return {...state,isLoggedIn:false,user:{},token:null}
    }
}
})


export const {_login,_logout,_signup,_updateProfile}  = userSlice.actions

export default userSlice.reducer;
