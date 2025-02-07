import {configureStore} from "@reduxjs/toolkit";

import authReducer from "../Features/AuthSlice.ts";
import fieldReducer from "../Features/FieldSlice.ts";
import cropReducer from "../Features/CropSlice.ts";
import staffReducer from "../Features/StaffSlice.ts";
import vehicleReducer from "../Features/VehicleSlice.ts";
import equipmentReducer from "../Features/EquipmentSlice.ts";
import logReducer from "../Features/LogSlice.ts";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        field: fieldReducer,
        crop: cropReducer,
        staff: staffReducer,
        vehicle: vehicleReducer,
        equipment: equipmentReducer,
        log: logReducer
    }
});

export type AppDispatch = typeof store.dispatch;

