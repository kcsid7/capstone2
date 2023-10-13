import React, { useState, useEffect, useContext} from "react";


import "./FoodSearch.css";

import AppContext from "../../context/AppContext";

import restaurantAPI from "../../api/restaurantAPI";

import FoodSearchMenuItem from "./FoodSearchMenuItem/FoodSearchMenuItem";


function FoodSearch() {

    const { setError } = useContext(AppContext);

    const [searchTerm, setSearchTerm] = useState("")

    const [foodItems, setFoodItems] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await restaurantAPI.queryMenuItem({name: searchTerm});
            setFoodItems(result);
            // setSearchTerm("");
        } catch(e) {
            console.log(e);
        }

    }


    const menuItems = (menu) => {

        if (menu.length === 0) {
            return (
                <h3>No Items Found</h3>
            )
        }
        return menu.map( i => <FoodSearchMenuItem 
                            name={i.name}
                            price={i.price}
                            description={i.description}
                            image={i.image}
                            id={i.id}
                            key={i.id}
                            resId={i.restaurant_id}
                            resName={i.restaurant_name}
                />)
    }



    return (
        <>
            <div className="FoodSearch">
                <h1>Find your food</h1>

                <form className="FoodSearch-Form" onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                    <button className="FoodSearch-Form-Search-Button" disabled={searchTerm === ""}>Search</button>
                </form>
                {
                    foodItems ?
                    <>
                    <div className="FoodSearch-MenuItems">
                        {menuItems(foodItems) }
                    </div>
                    </>
                    : <></>
                }
                
            </div>
        </>
    )

}

export default FoodSearch;