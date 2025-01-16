const NoDataComponent = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center py-10">
            <img src="src/assets/images/NodataImg.png" alt="No Data" className="md:w-80 md:h-80 mb-4 w-40 h-40" />
            <p className="text-gray-500 text-lg">{message}</p>
        </div>
    );
};

export default NoDataComponent;