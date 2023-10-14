# Restaurant Manager

Application for customers to find and order food and for restaurant owners to create an online store for their restaurants.

## [Live Site](https://res-mngr-94e5e72ba7c6.herokuapp.com/)

## Description

Res-Manager is designed as an online storefront for restaurants to show and get customer orders. 
The centralized food item database makes it easy for the customer to search for and pick out their favorite food items from their favorite restaurants.
The customers have the ability to track their past order history in their own unique profile.
The restaurant owners also have a unique profile where they are able to manage one or multiple restaurants, curate the restaurant menu, and track customer orders for each of their restaurants.

Although the application is designed for restaurants, the underlying functionality can be utilized for other types of store fronts. 
Sellers can create their profile, manange one or more stores that provides different inventories. 
Buyers can search through a centralized database for

## Getting Started
### Dependencies

* npm: 9.6.2 (Used during development)
* node: 18.14.2 (Used during development)
* postgreSQL
* React
* Bootstrap

### Installing

* (Disclaimer: Later versions of npm and node may cause issues) 
* Install npm v. 9.6.2 (Used during development)
* Install node v. 18.14.2 (Used during development)
* Clone the repository, ensure the package.json file is in place, and install dependencies
```
npm install
```
* The application uses React for the frontend. Install the dependencies for the client package.json as well. 
```
cd client && npm install
```

### Executing program

* Ensure all the dependencies have been properly installed
* Start the server (dev)
```
npm start
```
* The backend server will be started on Port 5000 (Default). 
* In development, the backend will only serve JSON as an API. Therefore, it may be necessary to start the React client as well.
```
cd client && npm start
```
* During production, the backend will serve the built react file
  

## Errors

The backend API is designed with various errors. There is full authentication and authorization in place for user profile and user privilages.
```
// 401 UNAUTHORIZED
class UnauthorizedError extends ExpressError {
    constructor(message="Unauthorized") {
        super(message, 401);
    }
}
```

```
// 400 BAD REQUEST
class BadRequestError extends ExpressError {
    constructor(message="Bad Request") {
        super(message, 400);
    }
}
```

## Authors

sKc

## Version History

* 0.1
    * Initial Release


