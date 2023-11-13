CREATE USER 'restock_user'@'localhost' IDENTIFIED BY 'restockPass';
CREATE USER 'restock_user'@'%' IDENTIFIED BY 'restockPass';

GRANT ALL PRIVILEGES ON `restock_db`.* TO 'restock_user'@'localhost';
GRANT ALL PRIVILEGES ON `restock_db`.* TO 'restock_user'@'%';

FLUSH PRIVILEGES;