import { createBrowserRouter } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";





const router = createBrowserRouter([
    {
        path:"/",
        element:<Signup/>
    },
    {
        path:"/login",
        element:<Login/>
    }
])


export default router