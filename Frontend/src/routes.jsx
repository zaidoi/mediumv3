import { createBrowserRouter } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import AllBlog from "./Pages/AllBlog";
import Blog from "./Pages/Blog";
import CreateBlog from "./Pages/CreateBlog";





const router = createBrowserRouter([
    {
        path:"/",
        element:<Signup/>
    },
    {
        path:"/login",
        element:<Login/>
    },{
        path:"/blogs",
        element:<AllBlog/>
    },{
        path:"/blog/:id",
        element:<Blog/>
    },{
        path:"/cblog",
        element:<CreateBlog/>
    }
])


export default router