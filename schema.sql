	CREATE DATABASE Bamazon;
    USE Bamazon;
    
    CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
    );

    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Banana", "Produce", 0.80, 100), ("Apple", "Produce", 0.95, 4), ("Potato", "Produce", 0.50, 125);

    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Echo Dot", "Electronics", 50.00, 5), ("Bluetooth Speaker", "Electronics", 15.00, 21);

    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Amazon Echo", "Electronics", 180.00, 40), ("Seinfeld: The Complete Series", "Movies & TV", 40.00, 3), ("Finding Dory", "Movies & TV", 20.00, 200);

    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Honey Nut Cheerios", "Grocery", 3.20, 300), ("Kellog's Frosted Mini Wheats", "Grocery", 3.88, 300);