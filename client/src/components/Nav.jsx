import { googleLogout } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function Nav({ url }) {
    const token = `Bearer ${localStorage.getItem("accessToken")}`;
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.clear();
        googleLogout();
        navigate("/login");
    }

    return (<>
    <nav className="sticky flex justify-between m-4 p-4 bg-slate-100">
        <Link to="/"><button className="rounded-lg w-24 px-4 py-1 hover:bg-slate-200 active:bg-slate-300">Home</button></Link>
        <div></div>
        <div>
            <Link to="/complete-profile">
                <button className="rounded-lg w-32 px-4 py-1 hover:bg-slate-200 active:bg-slate-300">Edit Profile</button>
            </Link>
            <button 
                onClick={handleLogout} 
                className="rounded-lg w-24 px-4 py-1 hover:bg-slate-200 active:bg-slate-300">
                    Log Out
            </button>
        </div>
    </nav>
    </>)
}