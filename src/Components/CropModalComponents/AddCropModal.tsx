import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import '../../assets/CustomCss/CustomCss.css';


import Crop from "../../models/Crop.ts";
import {addCrop, UpdateCrop} from "../../Features/CropSlice.ts";

export default function AddCropModal({isOpen, onClose,crop=null}) {
    const fields = useSelector((state: any) => state.field.fields)
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        cropId: "",
        specificName: "",
        commonName: "",
        category: "",
        fieldId: "",
        season: "",
        image: ""
    });
    useEffect(() => {
        if (crop) {
            setFormData({
                cropId: crop.cropId,
                specificName: crop.specificName,
                commonName: crop.commonName,
                category: crop.category,
                fieldId: crop.fieldId,
                season: crop.season,
                image: crop.image
            });

            // Set previewSrc to display the current crop image
            setPreviewSrc(crop.image || "");
        } else {
            // Reset form data and previewSrc when adding a new crop
            setFormData({
                cropId: "",
                specificName: "",
                commonName: "",
                category: "",
                fieldId: "",
                season: "",
                image: ""
            });
            setPreviewSrc("");
        }
    }, [crop]);
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };
    const [previewSrc, setPreviewSrc] = useState("");
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewSrc(reader.result);
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSave = () => {
        if (crop) {
            handleUpdateCrop()

        } else {
            handleAddCrop(); // Call add handler otherwise
        }
        onClose();
    };


    const handleAddCrop = () => {
        console.log('Form Data:', formData);
        const payload = new Crop(formData.cropId, formData.fieldId,formData.commonName,formData.specificName,formData.category,formData.season,formData.image);

        console.log(payload);

        dispatch(addCrop(payload));
        console.log('Updated crop Array:', fields);



        onClose();
    };
    const handleUpdateCrop = () => {
        const payload = {
            Id: formData.cropId,
            updatedField:new Crop(formData.cropId, formData.fieldId,formData.commonName,formData.specificName,formData.category,formData.season,formData.image)
        }
        dispatch(UpdateCrop(payload));
        console.log('Updated Fields Array:', fields);


    }

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-background">
                        <div className="flex justify-between items-center border-b pb-4">
                            <h4 className="text-2xl font-bold font-itim text-green-700"> {crop ? "Update Crop" : "Add New Crop"}</h4>
                            <button
                                className="modal-btn"
                                onClick={onClose}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="p-6">
                            <form>
                            {/* Crop ID */}
                                <div className="mb-4">
                                    <label htmlFor="cropId" className="field-label">
                                        Crop ID
                                    </label>
                                    <input
                                        type="text"
                                        id="cropId"
                                        className="field-input-css"
                                        value={formData.cropId}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* Special Name */}
                                <div className="mb-4">
                                    <label htmlFor="specialName" className="field-label">
                                        Special Name
                                    </label>
                                    <input
                                        type="text"
                                        id="specialName"
                                        className="field-input-css"
                                        value={formData.specialName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* Common Name */}
                                <div className="mb-4">
                                    <label htmlFor="commonName" className="field-label">
                                        Common Name
                                    </label>
                                    <input
                                        type="text"
                                        id="commonName"
                                        className="field-input-css"
                                        value={formData.commonName}
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
                                        className="field-input-css"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* Field (Dropdown) */}
                                <div className="mb-4">
                                    <label htmlFor="fieldId" className="field-label">
                                        Field
                                    </label>
                                    <div className="flex items-center mt-1">
                                        <select
                                            id="fieldId"
                                            className="field-input-css"
                                            value={formData.fieldId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Field</option>
                                            {fields.map((field) => (
                                                <option key={field.fieldId} value={field.fieldId}>
                                                    {field.fieldname}
                                                </option>
                                            ))}
                                        </select>

                                    </div>
                                </div>

                                {/* Season */}
                                <div className="mb-4">
                                    <label htmlFor="season" className="field-label">
                                        Season
                                    </label>
                                    <input
                                        type="text"
                                        id="season"
                                        className="field-input-css"
                                        value={formData.season}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* Image Upload */}
                                <div className="mb-4">

                                    <label
                                        htmlFor="CropImage"
                                        className="field-label"
                                    >
                                        Upload Crop Image
                                    </label>
                                    <input
                                        type="file"
                                        id="cropImage"
                                        className="block text-sm font-medium cursor-pointer bg-gray-100 px-4 py-2 rounded-lg text-center hover:bg-gray-200"
                                        onChange={handleImageChange}
                                    />
                                    {previewSrc && (
                                        <img
                                            src={previewSrc}
                                            alt="Preview"
                                            className="mt-3 w-full h-40 object-cover rounded-lg "
                                        />
                                    )}
                                </div>
                            </form>
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                className="modal-btn"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="modal-btn"
                                onClick={handleSave}
                            >
                                {crop ? "Save Changes" : "Add Crop"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>

    );
}