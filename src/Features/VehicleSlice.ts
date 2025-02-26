import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

import Vehicle from "../models/Vehicle.ts";
import {notifyError, notifySuccess} from "../utils/ToastNotification.ts";


const api = axios.create({
    baseURL: "http://localhost:3000/vehicle",
});

const initialState = {
    vehicles: [],
    loading: false,
    error: null,
}
// Add Vehicle
export const addVehicle = createAsyncThunk(
    "vehicle/addVehicle",
    async (newVehicle) => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await api.post("add", newVehicle, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            notifySuccess("Vehicle added successfully");
            return response.data;
        } catch (err) {
            notifyError("Error adding vehicle:");
            console.error("Error adding vehicle:", err);
            throw err;
        }
    }
);

// Update Vehicle
export const updateVehicle = createAsyncThunk(
    "vehicle/updateVehicle",
    async ( { vehicleId, updatedVehicle }: { vehicleId: string; updatedVehicle: Partial<Vehicle> } ) => {
        console.log(updatedVehicle);
        const token = localStorage.getItem("accessToken");
        try {
            const response = await api.put(`update/${vehicleId}`, updatedVehicle, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            notifySuccess("Vehicle updated successfully");
            return response.data;
        } catch (err) {
            notifyError("Error updating vehicle:");
            console.error("Error updating vehicle:", err);
            throw err;
        }
    }
);

// Delete Vehicle
export const deleteVehicle = createAsyncThunk(
    "vehicle/deleteVehicle",
    async (vehicleId) => {
        const token = localStorage.getItem("accessToken");
        try {
            await api.delete(`delete/${vehicleId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            notifySuccess("Vehicle deleted successfully");
            return vehicleId;
        } catch (err) {
            notifyError("Error deleting vehicle:");
            console.error("Error deleting vehicle:", err);
            throw err;
        }
    }
);

// Fetch All Vehicles
export const fetchVehicles = createAsyncThunk(
    "vehicle/fetchVehicles",
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
            console.error("Error fetching vehicles:", err);
            throw err;
        }
    }
);
export const VehicleSlice = createSlice({
    name:"vehicle",
    initialState:initialState,
    reducers:{
        addVehicleLocal:(state,action)=>{
            console.log('Action Payload:', action.payload);
            state.vehicles.push(action.payload); // Immer handles immutability



        },
        updateVehicleLocal:(state,action)=>{
            console.log('Action Payload:', action.payload);
            const {vehicleId,updatedVehicle}=action.payload;
            state.vehicles = state.vehicles.map(vehicle =>
                vehicle.vehicleId === vehicleId ? { ...vehicle, ...updatedVehicle } : vehicle
            );
        },

        deleteVehicleLocal:(state,action)=>{

            state.vehicles = state.vehicles.filter(vehicle =>vehicle.vehicleId !== action.payload);
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(addVehicle.pending, (state) => {
                state.loading = true;
            })
            .addCase(addVehicle.fulfilled, (state, action) => {
                state.loading = false;
                state.vehicles.push(action.payload);
            })
            .addCase(addVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(updateVehicle.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateVehicle.fulfilled, (state, action) => {
                state.loading = false;
                state.vehicles = state.vehicles.map(vehicle =>
                    vehicle.vehicleId === action.payload.vehicleId ? action.payload : vehicle
                );
            })
            .addCase(updateVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(deleteVehicle.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteVehicle.fulfilled, (state, action) => {
                state.loading = false;
                state.vehicles = state.vehicles.filter(vehicle => vehicle.vehicleId !== action.payload);
            })
            .addCase(deleteVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(fetchVehicles.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVehicles.fulfilled, (state, action) => {
                state.loading = false;
                state.vehicles = action.payload;
            })
            .addCase(fetchVehicles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

export const {addVehicleLocal, updateVehicleLocal,deleteVehicleLocal} = VehicleSlice.actions;
export default VehicleSlice.reducer;
