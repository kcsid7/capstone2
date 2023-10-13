const db = require("../db");

const { NotFoundError, ExpressError } = require("../expressError");


class MenuItem {
    constructor(id, name, description, type, price, restaurantId, image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.price = price;
        this.restaurantId = restaurantId;
        this.image = image;
    }

    // Adds a new item to the menu_items table
    // item: {name, description, type(breakfast, lunch, dinner, drinks), price, restaurant_id}
    static async createMenuItem(newItem) {
        const {name, description, type, price, restaruantId, image} = newItem;

        const result = await db.query(`
            INSERT into menu_items
            (name, description, type, price, restaurant_id, image)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [name, description, type, price, restaruantId, image]) 

        return result.rows[0]
    }

    static async getById(menuId) {
        const result = await db.query(`
            SELECT * FROM menu_items WHERE id = $1
        `, [menuId])

        if (result.rows.length === 0) throw new NotFoundError('Menu-Item not found', 404);

        const {id, name, description, type, price, restaruantId, image} = result.rows[0];

        return new MenuItem(id, name, description, type, price, restaruantId, image);
    }

    async removeItem() {
        await db.query(`
            DELETE FROM menu_items WHERE id = $1
        `, [this.id])
        return ({
            message: "Removed menu-item from database",
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            type: this.type,
            restaurantId: this.restaurantId,
            image: this.image
        })
    }


    async updateItem() {
        const result = await db.query(`
            UPDATE menu_items
            SET name = $1, description = $2, type = $3, price = $4, image = $5
            WHERE id = $6
            RETURNING *
        `, [this.name, this.description, this.type, this.price, this.image, this.id])

        return result.rows[0];
    }


    // Search Form Query
    static async queryItem({name, maxPrice}) {
        try {
            
            let searchQuery = `SELECT m.*, r.name AS restaurant_name FROM menu_items m JOIN restaurants r ON m.restaurant_id = r.id`

            let whereExp = [];
            let queryVal = [];

            if (name !== undefined) {
                queryVal.push(`%${name}%`)
                whereExp.push(`m.name ILIKE $${queryVal.length}`);
            }

            if (maxPrice !== undefined) {
                queryVal.push(maxPrice)
                whereExp.push(`m.price <= $${queryVal.length}`);
            }

            if (whereExp.length > 0) {
                searchQuery += " WHERE " + whereExp.join(" AND ");
            }

            searchQuery += " ORDER BY m.name;";

            const result = await db.query(searchQuery, queryVal);
            return result.rows
        } catch(e){
            console.log(e);
            throw new ExpressError(e.detail, e.code); 
        }
    }
}

module.exports = MenuItem;