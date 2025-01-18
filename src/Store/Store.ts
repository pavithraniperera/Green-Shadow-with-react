import {configureStore} from "@reduxjs/toolkit";

import authReducer from "../Features/AuthSlice.ts";
import fieldReducer from "../Features/FieldSlice.ts";
import cropReducer from "../Features/CropSlice.ts";

const store = configureStore({
    reducer: {
        auth:authReducer,
        field:fieldReducer,
        crop:cropReducer
    }
});
export default store;