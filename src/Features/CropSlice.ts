import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Crop from "../models/Crop.ts";

import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/crops",
});

const initialState = {
    crops: [],
    loading: false,
    error: null,
};


export const saveCrop = createAsyncThunk(
    "crop/saveCrop",
    async (formData: FormData) => {
        const token = localStorage.getItem("accessToken");

        try {
            const response = await api.post("add", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
);

export const updateCrop = createAsyncThunk(
    "crop/updateCrop",
    async (payload: FormData) => {
        const token = localStorage.getItem("accessToken");
        console.log("payload",payload);

        try {
            const response = await api.put(`update/${payload.get('cropId')}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
);

export const deleteCrop = createAsyncThunk(
    "crop/deleteCrop",
    async (cropId: string) => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await api.delete(`delete/${cropId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
);

export const fetchCrops = createAsyncThunk(
    "crop/fetchCrops",
    async () => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await api.get("/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data as Crop[];
        } catch (err) {
            console.error("Error fetching crops:", err);
            throw err;
        }
    }
);


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
                crop.cropId === Id ? { ...crop, ...updatedCrop } : crop
            );
        },
        deletedCrop:(state,action)=>{

            state.crops = state.crops.filter(crop =>crop.cropId !== action.payload);
        }

    },
    extraReducers: (builder) => {
        builder
            // 🔹 Handle Fetch Crops
            .addCase(fetchCrops.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCrops.fulfilled, (state, action) => {
                state.loading = false;
                state.crops = action.payload;
            })
            .addCase(fetchCrops.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🔹 Handle Add Crop
            .addCase(saveCrop.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveCrop.fulfilled, (state, action) => {
                state.loading = false;
                state.crops.push(action.payload);
            })
            .addCase(saveCrop.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🔹 Handle Update Crop
            .addCase(updateCrop.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCrop.fulfilled, (state, action) => {
                state.loading = false;
                const updatedCrop = action.payload;
                state.crops = state.crops.map(crop =>
                    crop.cropId === updatedCrop.cropId ? updatedCrop : crop
                );
            })
            .addCase(updateCrop.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🔹 Handle Delete Crop
            .addCase(deleteCrop.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCrop.fulfilled, (state, action) => {
                state.loading = false;
                state.crops = state.crops.filter(crop => crop.cropId !== action.payload);
            })
            .addCase(deleteCrop.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})
export const {addCrop,UpdateCrop,deletedCrop} = CropSlice.actions;
export default CropSlice.reducer;