import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Login({ url }) {
    const navigate = useNavigate();

    async function googleLogin(codeResponse) {
        try {
            const { data } = await axios.post(`${url}/login`, {}, {
                headers: { token: codeResponse.credential }
            });
            localStorage.setItem("accessToken", data);
            navigate("/complete-profile");
        } catch (error) {
            console.log(error);
        }
    }

    return (<>
        <GoogleLogin onSuccess={googleLogin} />
    </>)
}