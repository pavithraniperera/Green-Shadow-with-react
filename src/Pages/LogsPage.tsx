import SearchBarComponent from "../Components/SearchBarComponent.tsx";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import AddBtnComponent from "../Components/AddBtnComponent.tsx";

import LogsAddModal from "../Components/LogsModalComponents/LogsAddModal.tsx";
import Logs from "../models/Logs.ts";
import MainContainer from "../Components/MainContainer.tsx";
import {deleteLog} from "../Features/LogSlice.ts";

export default function LogsPage() {
    const dispatch = useDispatch();
    const fields = useSelector((state: any) => state.field.fields);
    const staff = useSelector((state: any) => state.staff.staff);
    const crops = useSelector((state: any) => state.crop.crops);
    const logs = useSelector((state: any) => state.log.logs);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLog, setSelectedLog] = useState<Logs | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const getField =(fieldId:string) => {
        return fields.find(field => field.fieldId === fieldId)

    }
    const getStaff=(email:string)=>{
        return staff.find(staffMember=>staffMember.email === email)
    }
    const getCrop=(cropId:string)=>{
        return crops.find(crop=>crop.cropId === cropId)
    }
    const openLogModal = () => {
        setIsModalOpen(true)
        closeViewModal()
    };
    const closeLogModal = () => {
       setSelectedLog(null)
        setIsModalOpen(false);

    }
    const openViewModal = (log: Logs) => {
        setSelectedLog(log);
        setIsViewModalOpen(true);
    };

    const closeViewModal = () => {
        setIsViewModalOpen(false);
    };
    const handleUpdateModal=(selectedLog:Logs)=>{
        console.log(selectedLog)
        setSelectedLog(selectedLog);
        closeViewModal();
        openLogModal()


    }
    const handleDelete = (selectedLog:Logs) => {
        dispatch(deleteLog(selectedLog.logId));
        closeViewModal()
        setSelectedLog(null)
    }
    const renderLogCard = (log: Logs, index: number) => {

        return (
            <div
                className="basis-1/2 md:basis-[calc(50%-20px)] max-w-[360px] p-[15px_20px] rounded-lg bg-white/10 backdrop-blur-md shadow-[0_6px_15px_rgba(0,0,0,0.15)] text-gray-800 font-sans m-2 transition-transform transition-box-shadow hover:scale-105 hover:translate-y-[-5px] hover:shadow-[0_8px_18px_rgba(0,0,0,0.2)]"
                data-log-id={log.logId}
            >
                {/* Date and Time */}
                <div className="log-date-time text-sm text-red-300 mb-2">
                    {new Date(log.date).toLocaleDateString()}
                </div>

                {/* Field/Crop and Status Section */}
                <div className="log-header flex justify-between items-center mb-4">
                    <div className="log-category text-lg font-semibold text-green-800">
                        {log.crop || "No Crop"} / {log.field||"No Field"}
                    </div>
                    <div
                        className={`log-status px-3 py-1 rounded-full text-sm font-medium ${
                            log.status.toLowerCase() === "complete"
                                ? "bg-green-100 text-green-700"
                                : log.status.toLowerCase() === "in progress"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                        }`}
                    >
                        {log.status}
                    </div>
                </div>

                {/* Description and Image Section */}
                <div className="log-middle flex gap-4">
                    {/* Description */}
                    <div className="log-description flex-1 text-gray-700">
                        {log.description || "No description available"}
                    </div>
                    {/* Image */}
                    <div className="log-image w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                        {log.image ? (
                            <img
                                src={log.image}
                                alt="Log"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <img
                                src="https://via.placeholder.com/80"
                                alt="No Image Available"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                </div>

                {/* View Details Button */}
                <button
                    className="view-details-btn mt-4 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition duration-300"
                    onClick={() => openViewModal(log)}
                >
                    <i className="fas fa-info-circle mr-2"></i> View Details
                </button>
            </div>
        )
    }
    return (
        <>
            <SearchBarComponent placeholder="Search by Field or crop..." onChange=""/>
            <section className="flex justify-center items-center pt-10 md:pl-20 mx-auto">
                <MainContainer
                    dataArray={logs}
                    renderItem={renderLogCard}
                    noDataMessage="No Logs to display"
                    displayType="card"
                    styles="flex flex-wrap justify-center"
                />
            </section>


            <div className="flex justify-center items-center pt-10 md:pl-20 mx-auto font-itim">
                <AddBtnComponent text="Add Logs" onClick={openLogModal}/>
            </div>
            {isModalOpen && <LogsAddModal isOpen={isModalOpen} onClose={closeLogModal} log={selectedLog}/>
            }
            {isViewModalOpen && selectedLog && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
                    aria-labelledby="logDetailModalLabel"
                    aria-hidden="true"
                >
                    <div className="bg-amber-50 overflow-y-scroll rounded-lg shadow-2xl max-w-2xl w-full mx-4 sm:mx-8 my-8 relative max-h-[800px]">
                        {/* Modal Header with Image */}
                        <div className="p-6 border-b border-gray-300">
                            <img
                                src={
                                    selectedLog.image
                                        ? selectedLog.image
                                        : "https://via.placeholder.com/600x200?text=Log+Image"
                                }
                                alt="Log Image"
                                className="mt-6 w-4/5 h-[300px] mx-auto border-b border-gray-300 rounded-xl"
                            />
                        </div>

                        {/* Modal Title */}
                        <div className="flex justify-between items-center px-6 py-4">
                            <h4 className="text-2xl font-bold text-green-700 font-itim">
                                Log Details
                            </h4>
                            <button
                                type="button"
                                className="modal-btn"
                                onClick={closeViewModal}
                            >
                                &times;
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="px-6 py-4">
                            <form id="logDetailForm" className="space-y-4">
                                {/* Log ID */}
                                <div>
                                    <label htmlFor="logId" className="field-label">
                                        Log ID
                                    </label>
                                    <input
                                        type="text"
                                        id="logId"
                                        className="field-input-css"
                                        value={selectedLog.logId}
                                        readOnly
                                    />
                                </div>

                                {/* Log Date */}
                                <div>
                                    <label htmlFor="logDate" className="field-label">
                                        Log Date
                                    </label>
                                    <input
                                        type="text"
                                        id="logDate"
                                        className="field-input-css"
                                        value={new Date(selectedLog.date).toLocaleDateString()}
                                        readOnly
                                    />
                                </div>

                                {/* Details */}
                                <div>
                                    <label htmlFor="details" className="field-label">
                                        Details
                                    </label>
                                    <textarea
                                        id="details"
                                        className="field-input-css"
                                        rows="3"
                                        value={selectedLog.description || "No description available"}
                                        readOnly
                                    ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="status" className="field-label">
                                        Status
                                    </label>
                                    <input
                                        type="text"
                                        id="status"
                                        className="field-input-css"
                                        value={selectedLog.status}
                                        readOnly
                                    />
                                </div>

                                {/* Fields/Crops */}
                                <div>
                                    <label htmlFor="fields" className="field-label">
                                        Crops
                                    </label>
                                    <input
                                        type="text"
                                        id="fields"
                                        className="field-input-css"
                                        value={getField(selectedLog.field).fieldname || "Not available"}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label htmlFor="crop" className="field-label">
                                        Crops
                                    </label>
                                    <input
                                        type="text"
                                        id="crop"
                                        className="field-input-css"
                                        value={getCrop(selectedLog.crop).commonName || "Not available"}
                                        readOnly
                                    />
                                </div>

                                {/* Staff Members */}
                                <div>
                                    <label htmlFor="staffMembers" className="field-label">
                                        Staff Members
                                    </label>
                                    <input
                                        type="text"
                                        id="staffMembers"
                                        className="field-input-css"
                                        value={
                                            selectedLog.staff && selectedLog.staff.length > 0
                                                ? selectedLog.staff
                                                    .map((email: string) => {
                                                        const staffMember = getStaff(email); // Get the staff object
                                                        return staffMember ? staffMember.firstName+" "+staffMember.lastName : null; // Extract the name property
                                                    })
                                                    .filter((name) => name) // Remove null values in case of unmatched emails
                                                    .join(", ")
                                                : "No staff assigned"
                                        }
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
                                id="logUpdateBtn"
                                onClick={() => handleUpdateModal(selectedLog)}
                            >
                                <i className="fas fa-edit"></i> Update
                            </button>
                            <button
                                type="button"
                                className="modal-btn"
                                id="logDeleteBtn"
                                onClick={() => handleDelete(selectedLog)}
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