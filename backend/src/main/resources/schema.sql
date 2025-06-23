CREATE TABLE IF NOT EXISTS app_user (
                                    id BIGSERIAL PRIMARY KEY,
                                    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
    );

CREATE TABLE IF NOT EXISTS product (
                                       id BIGSERIAL PRIMARY KEY,
                                       name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_by VARCHAR(255) NOT NULL
    );

CREATE TABLE IF NOT EXISTS orders (
                                      id BIGSERIAL PRIMARY KEY,
                                      user_id BIGINT NOT NULL REFERENCES app_user(id),
    order_date TIMESTAMP,
    status VARCHAR(255),
    total DECIMAL(10,2)
    );

CREATE TABLE IF NOT EXISTS order_products (
                                              order_id BIGINT NOT NULL REFERENCES orders(id),
    products_id BIGINT NOT NULL REFERENCES product(id),
    PRIMARY KEY (order_id, products_id)
    );

CREATE TABLE IF NOT EXISTS user_roles (
                                          user_id BIGINT NOT NULL REFERENCES app_user(id),
    roles VARCHAR(255),
    PRIMARY KEY (user_id, roles)
    );

INSERT INTO app_user (username, password) VALUES
                                          ('john', 'pass1'),
                                          ('jane', 'pass2');

INSERT INTO user_roles (user_id, roles) VALUES
                                            (1, 'ROLE_USER'),
                                            (2, 'ROLE_ADMIN');

INSERT INTO product (name, price, created_by) VALUES
                                      ('Widget', 9.99, 'john'),
                                      ('Gadget', 19.99, 'jane');

INSERT INTO orders (user_id, order_date, status, total) VALUES
    (1, CURRENT_TIMESTAMP, 'PENDING', 29.98);

INSERT INTO order_products (order_id, products_id) VALUES
                                                       (1, 1),
                                                       (1, 2);
