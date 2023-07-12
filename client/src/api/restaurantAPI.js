import axios from "axios";

const BASE = "http://localhost:5000";


class restaurantAPI {

    static token;
    
    // Returns a list of all the restaurants
    static async getAllRestaurants() {
        const restaurants = await axios.get(`${BASE}/res`);
        return restaurants.data;
    }


    // Returns restauant info and menu
    // Separate the responses
    static async getRestaurant(id, isOwner=false) {
        try {

            const restaurant = await axios.get(`${BASE}/res/${id}`);
            if (!isOwner) delete restaurant.data.owner;
            console.log(restaurant.data);
            return restaurant.data;
        } catch(e) {
            throw(e);
        }
    }

    // Create a new restaurant
    static async createNewRestaurant(resData) {
        try {
            const newRestaurant = await axios({
                method: "POST",
                url: `${BASE}/res/new`,
                data: resData,
                headers: { authtoken: restaurantAPI.token}
            })
            console.log("restaurantAPI axios result", newRestaurant)
            return newRestaurant.data;
        } catch(e) {
            console.log("restaurantAPI - createNewRestaurant", e)
            throw e
        }
    }

    // Delete Restaurant
    static async deleteRestaurant(id) {
        try {
            const removed = await axios.delete(`${BASE}/res/${id}/delete`);
            return removed.data;
        } catch(e) {
            throw(e);
        }
    }

    // Patch Restaurant
    static async updateRestaurant(resData, id) {
        try {
            const updatedRestaurant = await axios({
                method: "PATCH",
                url: `${BASE}/res/${id}/update`,
                data: resData,
                headers: { authtoken: restaurantAPI.token}
            })
            return updatedRestaurant.data;
        } catch(e) {
            console.log("restaurantAPI - updateRestaurant", e)
            throw(e);
        }
    }


    // Adds a new menu item to the restaurant(id)
    static async addMenuItem(resId, menuItem) {
        const newMenuItem = await axios({
            method: 'POST',
            url: `${BASE}/res/${resId}/menu/add`,
            data: menuItem
        })
        return newMenuItem.data;
    }


    // Deletes a menu item (using the item ID) and the restaurant id
    static async removeMenuItem(resId, menuItemId) {
        const removedItem = await axios.delete(`${BASE}/res/${resId}/menu/${menuItemId}/delete`)
        return removedItem.data;
    }


    // Updates a menu item (using the item ID) and the restaurant id
    static async updateMenuItem(resId, menuItemId, updatedMenuItem) {
        const updatedItem = await axios({
            method: 'PATCH',
            url: `${BASE}/res/${resId}/menu/${menuItemId}/update`,
            data: updatedMenuItem
        })
        return updatedItem.data; 
    }

    static async placeOrder(resId, orderData) {
        const order = await axios({
            method: 'POST',
            url: `${BASE}/res/${resId}/order`,
            data: orderData
        })
        return order.data;
    }



    
    // Query MenuItem From Search Term
    static async queryMenuItem({name, maxPrice}) {
        const menuItem = await axios.get(`${BASE}/menuitem?name=${name}`)
    }


} //restaurantAPI END

export default restaurantAPI;