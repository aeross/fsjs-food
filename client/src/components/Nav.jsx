import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom"

export default function Nav() {
    const navigate = useNavigate();
    function handleLogout() {
        localStorage.clear();
        googleLogout();
        navigate("/login");
    }

    return (<>
    <nav className="sticky flex justify-between m-4 p-4 bg-slate-100">
        <button className="btn btn-sm">home</button>
        <button className="btn btn-sm">about</button>
        <button onClick={handleLogout} className="btn btn-sm">Log Out</button>
    </nav>
    </>)
}