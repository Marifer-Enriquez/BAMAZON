
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon; 

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (50),
    department_name VARCHAR (50),
    price INTEGER (11),
    stock_quantity INTEGER (11),
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("crackers for dogs", "Dog Food", 100, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chewing toys", "Dog toys", 20, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Squeaking toy", "Dog toys", 15, 350);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Small plush", "Dog toys", 10, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Costumes", "Dog clothes", 90, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sweaters", "Dog clothes", 90, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shoes", "Dog clothes", 35, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Backpack", "Dog clothes", 50, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("large size bed", "Dog houses", 350, 55);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("large size kennel", "Dog houses", 500, 60);

USE bamazon; 
SELECT * FROM products;