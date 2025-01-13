import SidBarComponent from './SideBarComponent.tsx'
import TopHeaderComponent from "./TopHeaderComponent.tsx";
import {Outlet} from "react-router-dom";
import {useState} from "react";
export  function MainLayout() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    return (
        <section className='min-h-screen bg-gradient-to-b from-DashboardBackgroundColor to-white'>
            <SidBarComponent isOpen={isSidebarOpen}  />
            <TopHeaderComponent toggleSidebar={toggleSidebar} />
            <Outlet/>
        </section>
    )
}