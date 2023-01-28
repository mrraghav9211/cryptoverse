import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:[],
}
export const dataSlice = createSlice({
    name:'crypto',
    initialState,
    reducers:{
addDetails:(state,action)=>{
    state.data.push(action.payload)
},
    }
})
export const{addDetails, addQuery}=dataSlice.actions 
export default dataSlice.reducer