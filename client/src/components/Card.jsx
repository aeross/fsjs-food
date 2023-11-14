export default function Card({ recipe }) {
    return (<>
        <div className="border p-4 m-4">
            <figure>
                <img src={recipe.imageUrl} alt="" />
            </figure>
            <div>
                <p className="text-bold text-center my-4">{recipe.name}</p>
                <button className="btn btn-sm my-4">Action</button>
            </div>
        </div>
    </>)
}