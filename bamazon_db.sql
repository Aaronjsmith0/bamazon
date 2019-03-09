DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price INTEGER(10),
  stock_quantity INTEGER(10),
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Television", "Electronics", 500, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("IPhone", "Electronics", 800, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", 1200, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("XBOX", "Electronics", 300, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sneakers", "Clothing", 80, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Flip Flops", "Clothing", 30, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TShirt", "Clothing", 25, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sofa", "Furnishings", 600, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chair", "Furnishings", 200, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rug", "Furnishings", 150, 20);

SELECT * FROM products;