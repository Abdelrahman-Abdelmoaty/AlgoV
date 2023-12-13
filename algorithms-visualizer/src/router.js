import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";

const router = createBrowserRouter([
    {
        path: '',
        element: <Home />
    },
])

export default function MyRouter(){
    return <RouterProvider router={router} /> 
}