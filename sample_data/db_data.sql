\c res_manager;

CREATE TABLE owners (
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username VARCHAR(30) PRIMARY KEY,
    email TEXT NOT NULL CHECK (position('@' IN email) > 1) UNIQUE,
    password TEXT NOT NULL,
    phone INTEGER NOT NULL,
    license TEXT NOT NULL,
    address TEXT,
    city TEXT,
    state TEXT,
    zipcode INTEGER
);

CREATE TABLE customers (
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username VARCHAR(32) PRIMARY KEY,
    email TEXT NOT NULL CHECK (position('@' IN email) > 1),
    password TEXT NOT NULL,
    phone INTEGER NOT NULL,
    address TEXT,
    city TEXT,
    state TEXT,
    zipcode INTEGER
);

CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    street_address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    phone INTEGER NOT NULL,
    email TEXT NOT NULL,
    zipcode INTEGER
);

CREATE TABLE owners_restaurants (
    id SERIAL PRIMARY KEY,
    owner_id TEXT REFERENCES owners ON DELETE CASCADE,
    restaurant_id INTEGER REFERENCES restaurants ON DELETE CASCADE
);

CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL,
    price FLOAT NOT NULL,
    restaurant_id INTEGER REFERENCES restaurants ON DELETE SET NULL,
    image TEXT
);

CREATE TABLE orders (
    order_number TEXT PRIMARY KEY,
    order_date DATE NOT NUll,
    total_price FLOAT NOT NUll,
    customer_id TEXT REFERENCES customers ON DELETE SET NULL,
    restaurant_id INTEGER REFERENCES restaurants ON DELETE SET NULL,
    customer_name TEXT,
    customer_email TEXT,
    customer_phone TEXT,
    customer_full_address TEXT,
    order_time TIME,
    tip FLOAT,
    tax FLOAT
);


CREATE TABLE orders_menuitems (
    id SERIAL PRIMARY KEY,
    order_number TEXT NOT NULL REFERENCES orders ON DELETE CASCADE,
    item_id INTEGER REFERENCES menu_items ON DELETE SET NULL,
    quantity INTEGER NOT NULL,
    item_name TEXT NOT NULL,
    item_description TEXT,
    item_price FLOAT,
    item_total FLOAT,
    notes TEXT
);


ALTER TABLE orders
ADD COLUMN tip FLOAT,
ADD COLUMN tax FLOAT;


INSERT INTO owners (first_name, last_name, username, email, password, phone, licence, address, city, state, zipcode) VALUES 
    ('John', 'Owner', 'owner1', 'owner1@owner.com', 'password1', 123456789, 'ABBAAAB', '123 Ave St', 'Capital City', 'CA', 90210),
    ('Jane', 'Doe', 'owner2', 'owner2@owner.com', 'password1', 123456789, 'ABBAAAB', '1232 S St', 'Capital City', 'CA', 90210);


INSERT INTO customers (first_name, last_name, username, email, password, phone, address, city, state, zipcode) VALUES 
    ('Cus', 'One', 'cus1', 'cus1@cus.com', 'password1', 123456789, '12 St St', 'Capital City', 'CA', 90210),
    ('Cust', 'Two', 'cus2', 'cus2@cus.com', 'password1', 123456789, '12 St St', 'Capital City', 'CA', 90210);


INSERT INTO restaurants (name, street_address, city, state, phone, email, zipcode) VALUES 
    ('Morning Sunshine', '1 Street St', 'New York', 'NY', 123456789, 'morn@sunshine.com', 12345),
    ('Evening Restaurant', '2 Street St', 'New York', 'NY', 123456789, 'even@sunshine.com', 12345);

INSERT INTO owners_restaurants (owner_id, restaurant_id) VALUES 
    ('owner1', 1),
    ('owner1', 2),
    ('owner2', 2);


INSERT INTO menu_items (name, description, type, price, restaurant_id) VALUES 
    ('Eggs', 'Eggs Cooked', 'Breakfast', 5.50, 1),
    ('Eggs', 'Eggs Bendict', 'Breakfast', 19.50, 2),
    ('Sandwich', 'Turkey Club', 'Lunch', 9.50, 2),
    ('Burrito', 'Carnitas', 'Lunch', 14.50, 1),
    ('Lobster', 'Lobster Steamed', 'Dinner', 49.99, 1),
    ('Burger', 'Hamburger and fries', 'Lunch', 19.99, 2),
    ('Pasta', 'Spaghetti', 'Dinner', 29.99, 1);


INSERT INTO menu_items (name, description, type, price, restaurant_id) VALUES 
    ('Chicken Momo', 'Momo with chicken', 'Lunch', 15.50, 7),
    ('Veg Momo', 'Momo with soy chunks', 'Lunch', 14.50, 7);


INSERT INTO orders (order_number, order_date, total_price, customer_id, restaurant_id, customer_name, customer_email, customer_phone, customer_full_address) VALUES 
    ('1DF', '05/06/2023', 20, 'cus1', 1, 'Cus1', 'cus@cus1.com', 123445666, '111St St, CA, MA1'),
    ('1WE', '05/02/2023', 74.99, 'cus2', 2, 'Cus2', 'cus@cus2.com', 123445666, '13St St, CA, MA1'),
    ('1AB', '05/04/2023', 100, 'cus1', 1, 'Cus1', 'cus1@cus1.com', 123445666, '15St St, CA, MA1'),
    ('1BC', '05/01/2023', 50, 'cus2', 2, 'Cus2', 'cus@cus1.com', 123445666, '11St St, CA, MA1');


INSERT INTO orders_menuitems (order_number, item_id, quantity, item_name, item_description, item_price, item_total) VALUES 
    ('1DF', 1, 3, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1AB', 2, 2, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1AB', 3, 5, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1AB', 5, 1, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1BC', 7, 1, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1BC', 5, 2, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1DF', 6, 2, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1DF', 3, 3, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1BC', 2, 5, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1BC', 1, 4, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1BC', 2, 2, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1WE', 4, 3, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1WE', 3, 3, 'Test Item Name', 'Test Item Description', 20, 100);



SELECT * FROM orders o JOIN orders_menuitems om ON o.order_number = om.order_number WHERE customer_id='cus1';

-- Get all orders details from a customer
SELECT * FROM orders o 
JOIN orders_menuitems om ON o.order_number = om.order_number 
JOIN menu_items mi ON om.menu_item = mi.id
WHERE customer_id='cus1';

-- Get menu item references based on order number
SELECT * FROM orders_menuitems om 
JOIN menu_items mi ON om.menu_item = mi.id 
WHERE om.order_number = '1WE';

-- Get all info from restaurant JOIN with menu_items for the restaurant
SELECT r.name as restaurantName, mi.name as menuItemName, r.*, mi.* FROM restaurants r 
JOIN menu_items mi ON r.id = mi.id
WHERE r.id = 1;


--- Get all orders from a restaurant
SELECT * FROM orders WHERE restaurant_id = 1;


-- Get order details based on order number
-- Joins with the menu items to get the associated menu item name and price
-- Joins with the order to get the order date and order total
-- Joins with the customer to get the customer first_name and phone number

SELECT om.order_number AS orderNumber, om.quantity, om.item_name,  
        om.item_price, om.item_total, om.item_description,
        o.order_date AS orderDate, o.total_price AS totalPrice, o.restaurant_id,
        c.first_name AS firstName, c.last_name AS lastName, c.phone, c.email
    FROM orders_menuitems om
    JOIN orders o ON om.order_number = o.order_number
    JOIN customers c ON o.customer_id = c.username
    WHERE om.order_number = '2WE';


-- Get Order
SELECT om.order_number AS orderNumber, om.quantity, om.item_name,  
    om.item_price, om.item_total, om.item_description,
    o.order_date AS orderDate, o.total_price AS totalPrice, o.restaurant_id AS resId,
    o.customer_id AS customerId
FROM orders_menuitems om
JOIN orders o ON om.order_number = o.order_number
WHERE om.order_number = '2WE';



-- Get All Restaurants From an Owner
SELECT owr.id, owr.restaurant_id AS restaurantId, r.name, r.street_address AS streetAddress, 
    r.city, r.state, r.phone, r.email
FROM owners_restaurants owr
JOIN restaurants r ON owr.restaurant_id = r.id
WHERE owr.owner_id = 'admin1';




--

SELECT om.id AS orderId, om.order_number AS orderNumber, om.quantity, om.item_name, om.item_id,
                om.item_price, om.item_total, om.item_description,
                o.order_date AS orderDate, o.total_price AS totalPrice, 
                o.restaurant_id AS restaurantId, o.customer_id AS customerId,
                c.first_name AS firstName, c.last_name AS lastName, c.phone, c.email
FROM orders o 
LEFT JOIN orders_menuitems om ON o.order_number = om.order_number 
JOIN customers c ON o.customer_id = c.username
WHERE o.order_number = '2WE';



-- 
SELECT  om.id AS orderId, om.order_number AS orderNumber, om.quantity, om.item_name, om.item_id,
                om.item_price, om.item_total, om.item_description,
                o.order_date AS orderDate, o.total_price AS totalPrice, 
                o.restaurant_id AS restaurantId, o.customer_id AS customerId,
                c.first_name AS firstName, c.last_name AS lastName, c.phone, c.email
        FROM orders o
        FULL JOIN orders_menuitems om ON o.order_number = om.order_number
        FULL JOIN customers c ON o.customer_id = c.username
        WHERE om.order_number = '2WE';



--
SELECT o.order_number, o.order_date, o.total_price, r.name
    FROM orders o
    JOIN restaurants r ON o.restaurant_id = r.id
    WHERE o.customer_id = 'cus1';



--

ALTER TABLE orders_menuitems
ADD COLUMN notes TEXT;


--

ALTER TABLE customers
ADD COLUMN address TEXT,
ADD COLUMN city TEXT,
ADD COLUMN state TEXT,
ADD COLUMN zipcode INTEGER;


ALTER TABLE owners
ADD COLUMN address TEXT,
ADD COLUMN city TEXT,
ADD COLUMN state TEXT,
ADD COLUMN zipcode INTEGER;


--

ALTER TABLE orders
ADD COLUMN customer_name TEXT,
ADD COLUMN customer_email TEXT,
ADD COLUMN customer_phone INTEGER,
ADD COLUMN customer_address TEXT;



ALTER TABLE orders
ADD COLUMN order_time TIME;


-- 

UPDATE customers
SET address = '2 River Lane', city = 'San City', state = 'CA', zipcode = 98765
WHERE username = 'cus1';



UPDATE orders
SET customer_name = 'Jim Customer', 
customer_email = 'cus1@cus.com',
customer_phone = 123456789,
customer_full_address = '2 River Lane, San City, CA, 98765'
WHERE customer_id = 'cus1';



UPDATE customers
SET address = '1 Sandy St', city = 'Cabria', state = 'GA', zipcode = 98764
WHERE username = 'cus2';



UPDATE orders
SET customer_name = 'Jade Ho', 
customer_email = 'cus2@cus.com',
customer_phone = 123456789,
customer_full_address = '1 Sandy St, Cabria, GA, 98764'
WHERE customer_id = 'cus2';


--
ALTER TABLE orders ALTER COLUMN customer_phone TYPE INTEGER;


UPDATE customers 
SET address = '1 Pineapple St',
city = 'Bikini Bottom',
state = 'SE',
zipcode = 99999 
WHERE username = 'sponge1';


INSERT INTO restaurants (name, street_address, city, state, phone, email) VALUES 
    ('Burger Shack', '10 1st St', 'New York', 'NY', 9851234503, 'burger@barny.com'),
    ('First Diner', '101 10th Ave', 'Hoboken', 'NJ', 2181234503, 'diner@njemail.com'),
    ('Ice cream shop', '201 London St', 'Union City', 'NJ', 2541232503, 'icecream@njemail.com');




-- Selecting all restaurants and joining the owner info 
SELECT r.name, owr.owner_id, owr.restaurant_id, r.id AS resId,
    r.email, r.phone
FROM restaurants r
JOIN owners_restaurants owr ON r.id = owr.restaurant_id;


SELECT r.name, r.id, owr.owner_id FROM restaurants r 
    JOIN owners_restaurants owr ON r.id = owr.restaurant_id
    WHERE r.id = 7;


SELECT r.*, owr.owner_id FROM restaurants r 
JOIN owners_restaurants owr ON r.id = owr.restaurant_id
WHERE r.id = 7;


SELECT om.id AS orderId, om.quantity, om.item_name, om.item_id,
                o.order_date AS orderdate, o.total_price AS totalprice, 
                o.customer_full_address AS address,
                r.name
        FROM orders o 
        LEFT JOIN orders_menuitems om ON o.order_number = om.order_number 
        LEFT JOIN restaurants r ON o.restaurant_id = r.id
        WHERE o.order_number = '1WE';