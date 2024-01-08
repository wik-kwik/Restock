-- UNIQUE CONSTRAINTS:

ALTER TABLE users
ADD CONSTRAINT unique_usernames UNIQUE (username);

ALTER TABLE sensors
ADD CONSTRAINT unique_sensors_by_token UNIQUE (sensor_token);

ALTER TABLE thresholds
ADD CONSTRAINT unique_thresholds_for_sensor_by_type UNIQUE (sensor_id, type);

ALTER TABLE parameters
ADD CONSTRAINT unique_parameters_by_type UNIQUE (type);

-- ENUM VALIDATION CONSTRAINTS:

ALTER TABLE orders
ADD CONSTRAINT check_order_statuses CHECK (status IN ('P', 'A', 'R', 'D', 'C'));

ALTER TABLE sensors
ADD CONSTRAINT check_sensor_types CHECK (type IN ('D', 'B'));

ALTER TABLE thresholds
ADD CONSTRAINT check_threshold_types CHECK (type IN ('U', 'O'));

ALTER TABLE parameters
ADD CONSTRAINT check_parameters_types CHECK (type IN ('S', 'B', 'Z', 'F'));