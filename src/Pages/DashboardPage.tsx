import DashboardCardComponent from "../Components/DashboardCardComponent.tsx";

import WeatherMap from "../Components/WetherMap.tsx";
import TaskCalendar from "../Components/TaskShedularComponent.tsx";

export default function DashboardPage(){


    return (

        <>
            <section>
                <div className="flex flex-wrap items-center justify-center md:mt-10 md:ml-40 ml-0 mt-14 " >
                    <DashboardCardComponent title="Total Crops" value='20'/>
                    <DashboardCardComponent title="Active Staff" value='18'/>
                    <DashboardCardComponent title="Completed Tasks" value='10'/>

                </div>


                <div className="relative" >
                    {/* Weather Card */}
                    <div className="relative md:top-10 md:ml-10">
                        <WeatherMap />
                    </div>

                    {/* Task Calendar */}
                    <div className=" md:absolute md:top-1 md:right-20 min-h-100 justify-center items-center flex  ">
                        <TaskCalendar />
                    </div>
                </div>



            </section>

        </>
    )
}