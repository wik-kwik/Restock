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
    `id`             INT         NOT NULL AUTO_INCREMENT,
    `status`         VARCHAR(1)  NOT NULL,
    `offer_id`       TEXT        NOT NULL,
    `name`           TEXT        NOT NULL,
    `photo_url`      TEXT        NOT NULL,
    `product_price`  DOUBLE      NOT NULL,
    `delivery_price` DOUBLE      NOT NULL,
    `smart`          INT         NOT NULL,
    `create_date`    TIMESTAMP   NOT NULL,
    `modify_date`    TIMESTAMP,
    `user_id`        INT,
    FOREIGN KEY (user_id) REFERENCES restock_db.`users` (id),
    PRIMARY KEY (`id`)
);

CREATE TABLE restock_db.`sensors`
(
    `id`               INT         NOT NULL AUTO_INCREMENT,
    `name`             TEXT        NOT NULL,
    `product_name`     TEXT        NOT NULL,
    `preferred_brand`  TEXT,
    `preferred_amount` TEXT,
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
    `type`        VARCHAR(1)  NOT NULL,
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
    `value`       DOUBLE      NOT NULL,
    `create_date` TIMESTAMP   NOT NULL,
    FOREIGN KEY (sensor_id) REFERENCES restock_db.`sensors` (id),
    PRIMARY KEY (`id`)
);

CREATE TABLE restock_db.`parameters`
(
    `id`          INT         NOT NULL AUTO_INCREMENT,
    `type`        VARCHAR(1)  NOT NULL,
    `value`       VARCHAR(1)  NOT NULL,
    `create_date` TIMESTAMP   NOT NULL,
    `modify_date` TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE restock_db.`addresses`
(
    `id`           INT         NOT NULL AUTO_INCREMENT,
    `first_name`   TEXT        NOT NULL,
    `last_name`    TEXT        NOT NULL,
    `street`       TEXT        NOT NULL,
    `house_number` TEXT        NOT NULL,
    `postal_code`  VARCHAR(6)  NOT NULL,
    `city`         TEXT        NOT NULL,
    `phone_number` VARCHAR(9)  NOT NULL,
    `email`        TEXT        NOT NULL,
    `create_date`  TIMESTAMP   NOT NULL,
    `modify_date`  TIMESTAMP,
    PRIMARY KEY (`id`)
);