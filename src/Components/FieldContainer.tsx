import NoDataComponent from "./NoDataComponent.tsx";

export default function FieldContainer(props){
    return (
        <>
            <div
                className="flex justify-center flex-wrap gap-5 max-w-5xl w-full max-h-[600px] overflow-y-auto p-8 bg-white/10 backdrop-blur-lg shadow-md rounded-lg">
                {/* Content goes here */}
             <NoDataComponent message="No fields to show"/>
            
            </div>
            </>

            )
            }