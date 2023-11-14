import { useEffect, useState } from "react"
import axios from "axios"
import Card from "../components/Card";
import { Link } from "react-router-dom";

export default function Home({ url }) {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${url}/recipes`);
                setRecipes(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])

    return (<>
        {/* recommended recipes + user profile go here */}
        <div className="grid grid-cols-5 gap-3">
            { recipes.map(recipe => {
                return <Card key={recipe.id} recipe={recipe} />
            }) }
        </div>

        <div>
            <p>Looking to create your own custom recipe?</p>
            <Link to="/recipes/add"><button>Click here</button></Link>
        </div>
    </>)
}