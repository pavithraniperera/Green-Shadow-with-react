
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


import axios from "axios";
import {Field} from "../models/Field.ts";

const api =axios.create({
    baseURL: "http://localhost:3000/fields",
})
const initialState={
    fields:[],
    loading:false,
    error:null,
    successMessage :"null"
} ;

export const saveField=createAsyncThunk(
    'field/saveField',
    async (formData:FormData)=>{

        const token = localStorage.getItem("accessToken");
        try {
            console.log(formData);
            const response = await api.post('add',formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}` ,// Send token in the request
                        "Content-Type": "multipart/form-data",
                    }
                });
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
)
export const updateField=createAsyncThunk(
    'field/updateField',
    async (payload:FormData)=>{
        const token = localStorage.getItem("accessToken");

        try {
            const response = await api.put(`update/${payload.get('fieldId')}`,payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}` ,// Send token in the request
                        "Content-Type": "multipart/form-data",
                    }

                });
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
)
export const deleteField=createAsyncThunk(
    'field/deleteField',
    async (fieldId:string)=>{

        const token = localStorage.getItem("accessToken");

        try {
            const response = await api.delete(`delete/${fieldId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Send token in the request
                    }
                });
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
)
// Fetch all customers
export const fetchFields = createAsyncThunk(
    "field/fetchFields",
    async () => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await api.get("/",
            {
                headers: {
                    Authorization: `Bearer ${token}` // Send token in the request
                }
            });
            return response.data as Field[];
        } catch (err) {
            console.error("Error fetching customers:", err);
            throw err;
        }
    }
)

const FieldSlice = createSlice({
    name:"field",
    initialState:initialState,
    reducers:{
        // addField:(state,action)=>{
        //     console.log('Action Payload:', action.payload);
        //     state.fields.push(action.payload); // Immer handles immutability
        //     console.log('Updated Fields ArrayS:', state.fields);
        //
        //
        // },
        // updateField:(state,action)=>{
        //     console.log('Action Payload:', action.payload);
        //     const {fieldId,updatedField}=action.payload;
        //     state.fields = state.fields.map(field =>
        //         field.fieldId === fieldId ? { ...field, ...updatedField } : field
        //     );
        // },
        // deleteField:(state,action)=>{
        //
        //    state.fields = state.fields.filter(field =>field.fieldId !== action.payload);
        // }

    },
    extraReducers: (builder) => {
        builder
            // 🔹 Handle Fetch Fields
            .addCase(fetchFields.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFields.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload)
                state.fields = action.payload;
            })
            .addCase(fetchFields.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🔹 Handle Add Field
            .addCase(saveField.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveField.fulfilled, (state, action) => {
                state.loading = false;
                state.fields.push(action.payload);
            })
            .addCase(saveField.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🔹 Handle Update Field
            .addCase(updateField.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateField.fulfilled, (state, action) => {
                state.loading = false;
                const updatedField = action.payload; // API response
                state.fields = state.fields.map(field =>
                    field.fieldId === updatedField.fieldId ? updatedField : field
                );
            })
            .addCase(updateField.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🔹 Handle Delete Field
            .addCase(deleteField.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteField.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload)
                state.fields = state.fields.filter(field => field.fieldId !== action.payload);
            })
            .addCase(deleteField.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }

})

// Selector to get field by ID
export const selectFieldById = (state, fieldId) => {
    return state.field.fields.find(field => field.fieldId === fieldId);
};
//export const {addField,updateField,deleteField} = FieldSlice.actions;
export default FieldSlice.reducer;