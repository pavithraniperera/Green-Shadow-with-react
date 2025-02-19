import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Vehicle from "../../models/Vehicle.ts";
import {addVehicle, updateVehicle} from "../../Features/VehicleSlice.ts";

export default function AddVehicleModalComponent({isOpen, onClose,vehicle=null}) {
    const staff = useSelector((state) => state.staff.staff);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        vehicleId:  "",
        plateNumber:  "",
        category:  "",
        fuelType:  "",
        status:  "",
        remarks:  "",
        staffId:  "",
    });
    useEffect(() => {
        if (vehicle) {
            setFormData({
                vehicleId: vehicle?.vehicleId,
                plateNumber: vehicle?.plateNumber ,
                category: vehicle?.category ,
                fuelType: vehicle?.fuelType ,
                status: vehicle?.status ,
                remarks: vehicle?.remarks ,
                staffId: vehicle?.staffId ,
            });
        }
    }, [vehicle]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };



    const handleSave = () => {
        if (vehicle) {
            handleUpdateVehicle()

        } else {
            handleAddVehicle();
        }
        onClose();
    };


    const handleAddVehicle = () => {
        console.log('Form Data:', formData);
        const payload = new Vehicle(formData.vehicleId,formData.category,formData.fuelType,formData.plateNumber,formData.status,formData.staffId,formData.remarks)

        console.log(payload);

        dispatch(addVehicle(payload));



        onClose();
    };
    const handleUpdateVehicle = () => {
        const payload = {
            vehicleId: formData.vehicleId,
            updatedVehicle:new Vehicle(formData.vehicleId,formData.category,formData.fuelType,formData.plateNumber,formData.status,formData.staffId,formData.remarks)
        }
        dispatch(updateVehicle(payload));



    }
    return(
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-background w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                        <div className="flex justify-between items-center border-b pb-4">
                            <h4 className="text-2xl font-bold text-green-700">{vehicle ? "Update Vehicle" : "Add New Vehicle"}</h4>
                            <button className="modal-btn" onClick={onClose}>
                                &times;
                            </button>
                        </div>

                        <div className="p-6">
                            <form>
                                {/* Vehicle Id */}
                                <div className="mb-4">
                                    <label htmlFor="plateNumber" className="field-label">
                                        Vehicle Id
                                    </label>
                                    <input
                                        type="text"
                                        id="vehicleId"
                                        name="vehicleId"
                                        className="field-input-css mt-2"
                                        value={formData.vehicleId}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                {/* License Plate */}
                                <div className="mb-4">
                                    <label htmlFor="plateNumber" className="field-label">
                                        License Plate
                                    </label>
                                    <input
                                        type="text"
                                        id="plateNumber"
                                        name="plateNumber"
                                        className="field-input-css mt-2"
                                        value={formData.plateNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* Category */}
                                <div className="mb-4">
                                    <label htmlFor="category" className="field-label">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        className="field-input-css mt-2"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* Fuel Type */}
                                <div className="mb-4">
                                    <label htmlFor="fuelType" className="field-label">
                                        Fuel Type
                                    </label>
                                    <select
                                        id="fuelType"
                                        name="fuelType"
                                        className="field-input-css mt-2"
                                        value={formData.fuelType}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Fuel Type</option>
                                        <option value="Petrol">Petrol</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Electric">Electric</option>
                                    </select>
                                </div>

                                {/* Status */}
                                <div className="mb-4">
                                    <label htmlFor="status" className="field-label">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        className="field-input-css mt-2"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>

                                {/* Assigned Staff */}

                                <div className="mb-4">
                                    <label htmlFor="staffId" className="field-label">
                                        Assigned staff
                                    </label>
                                    <div className="flex items-center mt-1">
                                        <select
                                            id="staffId"
                                            name="staffId"
                                            className="field-input-css"
                                            value={formData.staffId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Staff</option>
                                            {staff.map((member) => (
                                                <option key={member.staffId} value={member.staffId}>
                                                    {member.firstName} {member.lastName}
                                                </option>
                                            ))}
                                        </select>

                                    </div>
                                </div>

                                {/* Remarks */}
                                <div className="mb-4">
                                    <label htmlFor="remarks" className="field-label">
                                        Remarks
                                    </label>
                                    <textarea
                                        id="remarks"
                                        name="remarks"
                                        className="field-input-css"
                                        value={formData.remarks}
                                        onChange={handleInputChange}
                                        rows="3"
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <button className="modal-btn" onClick={onClose}>
                                Cancel
                            </button>
                            <button className="modal-btn" onClick={handleSave}>
                                {vehicle ? "Save Changes" : "Add Vehicle"}
                            </button>
                        </div>
                    </div>
                </div>
            )
            }

        </>
    )


}