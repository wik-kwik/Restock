CREATE TABLE restock_db.`users`
(
    `id`          INT         NOT NULL AUTO_INCREMENT,
    `username`    VARCHAR(30) NOT NULL,
    `password`    TEXT        NOT NULL,
    `create_date` TIMESTAMP   NOT NULL,
    `modify_date` TIMESTAMP,
    `remove_date` TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE restock_db.`orders`
(
    `id`          INT         NOT NULL AUTO_INCREMENT,
    `status`      VARCHAR(1)  NOT NULL,
    `name`        TEXT        NOT NULL,
    `price`       DOUBLE,
    `offer_id`    INT         NOT NULL,
    `create_date` TIMESTAMP   NOT NULL,
    `modify_date` TIMESTAMP,
    `user_id`     INT,
    FOREIGN KEY (user_id) REFERENCES restock_db.`users` (id),
    PRIMARY KEY (`id`)
);

CREATE TABLE restock_db.`sensors`
(
    `id`               INT         NOT NULL AUTO_INCREMENT,
    `model`            TEXT        NOT NULL,
    `product_name`     TEXT        NOT NULL,
    `preferred_band`   TEXT        NOT NULL,
    `preferred_amount` TEXT        NOT NULL,
    `sensor_token`     VARCHAR(30) NOT NULL UNIQUE,
    `create_date`      TIMESTAMP   NOT NULL,
    `modify_date`      TIMESTAMP,
    `remove_date`      TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE restock_db.`thresholds`
(
    `id`          INT         NOT NULL AUTO_INCREMENT,
    `sensor_id`   INT         NOT NULL,
    `type`        TEXT        NOT NULL,
    `value`       DOUBLE      NOT NULL,
    `create_date` TIMESTAMP   NOT NULL,
    `modify_date` TIMESTAMP,
    `remove_date` TIMESTAMP,
    FOREIGN KEY (sensor_id) REFERENCES restock_db.`sensors` (id),
    PRIMARY KEY (`id`)
);

CREATE TABLE restock_db.`sensor_data`
(
    `id`          INT         NOT NULL AUTO_INCREMENT,
    `sensor_id`   INT         NOT NULL,
    `value`       TEXT        NOT NULL,
    `create_date` TIMESTAMP   NOT NULL,
    FOREIGN KEY (sensor_id) REFERENCES restock_db.`sensors` (id),
    PRIMARY KEY (`id`)
);

CREATE TABLE restock_db.`parameters`
(
    `id`          INT         NOT NULL AUTO_INCREMENT,
    `type`        VARCHAR(1)  NOT NULL,
    `value`       TEXT        NOT NULL,
    `create_date` TIMESTAMP   NOT NULL,
    `modify_date` TIMESTAMP,
    FOREIGN KEY (sensor_id) REFERENCES restock_db.`sensors` (id),
    PRIMARY KEY (`id`)
);