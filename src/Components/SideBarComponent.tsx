import {Link, useNavigate} from "react-router-dom";
import '../assets/CustomCss/CustomCss.css'


export  default function sideBarComponent({ isOpen }){

    return (
        <aside className={`bg-gradient-to-b from-green-800 to-green-950 text-white min-h-screen w-64 fixed top-0 left-0 border-r border-gray-200 drop-shadow-md transform transition-transform duration-300 z-50 ${
            isOpen ? "translate-x-0 top-20" : "-translate-x-64"
        } md:translate-x-0`}>
            <div className="p-4">
                <img
                    src="src/assets/images/greenshadowlogo-02.png"
                    alt="Green Shadow Logo"
                    className="w-4/4 mx-auto pb-2.5 drop-shadow-md"
                />
            </div>
            <ul className="space-y-4 p-4">
                <li>
        <span className="side-bar-cutome-css">
          <i className="fas fa-tachometer-alt side-bar-icon"></i>
          <Link  to="/dashboard" className='side-bar-text'>Dashboard</Link>
        </span>
                </li>
                <li>
        <span className="side-bar-cutome-css">
          <i className="fas fa-leaf side-bar-icon"></i>
          <Link to="/field" className='side-bar-text'>Field Management</Link>
        </span>
                </li>
                <li>
        <span className="side-bar-cutome-css">
          <i className="fas fa-seedling side-bar-icon"></i>
          <Link to="/crop" className='side-bar-text'>Crops Management</Link>
        </span>
                </li>
                <li>
        <span className="side-bar-cutome-css">
          <i className="fas fa-users side-bar-icon"></i>
          <Link to="/staff" className='side-bar-text'>Staff</Link>
        </span>
                </li>
                <li>
        <span className="side-bar-cutome-css">
          <i className="fas fa-book-open side-bar-icon"></i>
          <Link to="/logs" className='side-bar-text'>Monitoring Logs</Link>
        </span>
                </li>
                <li>
        <span className="side-bar-cutome-css">
          <i className="fas fa-truck side-bar-icon"></i>
          <Link to="/vehicles" className='side-bar-text'>Vehicles</Link>
        </span>
                </li>
                <li>
        <span className="side-bar-cutome-css">
          <i className="fas fa-tools side-bar-icon"></i>
          <Link to="/equipment" className='side-bar-text'>Equipment</Link>
        </span>
                </li>
                <li>
        <span className="side-bar-cutome-css">
          <i className="fas fa-sign-out-alt side-bar-icon"></i>
          <Link to="/logout" className='side-bar-text'>Log Out</Link>
        </span>
                </li>
            </ul>
        </aside>
    )
}