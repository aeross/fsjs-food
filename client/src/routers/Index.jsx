import { createBrowserRouter, redirect } from "react-router-dom";
import Parent from "../views/Parent";
import Home from "../views/Home";
import RecipesAdd from "../views/RecipesAdd";
import Login from "../views/Login";
const BASE_URL = "http://localhost:3000"

const router = createBrowserRouter([
    {
        path: "/",
        loader: () => redirect("/recipes")
    },
    {
        path: "/login",
        element: <Login url={BASE_URL} />
    },
    { 
        path: "/recipes", 
        element: <Parent url={BASE_URL} />,
        children: [
            { path: "", element: <Home url={BASE_URL} /> },
            { path: "add", element: <RecipesAdd url={BASE_URL} /> },
        ]
    }
])

export default router;