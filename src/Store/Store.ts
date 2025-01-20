import {configureStore} from "@reduxjs/toolkit";

import authReducer from "../Features/AuthSlice.ts";
import fieldReducer from "../Features/FieldSlice.ts";
import cropReducer from "../Features/CropSlice.ts";
import staffReducer from "../Features/StaffSlice.ts";
import vehicleReducer from "../Features/VehicleSlice.ts";
import equipmentReducer from "../Features/EquipmentSlice.ts";

const store = configureStore({
    reducer: {
        auth:authReducer,
        field:fieldReducer,
        crop:cropReducer,
        staff:staffReducer,
        vehicle:vehicleReducer,
        equipment:equipmentReducer
    }
});
export default store;