import React, { useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";

import "./Homepage.css"

import RestaurantList from "../Restaurants/RestaurantList/RestaurantList";

import UserContext from "../../context/UserContext";

function Homepage() {

    const navigate = useNavigate();

    const { localUser, isOwner } = useContext(UserContext);

    useEffect(() => {
        if (localUser && isOwner) navigate(`/owner/${localUser}`)
    }, [])

    return (
        <div>
            <h1>Home</h1>
            <RestaurantList />
        </div>
    )
}

export default Homepage;