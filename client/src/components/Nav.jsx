import { googleLogout } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function Nav({ url }) {
    const token = `Bearer ${localStorage.getItem("accessToken")}`;
    const navigate = useNavigate();

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

    function handleLogout() {
        localStorage.clear();
        googleLogout();
        navigate("/login");
    }

    return (<>
    <nav className="sticky flex justify-between m-4 p-4 bg-slate-100">
        <Link to="/"><button className="rounded-lg w-24 px-4 py-1 hover:bg-slate-200 active:bg-slate-300">Home</button></Link>
        <div>Welcome back, <span className="text-bold">{user.name}</span></div>
        <button onClick={handleLogout} className="rounded-lg w-24 px-4 py-1 hover:bg-slate-200 active:bg-slate-300">Log Out</button>
    </nav>
    </>)
}