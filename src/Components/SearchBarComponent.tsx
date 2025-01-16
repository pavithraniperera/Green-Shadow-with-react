
export default function searchBarComponent(props) {
    return (
        <div className="relative md:w-full w-3/4 max-w-md mx-auto mb-4 top-4">
            <i className="fas fa-search absolute text-teal-900 top-1/2 left-4 transform -translate-y-1/2 text-lg z-10 font-bold "></i>
            <input
                type="text"
                placeholder={props.placeholder}
                onChange={props.onChange}
                className="w-full pl-12 py-2 rounded-full border-amber-50 outline-none text-gray-800 bg-amber-100 backdrop-blur-sm placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-amber-400 transition-all duration-300 text-sm sm:text-base"
            />
        </div>
    )
}