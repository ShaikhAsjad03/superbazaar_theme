import { createSlice } from "@reduxjs/toolkit";
const initialState={
    cmsData:[]
}
const cmsSlice=createSlice({
    name:"cmsSlice",
    initialState,
    reducers:{
        setCmsData:(state,action)=>{
            state.cmsData=action.payload
        }
    }
})

export const {setCmsData}=cmsSlice.actions
export default cmsSlice.reducer