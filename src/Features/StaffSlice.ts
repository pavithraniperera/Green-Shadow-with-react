import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    staff:[]
}
 const staffSlice = createSlice({
     name:"staff",
     initialState:initialState,
     reducers:{
         addStaff:(state,action)=>{
             console.log('Action Payload:', action.payload);
             state.staff.push(action.payload); // Immer handles immutability



         },
         updateStaff:(state,action)=>{
             console.log('Action Payload:', action.payload);
             const {email,updatedMember}=action.payload;
             state.staff = state.staff.map(member =>
                 member.email === email ? { ...member, ...updatedMember } : member
             );
         },
         deleteStaff:(state,action)=>{

             state.staff = state.staff.filter(member =>member.email !== action.payload);
         }


     }
 })
export const {addStaff, updateStaff,deleteStaff} = staffSlice.actions;
export default staffSlice.reducer;