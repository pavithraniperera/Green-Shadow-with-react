export default function TopHeaderComponent() {
    return (
        <header
            className="flex items-center justify-between bg-white px-6 py-4 border-b border-gray-200 ml-64 shadow-md">
            <h1 className="text-xl font-bold text-green-700 tracking-wide">Dashboard</h1> {/* Green text, tracking */}
            <div className="flex space-x-4">
                <div className="relative group">
                    <i className="fas fa-bell text-gray-600 hover:text-green-700 transition duration-200 cursor-pointer text-2xl pr-2"></i>
                    <span
                        className="absolute top-0 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                1
            </span>
                </div>
                <div className="relative group">
                    <div className="rounded-full bg-gray-300 w-8 h-8 flex items-center justify-center overflow-hidden">
                        <i className="fas fa-user text-gray-600 text-lg"></i>
                    </div>
                    <div
                        className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    </div>
                </div>
            </div>
        </header>
    )
}