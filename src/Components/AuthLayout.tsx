import {Outlet} from "react-router-dom";

export function AuthLayout() {
    return (
       <section className="min-h-screen flex justify-center items-center bg-LogoSectionGreen">
           <Outlet/>
       </section>
    )
}