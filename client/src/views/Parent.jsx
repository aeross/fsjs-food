import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

export default function Parent() {
    return (<>
        <Nav />
        <Outlet />
    </>)
}