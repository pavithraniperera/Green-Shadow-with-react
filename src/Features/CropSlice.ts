import {createSlice} from "@reduxjs/toolkit";

const initialState={
    crops:[]
} ;
const CropSlice = createSlice({
    name:"crop",
    initialState:initialState,
    reducers:{
        addCrop:(state,action)=>{
            console.log('Action Payload:', action.payload);
            state.crops.push(action.payload); // Immer handles immutability



        },
        UpdateCrop:(state,action)=>{
            console.log('Action Payload:', action.payload);
            const {Id,updatedCrop}=action.payload;
            state.crops = state.crops.map(crop =>
                updatedCrop.cropId === Id ? { ...crop, ...updatedCrop } : crop
            );
        },
        deleteCrop:(state,action)=>{

            state.crops = state.crops.filter(crop =>crop.cropId !== action.payload);
        }

    }
})
export const {addCrop,UpdateCrop,deleteCrop} = CropSlice.actions;
export default CropSlice.reducer;