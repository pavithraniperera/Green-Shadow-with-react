import {configureStore} from "@reduxjs/toolkit";

import authReducer from "../Features/AuthSlice.ts";
import fieldReducer from "../Features/FieldSlice.ts";

const store = configureStore({
    reducer: {
        auth:authReducer,
        field:fieldReducer,
    }
});
export default store;