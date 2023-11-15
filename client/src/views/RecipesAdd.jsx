import { useState } from "react";
import axios from "axios";

/**
 * Here, users are NOT going to insert each of the row data to add a new recipe.
 * Instead, they will search for an existing recipe using a 3rd-party API (Spponacular),
 * and have an option to add that recipe to our database.
 */
export default function RecipesAdd() {
    const [foundRecipe, setFoundRecipe] = useState({});
    const [search, setSearch] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(search);
    }

    return (<>
    <div className="flex flex-col gap-3 justify-center items-center w-full">
        <form>
            <div className="flex flex-col justify-center items-center gap-3 mb-5">
                <h1 className="text-bold">Find your recipe here</h1>
                <h2>We will return you the best-matched recipe based on your search query.</h2>
                <span className="text-xs">Note: don't do this too often. I'm using a third-party API to search, and there's a daily quota limit. Please. :)</span>
            </div>
            <div className="col-span-2 flex justify-between">
                <input 
                    onChange={(event) => { setSearch(event.target.value) }} 
                    type="text" 
                    id="search" 
                    name="search" 
                    className="border rounded mx-4 px-2 w-[100%]"
                    placeholder="search for a recipe..."
                />
                <button 
                    onClick={handleSubmit}
                    type="submit" 
                    className="rounded-lg w-24 px-4 py-1 hover:bg-slate-200 active:bg-slate-300"
                >
                    Search
                </button>
            </div>
        </form>
    </div>
    </>)
}