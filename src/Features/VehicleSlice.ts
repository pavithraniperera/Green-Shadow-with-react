import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    vehicles: []
}
export const VehicleSlice = createSlice({
    name:"vehicle",
    initialState:initialState,
    reducers:{
        addVehicle:(state,action)=>{
            console.log('Action Payload:', action.payload);
            state.vehicles.push(action.payload); // Immer handles immutability



        },
        updateVehicle:(state,action)=>{
            console.log('Action Payload:', action.payload);
            const {vehicleId,updatedVehicle}=action.payload;
            state.vehicles = state.vehicles.map(vehicle =>
                vehicle.vehicleId === vehicleId ? { ...vehicle, ...updatedVehicle } : vehicle
            );
        },

        deleteVehicle:(state,action)=>{

            state.vehicles = state.vehicles.filter(vehicle =>vehicle.vehicleId !== action.payload);
        }

    }
})

export const {addVehicle, updateVehicle,deleteVehicle} = VehicleSlice.actions;
export default VehicleSlice.reducer;
