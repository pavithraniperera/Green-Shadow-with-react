import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import Equipment from "../models/Equipment.ts";
import {notifyError, notifySuccess} from "../utils/ToastNotification.ts";

const api = axios.create({
    baseURL: "http://localhost:3000/equipment",
});
const initialState = {
    equipments:[],
    loading: false,
    error: null,
}
export const addEquipment = createAsyncThunk(
    "equipment/addEquipment",
    async (newEquipment) => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await api.post("add", newEquipment, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            notifySuccess("Add Equipment successfully");
            return response.data;
        } catch (err) {
            notifyError("Error adding equipment");
            console.error("Error adding equipment:", err);
            throw err;
        }
    }
);
export const updateEquipment = createAsyncThunk(
    "equipment/updateEquipment",
    async ({ equipmentId, updatedEquipment }:{equipmentId:string,updatedEquipment:Partial<Equipment>}) => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await api.put(`update/${equipmentId}`, updatedEquipment, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            notifySuccess("Updated Equipment successfully");
            return response.data;
        } catch (err) {
            notifyError("Error updating Equipment");
            console.error("Error updating equipment:", err);
            throw err;
        }
    }
);

// Delete Equipment
export const deleteEquipment = createAsyncThunk(
    "equipment/deleteEquipment",
    async (equipmentId) => {
        const token = localStorage.getItem("accessToken");
        try {
            await api.delete(`delete/${equipmentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            notifySuccess("Equipment Deldete successfully");
            return equipmentId;
        } catch (err) {
            notifyError("Error deleting Equipment");
            console.error("Error deleting equipment:", err);
            throw err;
        }
    }
);

// Fetch All Equipment
export const fetchEquipment = createAsyncThunk(
    "equipment/fetchEquipment",
    async () => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await api.get("/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (err) {
            console.error("Error fetching equipment:", err);
            throw err;
        }
    }
);

const staffSlice = createSlice({
    name:"equipment",
    initialState:initialState,
    reducers:{
        addEquipmentLocal:(state,action)=>{
            console.log('Action Payload:', action.payload);
            state.equipments.push(action.payload); // Immer handles immutability



        },
        updateEquipmentLocal:(state,action)=>{
            console.log('Action Payload:', action.payload);
            const {equipmentId,updatedEquipment}=action.payload;
            state.equipments = state.equipments.map(equipment =>
                equipment.equipmentId === equipmentId ? { ...equipment, ...updatedEquipment } : equipment
            );
        },
        deleteEquipmentLocal:(state,action)=>{

            state.equipments = state.equipments.filter(equipment =>equipment.equipmentId !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addEquipment.pending, (state) => {
                state.loading = true;
            })
            .addCase(addEquipment.fulfilled, (state, action) => {
                state.loading = false;
                state.equipments.push(action.payload);
            })
            .addCase(addEquipment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(updateEquipment.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateEquipment.fulfilled, (state, action) => {
                state.loading = false;
                state.equipments = state.equipments.map(equipment =>
                    equipment.equipmentId === action.payload.equipmentId ? action.payload : equipment
                );
            })
            .addCase(updateEquipment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(deleteEquipment.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteEquipment.fulfilled, (state, action) => {
                state.loading = false;
                state.equipments = state.equipments.filter(equipment => equipment.equipmentId !== action.payload);
            })
            .addCase(deleteEquipment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(fetchEquipment.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEquipment.fulfilled, (state, action) => {
                state.loading = false;
                state.equipments = action.payload;
            })
            .addCase(fetchEquipment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})
export const {addEquipmentLocal, updateEquipmentLocal,deleteEquipmentLocal} = staffSlice.actions;
export default staffSlice.reducer;