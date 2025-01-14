export  default function DashboardCardComponent({ title, value }) {
    return (
        <div className="md:w-1/4 w-full px-4 mb-4">
            <div className="bg-white/15 border-none rounded-xl shadow-lg backdrop-blur-md p-6 transition transform duration-200 ease-in-out hover:bg-green-900/15 hover:-translate-y-2 hover:shadow-xl text-green-900 hover:text-white">
                <h5 className="text-lg font-semibold mb-2 ml-4">{title}</h5>
                <p className="ml-4 text-2xl font-bold">{value}</p>
            </div>
        </div>
    );
}

