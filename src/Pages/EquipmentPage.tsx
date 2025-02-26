import SearchBarComponent from "../Components/SearchBarComponent.tsx";
import {useDispatch, useSelector} from "react-redux";
import Equipment from "../models/Equipment.ts";
import MainContainer from "../Components/MainContainer.tsx";
import AddBtnComponent from "../Components/AddBtnComponent.tsx";
import {useEffect, useState} from "react";
import AddEquipmentModal from "../Components/EquipmentModalComponents/AddEquipmentModal.tsx";
import {deleteEquipment, fetchEquipment} from "../Features/EquipmentSlice.ts";
import {fetchVehicles} from "../Features/VehicleSlice.ts";
import {fetchFields} from "../Features/FieldSlice.ts";
import {fetchStaff} from "../Features/StaffSlice.ts";


export default function EquipmentPage() {
    const dispatch = useDispatch();
    const equipments = useSelector((state: any) => state.equipment.equipments);
    const fields = useSelector((state: any) => state.field.fields);
    const staff = useSelector((state: any) => state.staff.staff);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const getField =(fieldId:string) => {
        return fields.find(field => field.fieldId === fieldId)

    }

    const getStaff=(staffId:string)=>{
        return staff.find(staffMember=>staffMember.staffId === staffId)
    }
    useEffect(() => {

        dispatch(fetchVehicles());
        dispatch(fetchFields());
        dispatch(fetchStaff())
        dispatch(fetchEquipment())
    }, [dispatch]);
    const openEquipModal = () => {
        setIsModalOpen(true)
        //closeViewModal()
    };
    const closeEquipModal = () => {
        setSelectedEquip(null)
        setIsModalOpen(false);

    }
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedEquip, setSelectedEquip] = useState<Equipment | null>(null);
    const openViewModal = (equipment: Equipment) => {
          setSelectedEquip(equipment);
          console.log(equipment);
          setIsViewModalOpen(true);
    };
    const closeViewModal = () => {
        setIsViewModalOpen(false);
    };
    const handleUpdateModal=(selectedEquip:Equipment)=>{
        console.log(selectedEquip)
        setSelectedEquip(selectedEquip)
        closeViewModal();
        openEquipModal()


    }
    const handleDelete = (selecteEquip:Equipment) => {
        dispatch(deleteEquipment(selecteEquip.equipmentId));
        closeViewModal()
        setSelectedEquip(null)
    }

    const headers =["Equipment name"," Type","Status","Assigned staff","Assigned Field"];
    const renderEquipRow = (equip: Equipment, index: number) => {

        return (
            <tr className="table-row" data-status={equip.status.toLowerCase()} onClick={()=>openViewModal(equip)}>
                <td className="table-data">{equip.name}</td>
                <td className="table-data">{equip.type}</td>
                <td className="table-data">{equip.status}</td>
                <td className="table-data">{getStaff(equip.staffId).firstName} {getStaff(equip.staffId).lastName}</td>
                <td className="table-data">{getField(equip.fieldId).name}</td>
            </tr>
        )
    }
    return (
        <>
            <SearchBarComponent placeholder="Search by Name or Type..." onChange=""/>
            <section className="flex justify-center items-center pt-10 md:pl-20 mx-auto">
                <MainContainer
                    dataArray={equipments}
                    renderItem={renderEquipRow}
                    noDataMessage="No Equipments to display"
                    tableHeaders={headers}
                    displayType="table"
                />
            </section>
            <div className="flex justify-center items-center pt-10 md:pl-20 mx-auto font-itim">
                <AddBtnComponent text="Add Equipment" onClick={openEquipModal}/>
            </div>
            {isModalOpen && <AddEquipmentModal isOpen={isModalOpen} onClose={closeEquipModal} equipment={selectedEquip} />
            }
            {isViewModalOpen && selectedEquip && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
                    aria-labelledby="equipmentDetailModalLabel"
                    aria-hidden="true"
                >
                    <div className="bg-amber-50 overflow-y-scroll rounded-lg shadow-2xl max-w-2xl w-full mx-4 sm:mx-8 my-8 relative max-h-[800px]">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-300">
                            <h4
                                className="text-2xl font-bold text-green-700 font-itim text-center"
                                id="equipmentDetailModalLabel"
                            >
                                <i className="fas fa-tools mr-2"></i> Equipment Details
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
                            <form id="equipmentDetailForm" className="space-y-4">

                                {/* Equipment ID */}
                                <div>
                                    <label htmlFor="equipmentId" className="field-label">
                                        Equipment ID
                                    </label>
                                    <input
                                        type="text"
                                        id="equipmentId"
                                        className="field-input-css"
                                        value={selectedEquip.equipmentId}
                                        readOnly
                                    />
                                </div>

                                {/* Name */}
                                <div>
                                    <label htmlFor="equipmentName" className="field-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="equipmentName"
                                        className="field-input-css"
                                        value={selectedEquip.name}
                                        readOnly
                                    />
                                </div>

                                {/* Type */}
                                <div>
                                    <label htmlFor="equipmentType" className="field-label">
                                        Type
                                    </label>
                                    <input
                                        type="text"
                                        id="equipmentType"
                                        className="field-input-css"
                                        value={selectedEquip.type}
                                        readOnly
                                    />
                                </div>

                                {/* Status */}
                                <div>
                                    <label htmlFor="equipmentStatus" className="field-label">
                                        Status
                                    </label>
                                    <input
                                        type="text"
                                        id="equipmentStatus"
                                        className="field-input-css"
                                        value={selectedEquip.status}
                                        readOnly
                                    />
                                </div>

                                {/* Assigned Staff */}
                                <div>
                                    <label htmlFor="EqAssignedStaff" className="field-label">
                                        Assigned Staff
                                    </label>
                                    <input
                                        type="text"
                                        id="EqAssignedStaff"
                                        className="field-input-css"
                                        value={getStaff(selectedEquip.staffId).firstName|| "Unassigned"}
                                        readOnly
                                    />
                                </div>

                                {/* Assigned Field */}
                                <div>
                                    <label htmlFor="assignedField" className="field-label">
                                        Assigned Field
                                    </label>
                                    <input
                                        type="text"
                                        id="assignedField"
                                        className="field-input-css"
                                        value={getField(selectedEquip.fieldId).name || "Unassigned"}
                                        readOnly
                                    />
                                </div>

                                {/* Remarks */}
                                <div>
                                    <label htmlFor="equipmentRemarks" className="field-label">
                                        Remarks
                                    </label>
                                    <textarea
                                        id="equipmentRemarks"
                                        className="field-input-css"
                                        rows="3"
                                        value={selectedEquip.remarks || "No remarks"}
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
                                id="updateEquipmentBtn"
                                onClick={() => handleUpdateModal(selectedEquip)}
                            >
                                <i className="fas fa-edit"></i> Update
                            </button>
                            <button
                                type="button"
                                className="modal-btn"
                                id="deleteEquipmentBtn"
                                onClick={() => handleDelete(selectedEquip)}
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