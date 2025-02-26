import SearchBarComponent from "../Components/SearchBarComponent.tsx";

import {Staff} from "../models/Staff.ts";
import {useDispatch, useSelector} from "react-redux";
import MainContainer from "../Components/MainContainer.tsx";
import {useEffect, useState} from "react";
import AddBtnComponent from "../Components/AddBtnComponent.tsx";

import AddStaffModal from "../Components/StaffModalComponents/AddStaffModal.tsx";
import '../assets/CustomCss/CustomCss.css';
import {deleteStaff, fetchStaff} from "../Features/StaffSlice.ts";
import {fetchFields} from "../Features/FieldSlice.ts";


export default function StaffPage() {
    const staff = useSelector((state: any) => state.staff.staff)
    const fields = useSelector((state: any) => state.field.fields)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const openStaffModal = () => {
        setIsModalOpen(true)
       // closeViewModal()
    };

    const closeStaffModal = () => {
       setSelectedStaff(null)
        setIsModalOpen(false);

    }
    useEffect(() => {

        dispatch(fetchStaff());
        dispatch(fetchFields())
    }, [dispatch]);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false); // View Modal State
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const openViewModal = (staff: Staff) => {
        setSelectedStaff(staff);
        setIsViewModalOpen(true);
    };

    const closeViewModal = () => {
        setIsViewModalOpen(false);
    };
    const handleUpdateModal=(selectedStaff:Staff)=>{
        console.log(selectedStaff)
        setSelectedStaff(selectedStaff)
        closeViewModal();
        openStaffModal()


    }
    const handleDelete = (selectedStaff:Staff) => {
        dispatch(deleteStaff(selectedStaff.staffId));
        closeViewModal()
        setSelectedStaff(null)
    }
    const getField =(fieldId:string) => {
        return fields.find(field => field.fieldId === fieldId)

    }
    const formatDate = (date) => new Date(date).toISOString().split('T')[0];

    const headers =["FirstName","LastName","Gender","Email","Contact","Designation","Role"];

    const renderStaffRow = (staff: Staff, index: number) => {

         return (
             <tr key={index} className="table-row" onClick={() => openViewModal(staff)}>
                 <td  className="table-data">{staff.firstName}</td>
                 <td  className="table-data">{staff.lastName}</td>
                 <td  className="table-data">{staff.gender}</td>
                 <td  className="table-data">{staff.email}</td>
                 <td  className="table-data">{staff.contact}</td>
                 <td  className="table-data">{staff.designation}</td>
                 <td  className="table-data">{staff.role}</td>
             </tr>
         )
    }
    return (
        <>
            <SearchBarComponent placeholder="Search Staff members ... " onChange=""/>
            <section className="flex justify-center items-center pt-10 md:pl-20 mx-auto">
                <MainContainer
                    dataArray={staff}
                    renderItem={renderStaffRow}
                    noDataMessage="No Staff to display"
                    tableHeaders={headers}
                    displayType="table"
                />
            </section>
            <div className="flex justify-center items-center pt-10 md:pl-20 mx-auto font-itim">
                <AddBtnComponent text="Add Staff" onClick={openStaffModal}/>
            </div>
            {isModalOpen && <AddStaffModal isOpen={isModalOpen} onClose={closeStaffModal} staff={selectedStaff} />
            }
            {isViewModalOpen && selectedStaff && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
                    aria-labelledby="staffDetailModalLabel"
                    aria-hidden="true"
                >
                    <div className="bg-amber-50 overflow-y-scroll rounded-lg shadow-2xl max-w-2xl w-full mx-4 sm:mx-8 my-8 relative max-h-[800px]">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-300">
                            <h4
                                className="text-2xl font-bold text-green-700 font-itim text-center"
                                id="staffDetailModalLabel"
                            >
                                <i className="fas fa-user mr-2"></i> Staff Member Details
                            </h4>
                            <button
                                type="button"
                                className="absolute top-4 right-4 text-3xl text-gray-500"
                                onClick={closeViewModal}
                            >
                                &times;
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="px-6 py-4">
                            <form id="staffDetailForm" className="space-y-4">

                                {/* First Name */}
                                <div>
                                    <label htmlFor="firstName" className="field-label">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="field-input-css"
                                        value={selectedStaff.firstName}
                                        readOnly
                                    />
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label htmlFor="lastName" className="field-label">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="field-input-css"
                                        value={selectedStaff.lastName}
                                        readOnly
                                    />
                                </div>

                                {/* Gender */}
                                <div>
                                    <label htmlFor="gender" className="field-label">
                                        Gender
                                    </label>
                                    <input
                                        type="text"
                                        id="gender"
                                        className="field-input-css"
                                        value={selectedStaff.gender}
                                        readOnly
                                    />
                                </div>

                                {/* Contact */}
                                <div>
                                    <label htmlFor="contact" className="field-label">
                                        Contact Number
                                    </label>
                                    <input
                                        type="text"
                                        id="contact"
                                        className="field-input-css"
                                        value={selectedStaff.contact}
                                        readOnly
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="field-label">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        className="field-input-css"
                                        value={selectedStaff.email}
                                        readOnly
                                    />
                                </div>

                                {/* Designation */}
                                <div>
                                    <label htmlFor="designation" className="field-label">
                                        Designation
                                    </label>
                                    <input
                                        type="text"
                                        id="designation"
                                        className="field-input-css"
                                        value={selectedStaff.designation}
                                        readOnly
                                    />
                                </div>

                                {/* date of join */}
                                <div>
                                    <label htmlFor="joinDate" className="field-label">
                                        Date of Join
                                    </label>
                                    <input
                                        type="text"
                                        id="joinDate"
                                        className="field-input-css"
                                        value={formatDate(selectedStaff.joinDate)}
                                        readOnly
                                    />
                                </div>

                                {/* date of birth */}
                                <div>
                                    <label htmlFor="dob" className="field-label">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="text"
                                        id="dob"
                                        className="field-input-css"
                                        value={formatDate(selectedStaff.dob)}
                                        readOnly
                                    />
                                </div>

                                {/* Role */}
                                <div>
                                    <label htmlFor="role" className="field-label">
                                        Role
                                    </label>
                                    <input
                                        type="text"
                                        id="role"
                                        className="field-input-css"
                                        value={selectedStaff.role}
                                        readOnly
                                    />
                                </div>

                                {/* Assigned Fields */}
                                <div>
                                    <label htmlFor="allocatedStaff" className="field-label">
                                        Allocated Fields
                                    </label>
                                    <input
                                        type="text"
                                        id="allocatedStaff"
                                        className="field-input-css"
                                        value={selectedStaff.fieldIds
                                            .map(fieldId => fields.find(f => f.fieldId === fieldId)?.name || "Unknown")
                                            .join(", ")}
                                        readOnly
                                    />

                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-gray-300 flex justify-end space-x-3">
                        <button
                                type="button"
                                className="modal-btn"
                                onClick={closeViewModal}
                            >
                                <i className="fas fa-times-circle"></i> Close
                            </button>
                            <button
                                type="button"
                                className="modal-btn"
                                id="staffUpdateBtn"
                                onClick={() => handleUpdateModal(selectedStaff)}
                            >
                                <i className="fas fa-edit"></i> Update
                            </button>
                            <button
                                type="button"
                                className="modal-btn"
                                id="staffDeleteBtn"
                              onClick={() => handleDelete(selectedStaff)}
                            >
                                <i className="fas fa-trash-alt"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>

)
}