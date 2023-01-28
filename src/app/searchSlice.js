import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:[],
    category:'Cryptocurrency'
}
export const newsSlice = createSlice({
    name:'search',
    initialState,
    reducers:{
        addNewsData:(state, action)=>{
          state.data.push(action.payload);
        },
        addCategory:(state, action)=>{
          state.category = action.payload;
        },
    },
})

export const {addNewsData, addCategory} = newsSlice.actions;
export default newsSlice.reducer;