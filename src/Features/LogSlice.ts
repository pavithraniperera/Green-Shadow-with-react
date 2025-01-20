import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logs: [],
};

const LogSlice = createSlice({
    name: "log",
    initialState: initialState,
    reducers: {
        // Add a new log
        addLog: (state, action) => {
            console.log("Action Payload:", action.payload);
            state.logs.push(action.payload); // Immer handles immutability
            console.log("Updated Logs Array:", state.logs);
        },
        // Update an existing log
        updateLog: (state, action) => {
            console.log("Action Payload:", action.payload);
            const { logId, updatedLog } = action.payload;
            state.logs = state.logs.map(log =>
                log.logId === logId ? { ...log, ...updatedLog } : log
            );
        },
        // Delete a log by ID
        deleteLog: (state, action) => {
            console.log("Delete Log ID:", action.payload);
            state.logs = state.logs.filter(log => log.logId !== action.payload);
        },
    },
});


export const { addLog, updateLog, deleteLog } = LogSlice.actions;
export default LogSlice.reducer;
