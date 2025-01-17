import SearchBarComponent from "../Components/SearchBarComponent";
import MainContainer from "../Components/MainContainer.tsx";
import AddBtnComponent from "../Components/AddBtnComponent.tsx";
import {useEffect, useState} from "react";
import AddFieldModal from "../Components/FieldModalComponent/AddFieldModal.tsx";
import { useSelector} from "react-redux";
import '../assets/CustomCss/CustomCss.css'
import {Field} from "../models/Field.ts";

export default function FieldPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fields = useSelector((state: any) => state.field.fields);
    const [currentImageIndices, setCurrentImageIndices] =useState<number[]>([])
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
    const closeModal = () => setIsModalOpen(false);
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
                            onClick={() => alert(`View details for ${field.fieldname}`)}
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
            {isModalOpen && <AddFieldModal isOpen={isModalOpen} onClose={closeModal}/>}


        </>


    )
}