
import {createSlice} from "@reduxjs/toolkit";


const initialState={
    fields:[]
} ;
const FieldSlice = createSlice({
    name:"fieldSlice",
    initialState:initialState,
    reducers:{
        addField:(state,action)=>{
            state.fields.push(action.payload);
            console.log(state.fields);

        }
    }
})
export const {addField} = FieldSlice.actions;
export default FieldSlice.reducer;