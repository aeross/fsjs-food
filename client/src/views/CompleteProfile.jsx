import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function CompleteProfile({ url }) {
    const token = `Bearer ${localStorage.getItem("accessToken")}`;
    const navigate = useNavigate();

    // complete user data to get a personalised recommendation of recipes
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${url}/user-info`, {
                    headers: { Authorization: token }
                });
                
                // if data is already complete, directly navigate to home page
                const { name, gender, age, height, weight } = data;
                if (name && gender && age && weight && height) useNavigate("/");

                // otherwise, ask user to fill their data
                setName(name);
                setGender(gender);
                setAge(age);
                setHeight(height);
                setWeight(weight);
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
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        const data = { name, age, gender, height, weight }
        try {
            await axios.put(`${url}/complete-profile`, data, {
                headers: { Authorization: token }
            });
            navigate("/");
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
    }


    return (<>
    <div className="flex flex-col gap-3 justify-center items-center w-full">
        <h1 className="text-bold mt-4">Complete Your Profile</h1>
        <h2>Fill your data below to get a personalised recommendation of recipes!</h2>
        <form className="p-8 w-[70%] bg-slate-100 grid grid-cols-2 gap-4">
            <div className="col-span-2 flex justify-between">
                <label htmlFor="name">Name</label>
                <input onChange={(event) => { setName(event.target.value) }} type="text" id="name" name="name" className="border rounded mx-4 w-[100%]" />
            </div>

            <div className="flex justify-between">
                <label htmlFor="gender">Gender</label>
                <select onChange={(event) => { setGender(event.target.value) }} defaultValue={'DEFAULT'} name="gender" id="gender" className="border mx-4 w-[100%]">
                    <option value="DEFAULT" disabled>Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>

            <div className="flex justify-between">
                <label htmlFor="age">Age</label>
                <input onChange={(event) => { setAge(event.target.value) }} type="number" id="age" name="age" className="border mx-4 w-[100%]" />
            </div>

            <div className="flex justify-between">
                <label htmlFor="height">Height</label>
                <input onChange={(event) => { setHeight(event.target.value) }} type="number" step="0.1" id="height" name="height" className="border mx-4 w-[100%]" />
            </div>

            <div className="flex justify-between">
                <label htmlFor="weight">Weight</label>
                <input onChange={(event) => { setWeight(event.target.value) }} type="number" step="0.1" id="weight" name="weight" className="border mx-4 w-[100%]" />
            </div>

            <div>
                <button onClick={handleSubmit} type="submit" className="rounded-lg w-24 px-4 py-1 bg-slate-100 hover:bg-slate-200 active:bg-slate-300">Submit</button>
                <button className="rounded-lg w-24 px-4 py-1 bg-slate-100 hover:bg-slate-200 active:bg-slate-300">Skip</button>
            </div>
        </form>
    </div>
    </>)
}