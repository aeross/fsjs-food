import { useEffect, useState } from "react"
import axios from "axios"
import Card from "../components/Card";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Home({ url }) {
    const token = `Bearer ${localStorage.getItem("accessToken")}`;
    const navigate = useNavigate();

    // user data (that is currently logged in)
    const [user, setUser] = useState({});
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${url}/user-info`, {
                    headers: { Authorization: token }
                });
                setUser(data)
            } catch (error) {
                console.log(error);
                if (error.response.status == 401) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: error.response.data.message
                    });
                    navigate("/login");
                }
            }
        })();
    }, [])

    // recipe data
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${url}/recipes`, {
                    headers: { Authorization: token }
                });
                setRecipes(data);
            } catch (error) {
                console.log(error);
                if (error.response.status == 401) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: error.response.data.message
                    });
                    navigate("/login");
                }
            }
        })();
    }, [recipes])

    return (<>
        {/* recommended recipes + user profile go here */}
        <div className="grid grid-cols-5 gap-3">
            { recipes.map(recipe => {
                return <Card key={recipe.id} recipe={recipe} user={user} url={url} />
            }) }
        </div>

        <div className="m-3">
            <p>Looking to create your own custom recipe?
                <Link to="/recipes/add">
                    <button className="rounded-lg w-28 mx-2 px-4 py-1 bg-slate-100 hover:bg-slate-200 active:bg-slate-300">Click here</button>
                </Link>
            </p>
        </div>
    </>)
}