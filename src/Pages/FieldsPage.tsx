import SearchBarComponent from "../Components/SearchBarComponent";
import MainContainer from "../Components/MainContainer.tsx";
import AddBtnComponent from "../Components/AddBtnComponent.tsx";
import {useEffect, useState} from "react";
import AddFieldModal from "../Components/FieldModalComponent/AddFieldModal.tsx";
import {useDispatch, useSelector} from "react-redux";
import '../assets/CustomCss/CustomCss.css'
import {Field} from "../models/Field.ts";
import {deleteField} from "../Features/FieldSlice.ts";

export default function FieldPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fields = useSelector((state: any) => state.field.fields);
    const [currentImageIndices, setCurrentImageIndices] =useState<number[]>([])
    const dispatch = useDispatch();
    // Update currentImageIndices when fields change
    useEffect(() => {
        if (fields.length > 0) {
            setCurrentImageIndices(fields.map(() => 0)); //[0,0,0]
        }
    }, [fields]);

    const handleNextImage = (index: number) => {
        setCurrentImageIndices((prevIndices) =>
            prevIndices.map((val, i) => (i === index ? (val + 1) % 2 : val)) // Increment only the clicked card
        );
    };

    const handlePrevImage = (index: number) => {
        setCurrentImageIndices((prevIndices) =>
            prevIndices.map((val, i) => (i === index ? (val - 1 + 2) % 2 : val)) // Decrement only the clicked card
        );
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedField(null);
    }
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedField, setSelectedField] = useState<Field | null>(null);

    const openViewModal = (field: Field) => {
        setSelectedField(field);
        console.log(selectedField);
        setIsViewModalOpen(true);
    };
    const closeViewModal = () => {
        setSelectedField(null);
        setIsViewModalOpen(false);
    };
    const handleUpdateModal=(selectedField:Field)=>{
        console.log(selectedField)
        closeViewModal();
        openModal();
       setSelectedField(selectedField);

    }
    const handleDelete = (selectedField:Field) => {
        dispatch(deleteField(selectedField.fieldId));
        closeViewModal()
        setSelectedField(null)
    }

    // field card
    const renderFieldCard = (field: Field, index: number) => {

        const images =[field.image1,field.image2];
        const currentImageIndex = currentImageIndices[index];




        return (


            <div
                key={index}
                className="card-custom"
                data-code={field.fieldId}
                data-name={field.fieldname}
                data-size={field.fieldsize}
                data-location={field.location}
                data-image1={field.image1}
                data-image2={field.image2}
            >
                {/* Image Slider */}
                <div className="slider">
                    <img
                        src={images[currentImageIndex]}
                        alt={`Field Image ${currentImageIndex + 1}`}
                        className={` inset-0 w-[250px] h-[200px] object-cover  transition-opacity duration-500 mx-auto mt-2 `}
                    />

                    <div className="slider-buttons flex justify-between absolute inset-y-1/2 w-full px-4">
                        <button
                            className="slider-button "
                            onClick={() => handlePrevImage(index)}
                        >
                            &#10094;
                        </button>
                        <button
                            className="slider-button "
                            onClick={() => handleNextImage(index)}
                        >
                            &#10095;
                        </button>
                    </div>
                </div>
                {/* Card Content */}
                <div className="card-content p-4">
                    <div className="field-info mb-4">
                        <h4 >Field Name</h4>
                        <p >{field.fieldname}</p>
                    </div>
                    <div className="field-info mb-4">
                        <h4 >Size</h4>
                        <p >{field.fieldsize} Sq. meters</p>
                    </div>
                    <div className="field-info mb-4">
                        <h4>Location</h4>
                        <p >GPS Coordinates: {field.location}</p>
                    </div>
                    <div className="view-more-container flex justify-center mt-4">
                        <button
                            type="button"
                            className="view-btn bg-orange-300/50 text-green-800 py-2 px-4 rounded-lg hover:bg-green-300 hover:text-green-900 transition-all"
                            onClick={() => openViewModal(field)}
                        >
                            View More
                        </button>
                    </div>
                </div>
            </div>


        )
    };
    return (
        <>
            <SearchBarComponent placeholder="Search Field by Location.." onChange=""/>
            <section className="flex justify-center items-center pt-10 md:pl-20 mx-auto">
                <MainContainer
                    dataArray={fields}
                    renderItem={renderFieldCard}
                    noDataMessage="No fields to display"
                    displayType="card"
                />
            </section>
            <div className="flex justify-center items-center pt-10 md:pl-20 mx-auto font-itim ">
                <AddBtnComponent text="Add Field" onClick={openModal}/>
            </div>
            {isModalOpen && <AddFieldModal isOpen={isModalOpen} onClose={closeModal} field={selectedField} />
            }
            {isViewModalOpen && selectedField && (

                <div
                    className="fixed inset-0 z-50 overflow-auto bg-black/50 flex items-center justify-center"> {/* Modal Overlay */}
                    <div
                        className="bg-amber-50 rounded-lg shadow-2xl max-w-2xl w-full mx-4 sm:mx-8 my-8 relative"> {/* Modal Content */}
                        <div className="p-6 border-b border-gray-300"> {/* Modal Header */}
                            <div className="flex justify-between items-center">
                                <h4 className="text-2xl font-bold text-green-700 font-itim">Field Details</h4>
                                <button
                                    type="button"
                                    className="text-gray-500 hover:text-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 rounded-full p-1"
                                    onClick={closeViewModal}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="p-6 space-y-6"> {/* Modal Body */}
                            <form id="fieldDetailForm" className="space-y-6">
                                <div>
                                    <label className="field-label">Field Code</label>
                                    <input
                                        type="text"
                                        className="field-input-css"
                                        value={selectedField.fieldId || ""}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="field-label">Field Name</label>
                                    <input
                                        type="text"
                                        className="field-input-css"
                                        value={selectedField.fieldname || ""}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="field-label">Field Location
                                        (Coordinates)</label>
                                    <input
                                        type="text"
                                        className="field-input-css"
                                        value={selectedField.location || ""}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="field-label">Extent Size (Sq.
                                        meters)</label>
                                    <input
                                        type="text"
                                        className="field-input-css"
                                        value={selectedField.fieldsize || ""}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Field Images</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2"> {/* Image Gallery */}
                                        <img
                                            src={selectedField.image1 || ""}
                                            alt="Field Image 1"
                                            className="w-full h-48 object-cover rounded-lg border border-gray-300 shadow-md"
                                        />
                                        <img
                                            src={selectedField.image2 || ""}
                                            alt="Field Image 2"
                                            className="w-full h-48 object-cover rounded-lg border border-gray-300 shadow-md"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="p-6 border-t border-gray-300 flex justify-end space-x-3"> {/* Modal Footer */}
                            <button
                                type="button"
                                className="modal-btn"
                                onClick={closeViewModal}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="modal-btn"
                                onClick={()=>handleUpdateModal(selectedField)}
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                className="modal-btn"
                                onClick={()=>handleDelete(selectedField)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

            )}


        </>


    )
}