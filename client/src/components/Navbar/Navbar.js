import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

import UserContext from "../../context/UserContext";
import AppContext from "../../context/AppContext";


import AlertBanner from "../utilComponents/AlertBanner/AlertBanner";

import "./Navbar.css"

function Navbar({logout}) {

    const { localUser, jose, token, isOwner } = useContext(UserContext);
    const { setError } = useContext(AppContext);


    function logoutFunc() {
        console.log("Logout - NavBar");
        logout();
        setError({message: "Logout Successful", type: "success"})
    }   

    return (
        <>
            <nav className={`Navbar ${isOwner ? 'Owner' : ''}`}>
                <div>
                    <NavLink className={`${isOwner ? 'Navlink-White' : ''}`} to="/">Home</NavLink>
                </div>
                {
                    localUser 
                    ?
                    <div>
                        <NavLink className={`${isOwner ? 'Navlink-White' : ''}`} to={`/${isOwner ? 'owner': 'customer'}/${localUser}`}>{localUser}</NavLink>
                        <NavLink className={`${isOwner ? 'Navlink-White' : ''}`} to="/" onClick={logoutFunc}>Logout</NavLink>
                    </div>
                    :                
                    <div>
                        <NavLink className={`${isOwner ? 'Navlink-White' : ''}`} to="/login">Login</NavLink>
                        <NavLink className={`${isOwner ? 'Navlink-White' : ''}`} to="/signup">Signup</NavLink>
                    </div> 
                }
            </nav>
        </>
    )
}

export default Navbar;