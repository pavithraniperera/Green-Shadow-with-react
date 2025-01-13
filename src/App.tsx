import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AuthLayout} from "./Components/AuthLayout.tsx";
import LoginPage from "./Pages/LoginPage.tsx";
import SignUpPage from "./Pages/SignUpPage.tsx";
import {Provider} from "react-redux";
 import store from "./Store/Store.ts";
//import  SidBarComponent from "./Components/SideBarComponent.tsx"
//import TopHeaderComponent from "./Components/TopHeaderComponent.tsx";
import {MainLayout} from "./Components/MainLayout.tsx";
import DashboardPage from "./Pages/DashboardPage.tsx";
import FieldPage from "./Pages/FieldsPage.tsx";
import CropsPage from "./Pages/CropsPage.tsx";
import StaffPage from "./Pages/StaffPage.tsx";
import LogsPage from "./Pages/LogsPage.tsx";
import VehiclePage from "./Pages/VehiclePage.tsx";
import EquipmentPage from "./Pages/EquipmentPage.tsx";


function App() {
  const routes = createBrowserRouter(
      [
        {
          path: "/",
          element: <AuthLayout />,
          children: [
            { path: "", element: <LoginPage /> }, // Default to LoginPage
            { path: "signup", element: <SignUpPage /> },
          ],
        },
          {
              path: "/", // Important: Same base path as AuthLayout, but different layout
              element: <MainLayout />,
              children: [
                  { path: "dashboard", element: <DashboardPage /> },
                  { path: "field", element: <FieldPage /> },
                  { path: "crop", element: <CropsPage /> },
                  { path: "staff", element: <StaffPage /> },
                  { path: "logs", element: <LogsPage /> },
                  { path: "vehicles", element: <VehiclePage /> },
                  { path: "equipment", element: <EquipmentPage /> },
              ],
          }
        ]
  );


  return (
    <>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>

    </>
  )
}

export default App
