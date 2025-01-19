
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


        },
        updateField:(state,action)=>{
            console.log('Action Payload:', action.payload);
            const {fieldId,updatedField}=action.payload;
            state.fields = state.fields.map(field =>
                field.fieldId === fieldId ? { ...field, ...updatedField } : field
            );
        },
        deleteField:(state,action)=>{

           state.fields = state.fields.filter(field =>field.fieldId !== action.payload);
        }

    }

})

// Selector to get field by ID
export const selectFieldById = (state, fieldId) => {
    return state.field.fields.find(field => field.fieldId === fieldId);
};
export const {addField,updateField,deleteField} = FieldSlice.actions;
export default FieldSlice.reducer;