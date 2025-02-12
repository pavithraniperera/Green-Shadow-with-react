import SearchBarComponent from "../Components/SearchBarComponent.tsx";
import MainContainer from "../Components/MainContainer.tsx";

import Crop from "../models/Crop.ts";
import {useDispatch, useSelector} from "react-redux";
import AddBtnComponent from "../Components/AddBtnComponent.tsx";
import {useEffect, useState} from "react";

import AddCropModal from "../Components/CropModalComponents/AddCropModal.tsx";

import {deleteCrop, fetchCrops} from "../Features/CropSlice.ts";
import {fetchFieldById, fetchFields, selectFieldById} from "../Features/FieldSlice.ts";


export default function CropsPage() {

    const crops = useSelector((state: any) => state.crop.crops)
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openCropModal = () => {
        setIsModalOpen(true)
        closeViewModal()
    };
    useEffect(() => {

        dispatch(fetchCrops());
        dispatch(fetchFields())
    }, [dispatch]);


    const closeCropModal = () => {
        setSelectedCrop(null)
        setIsModalOpen(false);

    }
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);

    const openViewModal = (crop: Crop) => {
        setSelectedCrop(crop);
        console.log(selectedCrop);
        setIsViewModalOpen(true);
    };
    const closeViewModal = () => {
        setIsViewModalOpen(false);

    };

    const handleUpdateModal=(selectedCrop:Crop)=>{
        console.log(selectedCrop)
        setSelectedCrop(selectedCrop)
        closeViewModal();
        openCropModal()


    }
    const handleDelete = (selectedCrop:Crop) => {
        dispatch(deleteCrop(selectedCrop.cropId));
        closeViewModal()
        setSelectedCrop(null)
    }
    const getImageSrc = (image: string | File | null) => {
        if (!image) return "/fallback-image.jpg"; // Default fallback image

        if (typeof image === "string") {
            return `http://localhost:3000/${image}`; // Correctly prepend backend URL
        }

        return URL.createObjectURL(image); // If it's a file (uploaded from frontend), create a blob URL
    };
    const renderCropCard = (crop: Crop, index: number) => {


        const field = useSelector((state) => selectFieldById(state, crop.fieldId));
        console.log(field);
        return (

            <div className="card-custom"
                 key={index}
            >

                <div className="image-container">
                    <img  className={` inset-0 w-[250px] h-[175px] object-cover  transition-opacity duration-500 mx-auto mt-2 `} src={getImageSrc(crop.image1)} alt="Crop Image"/>
                </div>


                <div className="card-content p-3">

                    <div className="field-info">
                        <h4>Common Name</h4>
                        <p>{crop.commonName}</p>
                    </div>


                    <div className="field-info mb-2">
                        <h4>Specific Name</h4>
                        <p>{crop.specificName}</p>
                    </div>


                    <div className="field-info mb-2">
                        <h4>Category</h4>
                        <p>{crop.category}</p>
                    </div>


                    <div className="field-info mb-2" id="field-info-${crop.id}">
                        <h4>Field</h4>
                        <p id={crop.fieldId}>{field.name} </p>
                    </div>


                    <div className="view-more-container flex justify-center mt-4">
                        <button id="viewCrop" className="view-mor-btn"
                                onClick={()=>openViewModal(crop)}

                               >
                            View more
                        </button>
                    </div>
                </div>
            </div>

        )
    }
    return (
        <>
            <SearchBarComponent placeholder="Search Crops by Field name..." onChange=""/>
            <section className="flex justify-center items-center pt-10 md:pl-20 mx-auto">
                <MainContainer
                    dataArray={crops}
                    renderItem={renderCropCard}
                    noDataMessage="No Crops to display"
                    displayType="card"
                    styles= "justify-center flex-wrap gap-5"
                />
            </section>
            <div className="flex justify-center items-center pt-10 md:pl-20 mx-auto font-itim">
                <AddBtnComponent text="Add Crop" onClick={openCropModal}/>
            </div>
            {isModalOpen && <AddCropModal isOpen={isModalOpen} onClose={closeCropModal} crop={selectedCrop} />
            }
            {isViewModalOpen && selectedCrop && (
                <div
                    className="fixed inset-0 z-50  bg-black/50 flex items-center justify-center "
                    aria-labelledby="cropDetailModalLabel"
                    aria-hidden="true"
                >
                    <div className="bg-amber-50  overflow-y-scroll rounded-lg shadow-2xl max-w-2xl w-full mx-4 sm:mx-8 my-8 relative max-h-[800px]">
                        {/* Modal Header with Image */}
                        <div className="p-6 border-b border-gray-300">
                            <img
                                src={getImageSrc(selectedCrop.image1)}
                                alt="Crop Image"
                                className="mt-6 w-4/5 h-[300px] mx-auto border-b border-gray-300 rounded-xl"
                            />
                        </div>

                        {/* Modal Title */}
                        <div className="flex justify-between items-center">
                            <h4 className="text-2xl font-bold text-green-700 font-itim ml-10">Crop Details</h4>
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
                            <form id="cropDetailForm" className="space-y-4">
                                {/* Crop ID */}
                                <div>
                                    <label htmlFor="cropId" className="field-label">
                                        Crop ID
                                    </label>
                                    <input
                                        type="text"
                                        id="cropId"
                                        className="field-input-css"
                                        value={selectedCrop.cropId}
                                        readOnly
                                    />
                                </div>

                                {/* Special Name */}
                                <div>
                                    <label htmlFor="specialName" className="field-label">
                                        Special Name
                                    </label>
                                    <input
                                        type="text"
                                        id="specialName"
                                        className="field-input-css"
                                        value={selectedCrop.specificName}
                                        readOnly
                                    />
                                </div>

                                {/* Common Name */}
                                <div>
                                    <label htmlFor="commonName" className="field-label">
                                        Common Name
                                    </label>
                                    <input
                                        type="text"
                                        id="commonName"
                                        className="field-input-css"
                                        value={selectedCrop.commonName}
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
                                        value={selectedCrop.category}
                                        readOnly
                                    />
                                </div>

                                {/* Field */}
                                <div>
                                    <label htmlFor="field" className="field-label">
                                        Field
                                    </label>
                                    <input
                                        type="text"
                                        id="Field"
                                        className="field-input-css"
                                        value={selectedCrop.fieldId}

                                        readOnly
                                    />
                                </div>

                                {/* Season */}
                                <div>
                                    <label htmlFor="season" className="field-label">
                                        Season
                                    </label>
                                    <input
                                        type="text"
                                        id="season"
                                        className="field-input-css"
                                        value={selectedCrop.season}
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
                                data-dismiss="modal"
                                onClick={()=>{handleUpdateModal(selectedCrop)}}
                            >
                                <i className="fas fa-times-circle"></i> Close
                            </button>
                            <button
                                type="button"
                                className="modal-btn"
                                id="CropUpdateBtn"
                                onClick={openCropModal}
                            >
                                <i className="fas fa-edit"></i> Update
                            </button>
                            <button
                                type="button"
                                className="modal-btn"
                                id="CropDeleteBtn"
                                onClick={()=>{handleDelete(selectedCrop)}}
                            >
                                <i className="fas fa-trash-alt"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>


            )
            }

        </>

    )
}