import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";




const api =axios.create({
    baseURL: "http://localhost:3000/auth",
})

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ email, password, role }: { email: string; password: string; role: string }) => {
        console.log(role,email,password);
        try {
            const response = await api.post('register', { email, password, role });
            return response.data;
        } catch (error) {
            return  ("Registration failed :" + error.message);
        }
    }
);
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }: { email: string; password: string }) => {
        try {
            const response = await api.post('login', { email, password });
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            return response.data; // User + Tokens
        } catch (error) {
            return  "Login failed :" + error.message;
        }
    }
);
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
});



const initialState = {
    user:null,
    isAuthenticated: false,
    loading:false,
    error:null,
    successMessage :"null"
}
const authSlice = createSlice({
    name: "auth",
    initialState :initialState,
    reducers:{
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers:(builder) => {
      builder
          // Login Cases

          .addCase(loginUser.pending, (state) => {
              state.loading = true;
              state.error = null;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
              state.loading = false;
              state.isAuthenticated = true;
              state.successMessage = "Login successfully! Redirecting to Dashboard...";



          })
          .addCase(loginUser.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload as string;

          })
          // Register Cases
          .addCase(registerUser.pending, (state) => {
              state.loading = true;
              state.error = null;
          })
          .addCase(registerUser.fulfilled, (state,action) => {
              state.loading = false;
              state.user = action.payload.user;

              state.successMessage ="Account created successfully! Redirecting to login..."


          })
          .addCase(registerUser.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload as string;

          })
          // Logout Case
          .addCase(logoutUser.fulfilled, (state) => {
              state.user = null;
              state.isAuthenticated = false;
          });

    }

})
export const {login, logout} = authSlice.actions;
export default authSlice.reducer;