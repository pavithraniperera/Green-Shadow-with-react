import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {notifyError, notifySuccess} from "../utils/ToastNotification.ts";

const api = axios.create({
    baseURL: "http://localhost:3000/log",
});

const initialState = {
    logs: [],
    loading: false,
    error: null
};
export const addLog = createAsyncThunk(
    "logs/addLog",
    async (formData: FormData) => {
        const token = localStorage.getItem("accessToken");

        try {
            const response = await api.post("add", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            notifySuccess("Add Log successfully");
            return response.data;
        } catch (err) {
            notifyError("Error saving log");
            console.error("Error saving log:", err);
            throw err;
        }
    }
);

// Update an existing log (Multipart FormData)
export const updateLog = createAsyncThunk(
    "logs/updateLog",
    async ({ logId, formData }: { logId: string; formData: FormData }) => {
        const token = localStorage.getItem("accessToken");

        try {
            const response = await api.put(`update/${logId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            notifySuccess("Updated Log successfully");
            return response.data;
        } catch (err) {
            notifyError("Error Updating log");
            console.error("Error updating log:", err);
            throw err;
        }
    }
);

// Delete a log by ID
export const deleteLog = createAsyncThunk(
    "logs/deleteLog",
    async (logId: string) => {
        const token = localStorage.getItem("accessToken");

        try {
            await api.delete(`delete/${logId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            notifySuccess("Successfully deleted log")
            return logId; // Return logId to remove from state
        } catch (err) {
            notifyError("Error Occurred while deleting Log")
            console.error("Error deleting log:", err);
            throw err;
        }
    }
);

// Fetch all logs
export const fetchLogs = createAsyncThunk(
    "logs/fetchLogs",
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
            console.error("Error fetching logs:", err);
            throw err;
        }
    }
);

const LogSlice = createSlice({
    name: "log",
    initialState: initialState,
    reducers: {
        // Add a new log
        addLogLocal: (state, action) => {
            console.log("Action Payload:", action.payload);
            state.logs.push(action.payload); // Immer handles immutability
            console.log("Updated Logs Array:", state.logs);
        },
        // Update an existing log
        updateLogLocal: (state, action) => {
            console.log("Action Payload:", action.payload);
            const { logId, updatedLog } = action.payload;
            state.logs = state.logs.map(log =>
                log.logId === logId ? { ...log, ...updatedLog } : log
            );
        },
        // Delete a log by ID
        deleteLogLocal: (state, action) => {
            console.log("Delete Log ID:", action.payload);
            state.logs = state.logs.filter(log => log.logId !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addLog.pending, (state) => {
                state.loading = true;
            })
            .addCase(addLog.fulfilled, (state, action) => {
                state.loading = false;
                state.logs.push(action.payload);
            })
            .addCase(addLog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(updateLog.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateLog.fulfilled, (state, action) => {
                state.loading = false;
                state.logs = state.logs.map(log =>
                    log.logId === action.payload.logId ? action.payload : log
                );
            })
            .addCase(updateLog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(deleteLog.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteLog.fulfilled, (state, action) => {
                state.loading = false;
                state.logs = state.logs.filter(log => log.logId !== action.payload);
            })
            .addCase(deleteLog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(fetchLogs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLogs.fulfilled, (state, action) => {
                state.loading = false;
                state.logs = action.payload;
            })
            .addCase(fetchLogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});


export const { addLogLocal, updateLogLocal, deleteLogLocal } = LogSlice.actions;
export default LogSlice.reducer;
