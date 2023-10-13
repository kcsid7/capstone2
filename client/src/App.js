import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, redirect } from "react-router-dom";
import * as jose from "jose";

import './App.css';

import { USER_TOKEN, CUR_USER, IS_OWNER } from "./config";

// Context
import UserContext from "./context/UserContext";
import AppContext from "./context/AppContext";

// React Components
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import LoginOwner from "./components/LoginOwner/LoginOwner";
import Signup from "./components/Signup/Signup";
import SignupOwner from "./components/SignupOwner/SignupOwner"
import PageNotFound from "./components/PageNotFound/PageNotFound";
import CustomerProfile from "./components/CustomerProfile/CustomerProfile";
import OwnerProfile from "./components/OwnerProfile/OwnerProfile";
import Restaurant from "./components/Restaurants/Restaurant/Restaurant";
import RestaurantEdit from "./components/Restaurants/RestaurantEdit/RestaurantEdit";
import OrderConfirmPage from "./components/OrderConfirmPage/OrderConfirmPage.js";
import CustomerOrderDetails from "./components/CustomerOrderDetails/CustomerOrderDetails";

import AlertBanner from "./components/utilComponents/AlertBanner/AlertBanner";

// Hooks
import useLocalStorage from "./hooks/useLocalStorage";
import useErrorState from "./hooks/useErrorState";

// API
import customerAPI from "./api/customerAPI";
import ownerAPI from "./api/ownerAPI";
import { formControlClasses } from "@mui/material";
import FoodSearch from "./components/FoodSearch/FoodSearch";
import RestaurantList from "./components/Restaurants/RestaurantList/RestaurantList";


function App() {

  const navigate = useNavigate();

  /* 
  custom error hook state that resets the error to null after a given time
  this time also determines for how long this error will be displayed
  */
  const [error, setError] = useErrorState(5000);  // error : {messsage: "", type: ""}
  const errorMessage = (error) => {
      return error ?
      <>
          <AlertBanner width={70} message={error.message} type={error.type}/>
      </>
      : <></>
  } 
  
  const [currentUser, setCurrentUser] = useState(null);

  const [token, setToken] = useLocalStorage(USER_TOKEN);
  const [localUser, setLocalUser] = useLocalStorage(CUR_USER);
  const [isOwner, setIsOwner] = useLocalStorage(IS_OWNER);


  useEffect(function getCurrentUser() {
    if (token && !currentUser) {
      try {
        console.log("App Running! - useEffect", jose.decodeJwt(token))
        const { username } = jose.decodeJwt(token);

        async function getCustomerInfo() {
          customerAPI.token = token;
          let res = await customerAPI.getCustomer(username);
          setCurrentUser(res);
        }

        async function getOwnerInfo() {
          ownerAPI.token = token;
          let res = await ownerAPI.getOwner(username);
          setCurrentUser(res);
        }
        
        isOwner ? getOwnerInfo() : getCustomerInfo();

      } catch (e) {
        setCurrentUser(null);
      }
    }
  }, [token])



  async function ownerSignup(signupData) {
    try {
      console.log("APP - Owner Signup")
      const signupRes = await ownerAPI.registerOwner(signupData);
      const authToken = signupRes.authToken;
      setToken(authToken);
      const { username, isOwner } = jose.decodeJwt(authToken);
      setLocalUser(username);
      setIsOwner(isOwner);
      setError({message: `Login Successful! Welcome ${username}`, type: "success"})
      navigate(`/owner/${username}`);
      return {
        token: authToken
      }
    } catch(e) {
        setToken(null);
        setLocalUser(null);
        setIsOwner(null);
        setCurrentUser(null);
        throw e
    }
  }


  async function signup(signupData) {
    try {
      console.log("APP - Signup")
      const signupRes = await customerAPI.registerCustomer(signupData);
      const authToken = signupRes.authToken;
      setToken(authToken);
      const { username } = jose.decodeJwt(authToken);
      setLocalUser(username);
      navigate(`customer/${username}`, 
              {
                replace: true,
                state: {message: `Welcome ${username}! You've successfully signed up!`}
              });

      return {
        token: authToken
      }
    } catch(e) {
      setToken(null);
      setLocalUser(null);
      setCurrentUser(null);
      throw e
    }
  }

  async function ownerLogin(loginData) {
    try {
      console.log("APP - Login Owner")
      const loginRes = await ownerAPI.loginOwner(loginData);
      const authToken = loginRes.authToken;
      setToken(authToken);
      const { username, isOwner } = jose.decodeJwt(authToken);
      setLocalUser(username);
      setIsOwner(isOwner);
      setError({message: `Owner Login Successful! Welcome ${username}`, type: "success"})
      navigate(`owner/${username}`);
      return {
        token: authToken
      }
    } catch(e) {
      setToken(null);
      setLocalUser(null);
      setIsOwner(null);
      setCurrentUser(null);
      throw e
    }
  }


  async function login(loginData) {
    try {
      console.log("APP - Login")
      const loginRes = await customerAPI.loginCustomer(loginData);
      const authToken = loginRes.authToken;
      setToken(authToken);
      const { username } = jose.decodeJwt(authToken);
      setLocalUser(username);
      setError({message: `Login Successful! Welcome ${username}`, type: "success"})
      navigate(`customer/${username}`);
      return {
        token: authToken
      }
    } catch(e) {
      setToken(null);
      setLocalUser(null);
      setCurrentUser(null);
      throw e
    }
  }

  function logout() {
    console.log("Logout - App");
    setToken(null);
    setLocalUser(null);
    setIsOwner(null);
    setCurrentUser(null);
  }

  return (
    <AppContext.Provider value= {{setError}}>
    <UserContext.Provider 
      value = {{setCurrentUser, currentUser, token, setToken, localUser, isOwner}}
    >
      <div className="App container-xl">
        <Navbar logout={logout}/>
        { errorMessage(error) }
        <Routes>
          <Route path="/" element={ <Homepage /> } />
          <Route path="/signup" element={<Signup signup={signup}/>} />
          <Route path="/signup/owner" element={<SignupOwner signup={ownerSignup}/>} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/login/owner" element={<LoginOwner login={ownerLogin} />} />
          <Route path="/order/:oNum" element={<CustomerOrderDetails />} />
          <Route path="/customer/:username" element={<CustomerProfile />} />
          <Route path="/owner/:username" element={<OwnerProfile />} />
          <Route path="/res" element={<RestaurantList />}/>
          <Route path="/res/:id" element={ isOwner ? <RestaurantEdit/> : <Restaurant /> } />
          {/* <Route path="/res/:id/edit" element={<RestaurantEdit />} /> */}
          <Route path="/res/:id/order/confirm" element={<OrderConfirmPage />} />
          <Route path="/test/foodsearch" element={<FoodSearch />} />
          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </div>
    </UserContext.Provider>
    </AppContext.Provider>

  );
}

export default App;
