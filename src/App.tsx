import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AuthLayout} from "./Components/AuthLayout.tsx";
import LoginPage from "./Pages/LoginPage.tsx";
import SignUpPage from "./Pages/SignUpPage.tsx";
// import {Provider} from "react-redux";
// import store from "./Store/Store.ts";
import  SidBarComponent from "./Components/SideBarComponent.tsx"
import TopHeaderComponent from "./Components/TopHeaderComponent.tsx";


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
        }
        ]
  );


  return (
    <>
      {/*<Provider store={store}>*/}
      {/*  <RouterProvider router={routes} />*/}
      {/*</Provider>*/}
        <TopHeaderComponent/>
        <SidBarComponent/>
    </>
  )
}

export default App
