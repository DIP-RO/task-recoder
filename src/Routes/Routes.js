import Auht from "../Layout/Auht";
import AddTask from "../Pages/AddTask/AddTask";
import Login from "../Pages/Athentication/Login/Login";
import Register from "../Pages/Athentication/Register/Register";
import Completed from "../Pages/Completed/Completed";
import Error from "../Pages/Error/Error";
import UserPage from "../Pages/UserPage/UserPage";
import Private from "./Private/Private";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../Layout/Main");
const { default: MyTask } = require("../Pages/MyTask/MyTask");

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Private><Main></Main></Private>,
        children: [
            {
                path: '/',
                element:<Private><MyTask></MyTask></Private>
            },
            {
                path: '/addtask',
                element:<Private> <AddTask></AddTask></Private>,
                
            },
            {
                path: '/completed',
                element:<Private><Completed></Completed></Private>
            },
            {
                path: '/user',
                element:<Private><UserPage></UserPage></Private>
            },
            {
                path: '*',
                element:<Error></Error>
            }
        ]
        
    },
    {
        path: '/auht',
        element: <Auht></Auht>,
        children: [
            {
                path: '/auht/login',
                element:<Login></Login>
            },
            {
                path: '/auht/register',
                element:<Register></Register>
            },
            {
                path: '*',
                element:<Error></Error>
            }
        ]
    }
    
])