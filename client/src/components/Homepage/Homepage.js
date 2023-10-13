import React, { useEffect, useContext } from "react";

import { useNavigate, Link } from "react-router-dom";

import "./Homepage.css"

import RestaurantList from "../Restaurants/RestaurantList/RestaurantList";
import FoodSearch from "../FoodSearch/FoodSearch";

import UserContext from "../../context/UserContext";

function Homepage() {

    const navigate = useNavigate();

    const { localUser, isOwner } = useContext(UserContext);

    useEffect(() => {
        if (localUser && isOwner) navigate(`/owner/${localUser}`)
    }, [])

    return (
        <div className="HomePage">
            {/* <RestaurantList /> */}
            <FoodSearch />
            <h4 className="HomePage-AllRestaurants-Link"><Link to="/res">See all restaurants</Link></h4>
        </div>
    )
}

export default Homepage;