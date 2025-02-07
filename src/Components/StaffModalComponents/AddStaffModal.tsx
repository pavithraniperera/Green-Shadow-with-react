import {useEffect, useState} from "react";
import {Staff} from "../../models/Staff.ts";
import {useDispatch, useSelector} from "react-redux";
import {addStaff, updateStaff} from "../../Features/StaffSlice.ts";
import '../../assets/CustomCss/CustomCss.css';

export default function AddStaffModal({isOpen, onClose,staff=null}) {
    const fields = useSelector((state: any) => state.field.fields)
    const dispatch = useDispatch();
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        address: "",
        gender: "",
        role: "",
        designation: "",
        joinDate: "",
        assignedField: ""
    });
    useEffect(() => {
        if (staff) {
            setFormData({
                firstName: staff.firstName,
                lastName: staff.lastName,
                email: staff.email,
                contactNumber:staff.contactNumber,
                address: staff.address,
                gender: staff.gender,
                role: staff.role,
                designation: staff.designation,
                joinDate: formatDate(staff.joinDate),
                assignedField: staff.assignedField,
            });
        }
    }, [staff]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value, // Dynamically update the field based on its ID
        }));
    };
    const handleSave = () => {
        if (staff) {
            handleUpdateStaff()

        } else {
            handleAddStaff();
        }
        onClose();
    };



    const handleAddStaff = () => {
        console.log('Form Data:', formData);
        const payload = new Staff(formData.firstName, formData.lastName,formData.gender,new Date(formData.joinDate),formData.email,formData.contactNumber
            ,formData.address,formData.designation,formData.role,formData.assignedField);

        console.log(payload);

        dispatch(addStaff(payload));



        onClose();
    };
    const handleUpdateStaff = () => {
        const payload = {
            email: formData.email,
            updatedMember:new Staff(formData.firstName, formData.lastName,formData.gender,new Date(formData.joinDate),formData.email,formData.contactNumber,
                formData.address,formData.designation,formData.role,formData.assignedField)
        }
        dispatch(updateStaff(payload));



    }

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-background w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                        <div className="flex justify-between items-center border-b pb-4">
                            <h4 className="text-2xl font-bold text-green-700">{staff ? "Update Staff" : "Add New Staff"}</h4>
                            <button className="modal-btn" onClick={onClose}>&times;</button>
                        </div>

                        <div className="p-6">
                            <form>

                                {/* First Name */}
                                <div className="mb-4">
                                    <label htmlFor="firstName" className="field-label">First Name</label>
                                    <input type="text" id="firstName" className="field-input-css"
                                           value={formData.firstName} onChange={handleInputChange} required/>
                                </div>

                                {/* Last Name */}
                                <div className="mb-4">
                                    <label htmlFor="lastName" className="field-label">Last Name</label>
                                    <input type="text" id="lastName" className="field-input-css" value={formData.lastName}
                                           onChange={handleInputChange} required/>
                                </div>

                                {/* Email */}
                                <div className="mb-4">
                                    <label htmlFor="email" className="field-label">Email</label>
                                    <input type="email" id="email" className="field-input-css" value={formData.email}
                                           onChange={handleInputChange} required/>
                                </div>

                                {/* Address */}
                                <div className="mb-4">
                                    <label htmlFor="address" className="field-label">Address</label>
                                    <input type="text" id="address" className="field-input-css" value={formData.address}
                                           onChange={handleInputChange} required/>
                                </div>

                                {/* Contact */}
                                <div className="mb-4">
                                    <label htmlFor="contactNumber" className="field-label">Contact</label>
                                    <input type="text" id="contactNumber" className="field-input-css" value={formData.contactNumber}
                                           onChange={handleInputChange} required/>
                                </div>


                                {/* Gender */}
                                <div className="mb-4">
                                    <label htmlFor="gender" className="field-label">Gender</label>
                                    <select id="gender" className="field-input-css" value={formData.gender}
                                            onChange={handleInputChange} required>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>

                                {/* Role */}
                                <div className="mb-4">
                                    <label htmlFor="role" className="field-label">Role</label>
                                    <select id="role" className="field-input-css" value={formData.role}
                                            onChange={handleInputChange} required>
                                        <option value="">Select Role</option>
                                        <option value="MANAGER">Manager</option>
                                        <option value="ADMINISTRATOR">Administrator</option>
                                        <option value="SCIENTIST">Scientist</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>

                                {/* Designation */}
                                <div className="mb-4">
                                    <label htmlFor="designation" className="field-label">Designation</label>
                                    <input type="text" id="designation" className="field-input-css"
                                           value={formData.designation} onChange={handleInputChange} required/>
                                </div>

                                {/* Date of Joined */}
                                <div className="mb-4">
                                    <label htmlFor="joinDate" className="field-label">Date of Joined</label>
                                    <input type="date" id="joinDate" className="field-input-css" value={formData.joinDate}
                                           onChange={handleInputChange} required/>
                                </div>

                                {/* Assigned Fields */}
                                <div className="mb-4">
                                    <label htmlFor="assignedField" className="field-label">Assigned Fields</label>
                                    <select id="assignedField" className="field-input-css" value={formData.assignedField}
                                            onChange={handleInputChange} required>
                                        <option value="">Select Field</option>
                                        {fields.map((field) => (
                                            <option key={field.fieldId} value={field.fieldId}>{field.fieldname}</option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <button className="modal-btn" onClick={onClose}>Cancel</button>
                            <button className="modal-btn" onClick={handleSave}>{staff ? "Save Changes" : "Add Staff"}</button>
                        </div>
                    </div>
                </div>
            )
            }
        </>




)

}