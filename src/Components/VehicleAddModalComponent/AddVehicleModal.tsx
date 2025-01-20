import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Vehicle from "../../models/Vehicle.ts";
import {addVehicle, updateVehicle} from "../../Features/VehicleSlice.ts";

export default function AddVehicleModalComponent({isOpen, onClose,vehicle=null}) {
    const staff = useSelector((state) => state.staff.staff);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        vehicleId:  "",
        licensePlate:  "",
        category:  "",
        fuelType:  "",
        status:  "",
        remarks:  "",
        allocatedStaff:  [],
    });
    useEffect(() => {
        if (vehicle) {
            setFormData({
                vehicleId: vehicle?.vehicleId,
                licensePlate: vehicle?.licensePlate ,
                category: vehicle?.category ,
                fuelType: vehicle?.fuelType ,
                status: vehicle?.status ,
                remarks: vehicle?.remarks ,
                allocatedStaff: vehicle?.allocatedStaff ,
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
        const payload = new Vehicle(formData.vehicleId,formData.category,formData.fuelType,formData.licensePlate,formData.status,formData.allocatedStaff,formData.remarks)

        console.log(payload);

        dispatch(addVehicle(payload));



        onClose();
    };
    const handleUpdateVehicle = () => {
        const payload = {
            vehicleId: formData.vehicleId,
            updatedVehicle:new Vehicle(formData.vehicleId,formData.category,formData.fuelType,formData.licensePlate,formData.status,formData.allocatedStaff,formData.remarks)
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
                                    <label htmlFor="licensePlate" className="field-label">
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
                                    <label htmlFor="licensePlate" className="field-label">
                                        License Plate
                                    </label>
                                    <input
                                        type="text"
                                        id="licensePlate"
                                        name="licensePlate"
                                        className="field-input-css mt-2"
                                        value={formData.licensePlate}
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
                                    <label className="field-label">Assigned Staff</label>
                                    <div
                                        className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 border rounded p-2 overflow-y-scroll"> {/* Added grid layout */}
                                        {staff.map(s => (
                                            <div key={s.email} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`staff-${s.email}`}
                                                    value={s.email}

                                                    checked={formData.allocatedStaff.includes(s.email)}
                                                    onChange={(e) => {
                                                        const updatedStaff = formData.allocatedStaff.includes(s.email)
                                                            ? formData.allocatedStaff.filter(email => email !== s.email)
                                                            : [...formData.allocatedStaff, s.email];
                                                        setFormData(prev => ({...prev, allocatedStaff: updatedStaff}));
                                                    }}
                                                    className="mr-2"
                                                />
                                                <label htmlFor={`staff-${s.email}`} className="text-[16px]">
                                                    {s.firstName} {s.lastName}
                                                </label>
                                            </div>
                                        ))}
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