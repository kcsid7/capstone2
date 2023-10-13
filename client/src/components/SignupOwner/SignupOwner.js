import React from "react";

import { useNavigate, redirect, Link } from "react-router-dom";

import useFormData from "../../hooks/useFormData";
import useErrorState from "../../hooks/useErrorState";

import AlertBanner from "../utilComponents/AlertBanner/AlertBanner";

import customerAPI from "../../api/customerAPI";

import "./SignupOwner.css";

function SignupOwner({signup}) {

    const initialData = {
        firstName: "",
        lastName: "",
        username: "",
        license: "",
        password: "",
        email: "",
        phone: "",
        address:"",
        city: "",
        state: "",
        zipcode: ""
    }

    // Form Data Hook
    const [formData, updateForm, resetForm] = useFormData(initialData);

    /* 
    custom error hook state that resets the error to null after a given time
    this time also determines for how long this error will be displayed
    */
    const [error, setError] = useErrorState(7000); 

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
            const res = await signup(formData);
            resetForm(s => initialData); // Reset form data
        } catch(e) {
            // resetForm(s => initialData);
            setError(e)
        }
    }

    return (
        <div className="OwnerSignup">
            <h1>Owner Signup</h1>
            {
                errorMessage(error)
            }
            <form className="OwnerSignup-Form" onSubmit={handleSubmit}>
                <div className="OwnerSignup-Form-Field">
                    <label htmlFor="firstName">First Name</label>
                    <input required type="text" name="firstName" id="firstName" value={formData.firstName} onChange={updateForm}/>
                </div>
                <div className="OwnerSignup-Form-Field">
                    <label htmlFor="lastName">Last Name</label>
                    <input required type="text" name="lastName" id="lastName" value={formData.lastName} onChange={updateForm}/>
                </div>
                <div className="OwnerSignup-Form-Field">
                    <label htmlFor="license">License</label>
                    <input required type="text" name="license" id="license" value={formData.license} onChange={updateForm}/>
                </div>
                <div className="OwnerSignup-Form-Field">
                    <label htmlFor="username">Username</label>
                    <input required type="text" name="username" id="username" value={formData.username} onChange={updateForm}/>
                </div>
                <div className="OwnerSignup-Form-Field">
                    <label htmlFor="password">Password</label>
                    <input required type="password" name="password" id="password" value={formData.password} onChange={updateForm}/>
                </div>
                <div className="OwnerSignup-Form-Field">
                    <label htmlFor="email">Email</label>
                    <input required type="email" name="email" id="email" value={formData.email} onChange={updateForm}/>
                </div>
                <div className="OwnerSignup-Form-Field">
                    <label htmlFor="phone">Phone</label>
                    <input required type="text" name="phone" id="phone" value={formData.phone} onChange={updateForm}/>
                </div>
                <div className="OwnerSignup-Form-Field">
                    <label htmlFor="address">Address</label>
                    <input required type="text" name="address" id="address" value={formData.address} onChange={updateForm}/>
                </div>
                <div className="OwnerSignup-Form-Field">
                    <label htmlFor="city">City</label>
                    <input required type="text" name="city" id="city" value={formData.city} onChange={updateForm}/>
                </div>
                <div className="OwnerSignup-Form-Field">
                    <label htmlFor="state">State</label>
                    <input required type="text" name="state" id="state" value={formData.state} onChange={updateForm}/>
                </div>
                <div className="OwnerSignup-Form-Field">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input required type="number" name="zipcode" id="zipcode" value={formData.zipcode} onChange={updateForm}/>
                </div>
                <button disabled={!Object.values(formData).every(d => d !== "")}>Signup</button>
            </form>
            <h5><Link className="OwnerSignup-Customer-Link" to="/signup">Customer Signup</Link></h5>
        </div>
    )
}

export default SignupOwner;