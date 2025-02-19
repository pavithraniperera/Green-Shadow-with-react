import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Equipment from "../../models/Equipment.ts";
import {addEquipment, updateEquipment} from "../../Features/EquipmentSlice.ts";
import "../../assets/CustomCss/CustomCss.css";

export default function AddEquipmentModal({ isOpen, onClose, equipment = null }) {
    const fields = useSelector((state: any) => state.field.fields);
    const staff = useSelector((state: any) => state.staff.staff);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        equipmentId: "",
        name: "",
        type: "",
        status: "",
        remarks:"",
        staffId: "",
        fieldId: "",
    });

    useEffect(() => {
        if (equipment) {
            setFormData({
                equipmentId: equipment.equipmentId,
                name: equipment.name,
                type: equipment.type,
                status: equipment.status,
                remarks: equipment.remarks,
                staffId: equipment.staffId,
                fieldId: equipment.fieldId,
            });
        }
    }, [equipment]);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSave = () => {
        if (equipment) {
            handleUpdateEquipment();
        } else {
            handleAddEquipment();
        }
        onClose();
    };

    const handleAddEquipment = () => {
        const newEquipment = new Equipment(
            formData.equipmentId,
            formData.name,
            formData.type,
            formData.status,
            formData.remarks,
            formData.staffId,
            formData.fieldId
        );

        dispatch(addEquipment(newEquipment));
    };

    const handleUpdateEquipment = () => {
        const updatedEquipment = new Equipment(
            formData.equipmentId,
            formData.name,
            formData.type,
            formData.status,
            formData.remarks,
            formData.staffId,
            formData.fieldId
        );

        dispatch(updateEquipment({ equipmentId: formData.equipmentId, updatedEquipment }));
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-background w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                        <div className="flex justify-between items-center border-b pb-4">
                            <h4 className="text-2xl font-bold text-green-700">
                                {equipment ? "Update Equipment" : "Add New Equipment"}
                            </h4>
                            <button className="modal-btn" onClick={onClose}>
                                &times;
                            </button>
                        </div>

                        <div className="p-6">
                            <form>

                                {/* Equipment Id */}
                                <div className="mb-4">
                                    <label htmlFor="equipmentId" className="field-label">
                                        Equipment Id
                                    </label>
                                    <input
                                        type="text"
                                        id="equipmentId"
                                        className="field-input-css"
                                        value={formData.equipmentId}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                {/* Equipment Name */}
                                <div className="mb-4">
                                    <label htmlFor="name" className="field-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="field-input-css"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* Type */}
                                <div className="mb-4">
                                    <label htmlFor="type" className="field-label">
                                        Type
                                    </label>
                                    <select
                                        id="type"
                                        className="field-input-css"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Heavy Machinery">Heavy Machinery</option>
                                        <option value="Hand Tool">Hand Tool</option>
                                        <option value="Electrical Equipment">Electrical Equipment</option>
                                    </select>
                                </div>

                                {/* Status */}
                                <div className="mb-4">
                                    <label htmlFor="status" className="field-label">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        className="field-input-css"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Available">Available</option>
                                        <option value="InUse">In Use</option>
                                        <option value="Maintenance">Maintenance</option>
                                    </select>
                                </div>

                                {/* Assigned Staff */}
                                <div className="mb-4">
                                    <label htmlFor="staffId" className="field-label">
                                        Assigned Staff
                                    </label>
                                    <select
                                        id="staffId"
                                        className="field-input-css"
                                        value={formData.staffId}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Staff</option>
                                        {staff.map((member: any) => (
                                            <option key={member.staffId} value={member.staffId}>
                                                {member.firstName} {member.lastName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Assigned Fields */}
                                <div className="mb-4">
                                    <label htmlFor="fieldId" className="field-label">
                                        Assigned Fields
                                    </label>
                                    <select
                                        id="fieldId"
                                        className="field-input-css"
                                        value={formData.fieldId}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Field</option>
                                        {fields.map((field: any) => (
                                            <option key={field.fieldId} value={field.fieldId}>
                                                {field.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </div>
                        {/* Remarks */}
                        <div className="mb-4">
                            <label htmlFor="remarks" className="field-label ml-4">
                                Remarks
                            </label>
                            <textarea
                                id="remarks"
                                name="remarks"
                                className="field-input-css ml-4"
                                value={formData.remarks}
                                onChange={handleInputChange}
                                rows="3"
                            />
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <button className="modal-btn" onClick={onClose}>
                                Cancel
                            </button>
                            <button className="modal-btn" onClick={handleSave}>
                                {equipment ? "Save Changes" : "Add Equipment"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )

}