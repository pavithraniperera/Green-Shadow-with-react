import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {addLog, updateLog} from "../../Features/LogSlice.ts";

export default function LogsAddModal({ isOpen, onClose, log = null }) {
    const staff = useSelector((state) => state.staff.staff);
    const crops = useSelector((state) => state.crop.crops);
    const fields = useSelector((state) => state.field.fields);

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        logId:"",
        logDetails:"",
        fieldId:"",
        cropId:"",
        staffId:'',
        status:"",
        image2:null,
    });

    useEffect(() => {
        if (log) {
            setFormData({
                logId:log.logId,
                logDetails:log.logDetails,
                fieldId:log.fieldId,
                cropId:log.cropId,
                staffId:log.staffId,
                status:log.status,
                image2:log.image2,
            });
            setPreviewSrc(log.image2 ? `http://localhost:3000/${log.image2}` : "");
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
            setPreviewSrc(URL.createObjectURL(file)); // Show preview of the image
            setFormData({ ...formData, image2: file }); // Store file object
        }
    };
    const [previewSrc, setPreviewSrc] = useState("");
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
        // const payload = new Logs(
        //     formData.logId,
        //     formData.logDetails,
        //     formData.field,
        //     formData.crop,
        //     formData.staff,
        //     formData.status,
        //     formData.image,
        //     today
        // );
        const formDataToSend = new FormData();

        formDataToSend.append("logDetails", formData.logDetails);
        formDataToSend.append("fieldId", formData.fieldId);
        formDataToSend.append("cropId", formData.cropId);
        formDataToSend.append("staffId", formData.staffId);
        formDataToSend.append("status", formData.status);
        formDataToSend.append("date", today);
        if (formData.image2) {
            formDataToSend.append("image", formData.image2);
        }




        dispatch(addLog(formDataToSend));

        onClose();
    };

    const handleUpdateLog = () => {
      /*  const payload = {
            logId: formData.logId,
            updatedLog: new Logs(
                formData.logId,
                formData.logDetails,
                formData.field,
                formData.crop,
                formData.staff,
                formData.status,
                formData.image,
                today
            ),
        };*/
        const formDataToSend = new FormData();

        formDataToSend.append("logDetails", formData.logDetails);
        formDataToSend.append("fieldId", formData.fieldId);
        formDataToSend.append("cropId", formData.cropId);
        formDataToSend.append("staffId", formData.staffId);
        formDataToSend.append("status", formData.status);
        formDataToSend.append("date", today);
        if (formData.image2) {
            formDataToSend.append("image", formData.image2);
        }
        const payload = {
            logId:formData.logId,
            formData: formDataToSend,
        }

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
                                        id="logDetails"
                                        name="logDetails"
                                        className="field-input-css mt-2"
                                        rows="3"
                                        value={formData.logDetails}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Dynamic Fields */}
                                <div className="mb-4">
                                    <label htmlFor="fieldId" className="field-label">Assigned Fields</label>
                                    <select id="fieldId" className="field-input-css"
                                            value={formData.fieldId}
                                            onChange={handleInputChange} required>
                                        <option value="">Select Field</option>
                                        {fields.map((field) => (
                                            <option key={field.fieldId} value={field.fieldId}>{field.name}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* Crops */}
                                <div className="mb-4">
                                    <label htmlFor="cropId" className="field-label">Assigned Fields</label>
                                    <select id="cropId" className="field-input-css"
                                            value={formData.cropId ? formData.cropId : "N/A"}
                                            onChange={handleInputChange} required>
                                        <option value="">Select Crop</option>
                                        {crops.map((crop) => (
                                            <option key={crop.cropId} value={crop.cropId}>{crop.commonName}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Staff */}

                                <div className="mb-4">
                                    <label htmlFor="staffId" className="field-label">Assigned Staff</label>
                                    <select id="staffId" className="field-input-css"
                                            value={formData.staffId ? formData.staffId : "N/A"}
                                            onChange={handleInputChange} required>
                                        <option value="">Select Staff</option>
                                        {staff.map((s) => (
                                            <option key={s.staffId} value={s.staffId}>{s.firstName} {s.lastName}</option>
                                        ))}
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
                                    {previewSrc && (
                                        <img
                                            src={previewSrc}
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
