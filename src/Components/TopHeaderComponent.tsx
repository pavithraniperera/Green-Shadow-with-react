import {Link, useLocation} from "react-router-dom";

export default function TopHeaderComponent({ toggleSidebar }) {
    const location = useLocation();
    const page = (pathName:string)=>{
        switch(pathName){
            case '/dashboard':
                return 'Dashboard';
            case '/field':
                return 'Field Management';
            case '/crop':
                return 'Crops Management';
            case '/staff':
                return 'Staff';
            case '/logs':
                return 'Monitoring Logs';
            case '/vehicles':
                return 'Vehicles';
            case '/equipment':
                return 'Equipment';
            case '/profile':
                return 'My Profile';
            default:
                return 'Dashboard';
        }
    }
    const title = page(location.pathname);


    return (
        <>


            <header
                className="flex items-center justify-between bg-amber-50 px-6 py-4 border-b border-gray-200  shadow-md min-h-20 ml-0  md:ml-64">
                <button
                    className="md:hidden text-teal-950 text-3xl"
                    onClick={toggleSidebar}
                >
                    <i className="fas fa-bars"></i>
                </button>

                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-900 tracking-wide font-itim md:ml-0">{title}</h1> {/* Green text, tracking */}
                <div className="flex space-x-4">
                    <div className="relative group">
                        <i className="fas fa-bell text-gray-600 hover:text-green-900 transition duration-200 cursor-pointer text-2xl pr-2"></i>
                        <span
                            className="absolute top-0 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                1
            </span>
                    </div>
                    <div className="relative group">
                        <div
                            className="rounded-full bg-gray-300 w-8 h-8 flex items-center justify-center overflow-hidden">
                            <Link to="/profile"> <i className="fas fa-user text-gray-600 text-lg"></i></Link>
                        </div>

                    </div>
                </div>
            </header>
        </>
    )
}