import {configureStore} from "@reduxjs/toolkit";

import authReducer from "../Features/AuthSlice.ts";

const store = configureStore({
    reducer: {
        auth:authReducer,
    }
});
export default store;