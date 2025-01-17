
import {createSlice} from "@reduxjs/toolkit";


const initialState={
    fields:[]
} ;
const FieldSlice = createSlice({
    name:"field",
    initialState:initialState,
    reducers:{
        addField:(state,action)=>{
            console.log('Action Payload:', action.payload);
            state.fields.push(action.payload); // Immer handles immutability
            console.log('Updated Fields ArrayS:', state.fields);


        }
    }
})
export const {addField} = FieldSlice.actions;
export default FieldSlice.reducer;