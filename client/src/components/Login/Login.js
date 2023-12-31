import React, {useState} from "react";

import { Link } from "react-router-dom";

import useFormData from "../../hooks/useFormData";
import useErrorState from "../../hooks/useErrorState";

import "./Login.css"


import AlertBanner from "../utilComponents/AlertBanner/AlertBanner";

function Login({login}) {

    const initialValue = {
        username: "",
        password: ""
    };

    const [formData, updateForm, resetForm] = useFormData(initialValue);

    /* 
    custom error hook state that resets the error to null after a given time
    this time also determines for how long this error will be displayed
    */
    const [error, setError] = useErrorState(5000); 

    const errorMessage = (error) => {
        return error ?
        <>
            <AlertBanner width={70} message={error.response.data.message} type="failure"/>
        </>
        : <></>
    }


    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const res = await login(formData);
            console.log("Login.js - success", res)
            resetForm(initialValue);
        } catch(e) {
            console.log("Login.js - Error", e);
            resetForm(initialValue);
            setError(e)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            {/* Alert */}
            {
                errorMessage(error)
            }
            <form className="Login-Form" onSubmit={handleSubmit}>
                <div className="Login-Form-Field">
                    <label htmlFor="username">Username</label>
                    <input required type="text" name="username" id="username" value={formData.username} onChange={updateForm}/>
                </div>
                <div className="Login-Form-Field">
                    <label htmlFor="password">Password</label>
                    <input required type="password" name="password" id="password" value={formData.password} onChange={updateForm}/>
                </div>
                <button disabled={!Object.values(formData).every(d => d !== "")}>Login</button>
            </form>
            <h5><Link to="/login/owner">Owner Login</Link></h5>
        </div>
    )
}

export default Login;