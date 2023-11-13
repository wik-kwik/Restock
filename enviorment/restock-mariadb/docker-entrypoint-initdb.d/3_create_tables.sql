CREATE TABLE restock_db.`users`
(
    `id`          INT         NOT NULL AUTO_INCREMENT,
    `username`    VARCHAR(30) NOT NULL,
    `password`    TEXT        NOT NULL,
    `create_date` DATE        NOT NULL,
    `remove_date` DATE,
    PRIMARY KEY (`id`)
);

CREATE TABLE restock_db.`orders`
(
    `id`          INT         NOT NULL AUTO_INCREMENT,
    `create_date` DATE        NOT NULL,
    `modify_date` DATE,
    `user_id`     INT         NOT NULL,
    `status`      VARCHAR(20) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES restock_db.`users` (id),
    PRIMARY KEY (`id`)
);

CREATE TABLE restock_db.`products`
(
    `id`          INT         NOT NULL AUTO_INCREMENT,
    `order_id`    INT         NOT NULL,
    `name`        TEXT        NOT NULL,
    `create_date` DATE        NOT NULL,
    `price`       DOUBLE      NOT NULL,
    `status`      VARCHAR(20) NOT NULL,
    `ean_code`    TEXT        NOT NULL,
    FOREIGN KEY (order_id) REFERENCES restock_db.`orders` (id),
    PRIMARY KEY (`id`)
);

CREATE TABLE restock_db.`sensors`
(
    `id`          INT         NOT NULL AUTO_INCREMENT,
    `name`        VARCHAR(30) NOT NULL,
    `model`       TEXT        NOT NULL,
    `ip_address`  TEXT        NOT NULL,
    `create_date` DATE        NOT NULL,
    `modify_date` DATE,
    `remove_date` DATE,
    PRIMARY KEY (`id`)
);

CREATE TABLE restock_db.`thresholds`
(
    `id`          INT    NOT NULL AUTO_INCREMENT,
    `sensor_id`   INT    NOT NULL,
    `create_date` DATE   NOT NULL,
    `modify_date` DATE,
    `remove_date` DATE,
    `value`       DOUBLE NOT NULL,
    FOREIGN KEY (sensor_id) REFERENCES restock_db.`sensors` (id),
    PRIMARY KEY (`id`)
);

CREATE TABLE restock_db.`sensor_data`
(
    `id`          INT  NOT NULL AUTO_INCREMENT,
    `sensor_id`   INT  NOT NULL,
    `type`        TEXT NOT NULL,
    `value`       TEXT NOT NULL,
    `create_date` DATE NOT NULL,
    FOREIGN KEY (sensor_id) REFERENCES restock_db.`sensors` (id),
    PRIMARY KEY (`id`)
);