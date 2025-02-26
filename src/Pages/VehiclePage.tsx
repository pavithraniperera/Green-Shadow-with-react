import SearchBarComponent from "../Components/SearchBarComponent.tsx";
import AddBtnComponent from "../Components/AddBtnComponent.tsx";
import {useEffect, useState} from "react";
import AddVehicleModalComponent from "../Components/VehicleAddModalComponent/AddVehicleModal.tsx";
import Vehicle from "../models/Vehicle.ts";
import MainContainer from "../Components/MainContainer.tsx";
import {useDispatch, useSelector} from "react-redux";
import {deleteVehicle, fetchVehicles} from "../Features/VehicleSlice.ts";

import {fetchFields} from "../Features/FieldSlice.ts";
import {fetchStaff} from "../Features/StaffSlice.ts";

export default function VehiclePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const vehicles = useSelector((state: any) => state.vehicle.vehicles)
    const staff = useSelector((state: any) => state.staff.staff)
    const openVehicleModal = () => {
        setIsModalOpen(true)
        closeViewModal()
    };
    useEffect(() => {

        dispatch(fetchVehicles());
        dispatch(fetchFields());
        dispatch(fetchStaff())
    }, [dispatch]);

    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const openViewModal = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setIsViewModalOpen(true);
    };

    const closeViewModal = () => {
        setIsViewModalOpen(false);
    };
    const handleUpdateModal=(selectedVehicle:Vehicle)=>{
        console.log(selectedVehicle)
        setSelectedVehicle(selectedVehicle)
        closeViewModal();
        openVehicleModal()


    }
    const handleDelete = (selectedVehicle:Vehicle) => {
        dispatch(deleteVehicle(selectedVehicle.vehicleId));
        closeViewModal()
        setSelectedVehicle(null)
    }
    const headers =["Vehicle Category","License Plate","Fuel type","Status","Remarks"];

    const renderVehicleRow = (vehicle: Vehicle, index: number) => {

        return (
            <tr className="table-row" data-status={vehicle.status.toLowerCase()} onClick={() => openViewModal(vehicle)}>
                <td className="table-data">{vehicle.category}</td>
                <td className="table-data">{vehicle.plateNumber}</td>
                <td className="table-data">{vehicle.fuelType}</td>
                <td className="table-data">{vehicle.status}</td>
                <td className="table-data">{vehicle.remarks || "N/A"}</td>
            </tr>
        )
    }


    const closeVehicleModal = () => {
        setSelectedVehicle(null)
        setIsModalOpen(false);

    }
    return (
        <>
            <SearchBarComponent placeholder="Search by License Plate or Fuel Type..." onChange=""/>


            <section className="flex justify-center items-center pt-10 md:pl-20 mx-auto">
                <MainContainer
                    dataArray={vehicles}
                    renderItem={renderVehicleRow}
                    noDataMessage="No Vehicles to display"
                    tableHeaders={headers}
                    displayType="table"
                />
            </section>
            <div className="flex justify-center items-center pt-10 md:pl-20 mx-auto font-itim">
                <AddBtnComponent text="Add Vehicle" onClick={openVehicleModal}/>
            </div>
            {isModalOpen && <AddVehicleModalComponent isOpen={isModalOpen} onClose={closeVehicleModal} vehicle={selectedVehicle}/>
            }
            {isViewModalOpen && selectedVehicle && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
                    aria-labelledby="vehicleDetailModalLabel"
                    aria-hidden="true"
                >
                    <div className="bg-amber-50 overflow-y-scroll rounded-lg shadow-2xl max-w-2xl w-full mx-4 sm:mx-8 my-8 relative max-h-[800px]">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-300">
                            <h4
                                className="text-2xl font-bold text-green-700 font-itim text-center"
                                id="vehicleDetailModalLabel"
                            >
                                <i className="fas fa-truck mr-2"></i> Vehicle Details
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
                            <form id="vehicleDetailForm" className="space-y-4">
                                {/* Vehicle Code */}
                                <div>
                                    <label htmlFor="vehicleCode" className="field-label">
                                        Vehicle Code
                                    </label>
                                    <input
                                        type="text"
                                        id="vehicleCode"
                                        className="field-input-css"
                                        value={selectedVehicle.vehicleId}
                                        readOnly
                                    />
                                </div>

                                {/* License Plate */}
                                <div>
                                    <label htmlFor="plateNumber" className="field-label">
                                        License Plate
                                    </label>
                                    <input
                                        type="text"
                                        id="plateNumber"
                                        className="field-input-css"
                                        value={selectedVehicle.plateNumber}
                                        readOnly
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label htmlFor="category" className="field-label">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        id="category"
                                        className="field-input-css"
                                        value={selectedVehicle.category}
                                        readOnly
                                    />
                                </div>

                                {/* Fuel Type */}
                                <div>
                                    <label htmlFor="fuelType" className="field-label">
                                        Fuel Type
                                    </label>
                                    <input
                                        type="text"
                                        id="fuelType"
                                        className="field-input-css"
                                        value={selectedVehicle.fuelType}
                                        readOnly
                                    />
                                </div>

                                {/* Status */}
                                <div>
                                    <label htmlFor="status" className="field-label">
                                        Status
                                    </label>
                                    <input
                                        type="text"
                                        id="status"
                                        className="field-input-css"
                                        value={selectedVehicle.status}
                                        readOnly
                                    />
                                </div>

                                {/* Allocated Staff */}
                                <div>
                                    <label htmlFor="staffId" className="field-label">
                                        Allocated staff
                                    </label>
                                    <input
                                        type="text"
                                        id="staffId"
                                        name="staffId"
                                        className="field-input-css"
                                        value={
                                            staff.find(s => s.staffId === selectedVehicle.staffId)
                                                ? `${staff.find(s => s.staffId === selectedVehicle.staffId)?.firstName} ${staff.find(s => s.staffId === selectedVehicle.staffId)?.lastName}`
                                                : "N/A"
                                        }
                                        readOnly
                                    />

                                </div>

                                {/* Remarks */}
                                <div>
                                    <label htmlFor="remarks" className="field-label">
                                    Remarks
                                    </label>
                                    <textarea
                                        className="field-input-css"
                                        id="remarks"
                                        rows="3"
                                        readOnly
                                    >
                                    {selectedVehicle.remarks}
                                  </textarea>
                                </div>
                            </form>
                        </div>
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
                                onClick={() => handleUpdateModal(selectedVehicle)}
                            >
                                <i className="fas fa-edit"></i> Update
                            </button>
                            <button
                                type="button"
                                className="modal-btn"
                                id="staffDeleteBtn"
                                onClick={() => handleDelete(selectedVehicle)}
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