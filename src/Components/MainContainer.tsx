import NoDataComponent from "./NoDataComponent.tsx";

import MainContainerProps from "../models/MainContainerProps.ts";

export default function MainContainer(props:MainContainerProps) {

    return (
        <>
            <section
                className={`flex ${props.displayType==='card'?"justify-center flex-wrap gap-5":"flex-col"} max-w-5xl w-full max-h-[600px] overflow-y-auto p-8 bg-white/10 backdrop-blur-lg shadow-md rounded-lg`}>
                {props.dataArray.length === 0 ? (
                    <NoDataComponent message={props.noDataMessage} />
                ) : props.displayType === "card" ? (
                    // Render cards
                    props.dataArray.map((item, index) => props.renderItem(item, index))
                ) : (
                    // Render table
                    <table className="w-full border-collapse">
                        <thead>
                        <tr>
                            {props.tableHeaders?.map((header, index) => (
                                <th key={index} className="border px-4 py-2">
                                    {header}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {props.dataArray.map((item, index) => props.renderItem(item, index))}
                        </tbody>
                    </table>
                )}


            </section>
        </>

    )
}