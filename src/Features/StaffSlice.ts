import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Staff} from "../models/Staff.ts";
import axios from "axios";
import {notifyError, notifySuccess} from "../utils/ToastNotification.ts";

const api = axios.create({
    baseURL: "http://localhost:3000/staff",
});

const initialState = {
    staff: [] as Staff[],
    loading: false,
    error: null,
}

export const fetchStaff = createAsyncThunk(
    "staff/fetchStaff",
    async () => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await api.get("/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data as Staff[]; // Adjust type based on your staff model
        } catch (err) {
            console.error("Error fetching staff:", err);
            throw err;
        }
    }
);
export const addStaff = createAsyncThunk(
    "staff/addStaff",
    async (newStaff: Staff) => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await api.post("add", newStaff, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            notifySuccess("Successfully added staff");
            return response.data;
        } catch (err) {
            notifyError("Error adding staff");
            console.error("Error adding staff:", err);
            throw err;
        }
    }
);
export const updateStaff = createAsyncThunk(
    "staff/updateStaff",
    async ({ staffId, updatedMember }: { staffId: string; updatedMember: Partial<Staff> }) => {
        console.log(staffId)
        console.log(updatedMember)
        const token = localStorage.getItem("accessToken");
        try {
            const response = await api.put(`update/${staffId}`, updatedMember, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            notifySuccess("Successfully updated staff");
            return response.data;
        } catch (err) {
            notifyError("Error updating staff");
            console.error("Error updating staff:", err);
            throw err;
        }
    }
);

//  Delete Staff Member
export const deleteStaff = createAsyncThunk(
    "staff/deleteStaff",
    async (staffId: string) => {
        const token = localStorage.getItem("accessToken");
        try {
            await api.delete(`delete/${staffId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            notifySuccess("Successfully deleted Staff")
            return staffId;
        } catch (err) {
            notifyError("Error deleting staff")
            console.error("Error deleting staff:", err);
            throw err;
        }
    }
);
 const staffSlice = createSlice({
     name:"staff",
     initialState:initialState,
     reducers:{
         addStaffReducer:(state,action)=>{
             console.log('Action Payload:', action.payload);
             state.staff.push(action.payload); // Immer handles immutability



         },
         updateStaffReducer:(state,action)=>{
             console.log('Action Payload:', action.payload);
             const {email,updatedMember}=action.payload;
             state.staff = state.staff.map(member =>
                 member.email === email ? { ...member, ...updatedMember } : member
             );
         },
         deleteStaffReducer:(state,action)=>{

             state.staff = state.staff.filter(member =>member.email !== action.payload);
         }


     },
     extraReducers: (builder) => {
         builder
             .addCase(fetchStaff.pending, (state) => {
                 state.loading = true;
             })
             .addCase(fetchStaff.fulfilled, (state, action) => {
                 state.loading = false;
                 state.staff = action.payload;
             })
             .addCase(fetchStaff.rejected, (state, action) => {
                 state.loading = false;
                 state.error = action.error.message || "Failed to fetch staff";
             })

             .addCase(updateStaff.pending, (state) => {
                 state.loading = true;
             })
             .addCase(updateStaff.fulfilled, (state, action) => {
                 state.loading = false;
                 const  updatedMember  = action.payload;
                 state.staff = state.staff.map((member) =>
                     member.staffId === updatedMember.staffId ? { ...member, ...updatedMember } : member
                 );
             })
             .addCase(updateStaff.rejected, (state, action) => {
                 state.loading = false;
                 state.error = action.error.message || "Failed to update staff";
             })

             .addCase(deleteStaff.pending, (state) => {
                 state.loading = true;
             })
             .addCase(deleteStaff.fulfilled, (state, action) => {
                 state.loading = false;
                 state.staff = state.staff.filter((member) => member.staffId !== action.payload);
             })
             .addCase(deleteStaff.rejected, (state, action) => {
                 state.loading = false;
                 state.error = action.error.message || "Failed to delete staff";
             })
             .addCase(addStaff.pending, (state) => {
                 state.loading = true;
             })
             .addCase(addStaff.fulfilled, (state, action) => {
                 state.loading = false;
                 state.staff.push(action.payload); // Add new staff to Redux state
             })
             .addCase(addStaff.rejected, (state, action) => {
                 state.loading = false;
                 state.error = action.error.message || "Failed to add staff";
             })
     },


 })
export const {addStaffReducer, updateStaffReducer,deleteStaffReducer} = staffSlice.actions;
export default staffSlice.reducer;