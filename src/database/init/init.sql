CREATE TABLE IF NOT EXISTS orders (
    orderId TEXT PRIMARY KEY,
    value NUMERIC NOT NULL,
    creationDate TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
    orderId TEXT NOT NULL,
    productId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price NUMERIC NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(orderId)
);