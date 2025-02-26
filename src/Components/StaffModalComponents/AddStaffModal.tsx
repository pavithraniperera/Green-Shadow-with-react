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
        contact: "",
        address: "",
        gender: "",
        role: "",
        dob:"",
        designation: "",
        joinDate: "",
        fieldIds: []
    });
    useEffect(() => {
        if (staff) {
            setFormData({
                firstName: staff.firstName,
                lastName: staff.lastName,
                email: staff.email,
                contact:staff.contact,
                address: staff.address,
                gender: staff.gender,
                role: staff.role,
                dob: formatDate(staff.dob),
                designation: staff.designation,
                joinDate: formatDate(staff.joinDate),
                fieldIds: staff?.fieldIds,
            });
        }
    }, [staff]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // Dynamically update the field based on its ID
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
        const payload = new Staff(formData.firstName, formData.lastName,formData.gender,new Date(formData.joinDate),formData.email,formData.contact
            ,formData.address,formData.designation,formData.role,new Date(formData.dob),formData.fieldIds);

        console.log(payload);

        dispatch(addStaff(payload));



        onClose();
    };
    const handleUpdateStaff = () => {
        const payload = {
            staffId: staff.staffId,
            updatedMember:new Staff(formData.firstName, formData.lastName,formData.gender,new Date(formData.joinDate),formData.email,formData.contact,
                formData.address,formData.designation,formData.role,new Date(formData.dob),formData.fieldIds)
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
                                    <input name="firstName" type="text" id="firstName" className="field-input-css"
                                           value={formData.firstName} onChange={handleInputChange} required/>
                                </div>

                                {/* Last Name */}
                                <div className="mb-4">
                                    <label htmlFor="lastName" className="field-label">Last Name</label>
                                    <input type="text" name="lastName" id="lastName" className="field-input-css"
                                           value={formData.lastName}
                                           onChange={handleInputChange} required/>
                                </div>

                                {/* Email */}
                                <div className="mb-4">
                                    <label htmlFor="email" className="field-label">Email</label>
                                    <input type="email" name="email" id="email" className="field-input-css"
                                           value={formData.email}
                                           onChange={handleInputChange} required/>
                                </div>

                                {/* Address */}
                                <div className="mb-4">
                                    <label htmlFor="address" className="field-label">Address</label>
                                    <input type="text" name="address" id="address" className="field-input-css"
                                           value={formData.address}
                                           onChange={handleInputChange} required/>
                                </div>

                                {/* Contact */}
                                <div className="mb-4">
                                    <label htmlFor="contact" className="field-label">Contact</label>
                                    <input type="text" id="contact" name="contact"
                                           className="field-input-css"
                                           value={formData.contact}
                                           onChange={handleInputChange} required/>
                                </div>


                                {/* Gender */}
                                <div className="mb-4">
                                    <label htmlFor="gender" className="field-label">Gender</label>
                                    <select id="gender" name="gender" className="field-input-css"
                                            value={formData.gender}
                                            onChange={handleInputChange} required>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="dob" className="field-label">Date of Birth</label>
                                    <input type="date" id="dob" name="dob" className="field-input-css"
                                           value={formData.dob}
                                           onChange={handleInputChange} required/>
                                </div>

                                {/* Role */}
                                <div className="mb-4">
                                    <label htmlFor="role" className="field-label">Role</label>
                                    <select id="role" name="role" className="field-input-css" value={formData.role}
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
                                    <input type="text" id="designation" name="designation" className="field-input-css"
                                           value={formData.designation} onChange={handleInputChange} required/>
                                </div>

                                {/* Date of Joined */}
                                <div className="mb-4">
                                    <label htmlFor="joinDate" className="field-label">Date of Joined</label>
                                    <input type="date" id="joinDate" name="joinDate" className="field-input-css"
                                           value={formData.joinDate}
                                           onChange={handleInputChange} required/>
                                </div>


                                <div
                                    className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 border rounded p-2 overflow-y-scroll"> {/* Added grid layout */}
                                    {fields.map(f => (
                                        <div key={f.fieldId} className="flex items-center">
                                            <input
                                                name="fieldIds"
                                                type="checkbox"
                                                id={`field-${f.fieldId}`}
                                                value={f.fieldId}

                                                checked={formData.fieldIds.includes(f.fieldId)}
                                                onChange={(e) => {
                                                    const updateField = formData.fieldIds.includes(f.fieldId)
                                                        ? formData.fieldIds.filter(id => id !== f.fieldId)
                                                        : [...formData.fieldIds, f.fieldId];
                                                    setFormData(prev => ({...prev, fieldIds: updateField}));
                                                }}
                                                className="mr-2"
                                            />
                                            <label htmlFor={`field-${f.fieldId}`} className="text-[16px]">
                                                {f.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </form>
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <button className="modal-btn" onClick={onClose}>Cancel</button>
                            <button className="modal-btn"
                                    onClick={handleSave}>{staff ? "Save Changes" : "Add Staff"}</button>
                        </div>
                    </div>
                </div>
            )
            }
        </>


    )

}