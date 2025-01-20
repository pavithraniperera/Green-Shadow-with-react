import SearchBarComponent from "../Components/SearchBarComponent.tsx";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import AddBtnComponent from "../Components/AddBtnComponent.tsx";

import LogsAddModal from "../Components/LogsModalComponents/LogsAddModal.tsx";
import Vehicle from "../models/Vehicle.ts";
import Logs from "../models/Logs.ts";
import {deleteVehicle} from "../Features/VehicleSlice.ts";
import MainContainer from "../Components/MainContainer.tsx";

export default function LogsPage() {
    const dispatch = useDispatch();
    const equipments = useSelector((state: any) => state.equipment.equipments);
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
    const openLogModal = () => {
        setIsModalOpen(true)
        //closeViewModal()
    };
    const closeLogModal = () => {
       // setSelectedEquip(null)
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
    const handleDelete = (selectedVehicle:Vehicle) => {
        dispatch(deleteVehicle(selectedVehicle.vehicleId));
        closeViewModal()
        setSelectedVehicle(null)
    }
    const renderLogCard = (log: Logs, index: number) => {

        return (
            <div
                className="log-card bg-white shadow-md rounded-lg p-4 mb-4"
                data-log-id={log.logId}
            >
                {/* Date and Time */}
                <div className="log-date-time text-sm text-gray-500 mb-2">
                    {new Date(log.date).toLocaleDateString()}
                </div>

                {/* Field/Crop and Status Section */}
                <div className="log-header flex justify-between items-center mb-4">
                    <div className="log-category text-lg font-semibold text-gray-800">
                        {log.crop || "No Crop"}
                    </div>
                    <div
                        className={`log-status px-3 py-1 rounded-full text-sm font-medium ${
                            log.status.toLowerCase() === "completed"
                                ? "bg-green-100 text-green-700"
                                : log.status.toLowerCase() === "pending"
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
                                src={`data:image/png;base64,${log.image}`}
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
                    className="view-details-btn mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition duration-300"
                    //onClick={() => onViewDetails(log)}
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
                    styles="justify-center flex-wrap gap-10"
                />
            </section>


            <div className="flex justify-center items-center pt-10 md:pl-20 mx-auto font-itim">
                <AddBtnComponent text="Add Logs" onClick={openLogModal}/>
            </div>
            {isModalOpen && <LogsAddModal isOpen={isModalOpen} onClose={closeLogModal} log={null}/>
            }

        </>


    )
}