import NoDataComponent from "./NoDataComponent.tsx";

import MainContainerProps from "../models/MainContainerProps.ts";

export default function MainContainer(props:MainContainerProps) {

    return (


        <>
            <section
                className={`flex ${props.displayType==='card'?`${props.styles}`:"flex-col"} max-w-5xl w-full max-h-[600px] overflow-y-auto p-8 bg-white/10 backdrop-blur-lg shadow-md rounded-lg`}>
                {props.dataArray.length === 0 ? (
                    <NoDataComponent message={props.noDataMessage} />
                ) : props.displayType === "card" ? (
                    // Render cards
                    props.dataArray.map((item, index) => props.renderItem(item, index))
                ) : (
                    // Render table
                    <div className="overflow-x-auto p-4">
                        <table className="w-full border-collapse mx-auto bg-white/20 backdrop-blur-md rounded-lg overflow-hidden shadow-md">
                            <thead >
                            <tr>
                                {props.tableHeaders?.map((header, index) => (
                                    <th key={index} className="p-3 text-left bg-white/40 text-green-800 font-bold">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {props.dataArray.map((item, index) => props.renderItem(item, index))}
                            </tbody>
                        </table>

                    </div>

                )}


            </section>
        </>

    )
}