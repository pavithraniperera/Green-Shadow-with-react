import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    equipments:[]
}
const staffSlice = createSlice({
    name:"equipment",
    initialState:initialState,
    reducers:{
        addEquipment:(state,action)=>{
            console.log('Action Payload:', action.payload);
            state.equipments.push(action.payload); // Immer handles immutability



        },
        updateEquipment:(state,action)=>{
            console.log('Action Payload:', action.payload);
            const {equipmentId,updatedEquipment}=action.payload;
            state.equipments = state.equipments.map(equipment =>
                equipment.equipmentId === equipmentId ? { ...equipment, ...updatedEquipment } : equipment
            );
        },
        deleteEquipment:(state,action)=>{

            state.equipments = state.equipments.filter(equipment =>equipment.equipmentId !== action.payload);
        }
    }
})
export const {addEquipment, updateEquipment,deleteEquipment} = staffSlice.actions;
export default staffSlice.reducer;