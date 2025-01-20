import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Logs from "../../models/Logs.ts";
import {addLog, updateLog} from "../../Features/LogSlice.ts";

export default function LogsAddModal({ isOpen, onClose, log = null }) {
    const staff = useSelector((state) => state.staff.staff);
    const crops = useSelector((state) => state.crop.crops);
    const fields = useSelector((state) => state.field.fields);

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        logId:"",
        description:"",
        field:"",
        crop:"",
        staff:[],
        status:"",
        image:"",
    });

    useEffect(() => {
        if (log) {
            setFormData({
                logId:log.logId,
                description:log.description,
                field:log.field,
                crop:log.crop,
                staff:log.staff,
                status:log.status,
                image:log.image,
            });
        }
    }, [log]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value, // Dynamically update the field based on its ID
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSaveLog = () => {
        if (log) {
            handleUpdateLog();
        } else {
            handleAddLog();
        }
        onClose();
    };
    const today = new Date().toISOString();

    const handleAddLog = () => {
        console.log("Form Data:", formData);
        const payload = new Logs(
            formData.logId,
            formData.description,
            formData.field,
            formData.crop,
            formData.staff,
            formData.status,
            formData.image,
            today
        );

        console.log(payload);

        dispatch(addLog(payload));

        onClose();
    };

    const handleUpdateLog = () => {
        const payload = {
            logId: formData.logId,
            updatedLog: new Logs(
                formData.logId,
                formData.description,
                formData.field,
                formData.crop,
                formData.staff,
                formData.status,
                formData.image,
                today
            ),
        };

        dispatch(updateLog(payload));
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-background w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                        <div className="flex justify-between items-center border-b pb-4">
                            <h4 className="text-2xl font-bold text-green-700">{log ? "Update Log" : "Add New Log"}</h4>
                            <button className="modal-btn" onClick={onClose}>
                                &times;
                            </button>
                        </div>

                        <div className="p-6">
                            <form>
                                {/* Log ID */}
                                <div className="mb-4">
                                    <label htmlFor="logId" className="field-label">
                                        Log ID
                                    </label>
                                    <input
                                        type="text"
                                        id="logId"
                                        className="field-input-css"
                                        value={formData.logId}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                {/* Log Description */}
                                <div className="mb-4">
                                    <label htmlFor="logDescription" className="field-label">
                                        Log Description
                                    </label>
                                    <textarea
                                        id="logDescription"
                                        name="logDescription"
                                        className="field-input-css mt-2"
                                        rows="3"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Dynamic Fields */}
                                <div className="mb-4">
                                    <label htmlFor="field" className="field-label">Assigned Fields</label>
                                    <select id="field" className="field-input-css"
                                            value={formData.field}
                                            onChange={handleInputChange} required>
                                        <option value="">Select Field</option>
                                        {fields.map((field) => (
                                            <option key={field.fieldId} value={field.fieldId}>{field.fieldname}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* Crops */}
                                <div className="mb-4">
                                    <label htmlFor="crop" className="field-label">Assigned Fields</label>
                                    <select id="crop" className="field-input-css"
                                            value={formData.crop ? formData.crop : "N/A"}
                                            onChange={handleInputChange} required>
                                        <option value="">Select Field</option>
                                        {crops.map((crop) => (
                                            <option key={crop.cropId} value={crop.cropId}>{crop.commonName}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* Staff */}
                                <div className="mb-4">
                                    <label className="field-label">Assigned Staff</label>
                                    <div
                                        className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 border rounded p-2 overflow-y-scroll">
                                        {staff.map(s => (
                                            <div key={s.email} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`staff-${s.email}`}
                                                    value={s.email}

                                                    checked={formData.staff.includes(s.email)}
                                                    onChange={(e) => {
                                                        const updatedStaff = formData.staff.includes(s.email)
                                                            ? formData.staff.filter(email => email !== s.email)
                                                            : [...formData.staff, s.email];
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
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Complete">Complete</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                </div>

                                {/* Image Upload */}
                                <div className="mb-4">
                                    <label htmlFor="image" className="field-label">
                                        Upload Image
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        className="field-input-css mt-2"
                                        onChange={handleFileChange}
                                    />
                                    {formData.image && (
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="mt-2 w-32 h-32 object-cover rounded"
                                        />
                                    )}
                                </div>
                            </form>
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <button className="modal-btn" onClick={onClose}>
                                Cancel
                            </button>
                            <button className="modal-btn" onClick={handleSaveLog}>
                                {log ? "Save Changes" : "Add Log"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

}
