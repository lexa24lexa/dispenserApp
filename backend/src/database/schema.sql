CREATE DATABASE IF NOT EXISTS dispenser_db;
USE dispenser_db;

-- users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    card_uid VARCHAR(50) UNIQUE NOT NULL,
    role ENUM('student', 'teacher') NOT NULL,
    password VARCHAR(255)
);

-- drawers
CREATE TABLE drawers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    is_locked BOOLEAN DEFAULT TRUE,
    current_weight FLOAT DEFAULT 0
);

-- materials
CREATE TABLE materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    unit_weight FLOAT NOT NULL
);

-- relation drawer - materials
CREATE TABLE drawer_materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    drawer_id INT,
    material_id INT,
    quantity INT DEFAULT 0,

    FOREIGN KEY (drawer_id) REFERENCES drawers(id),
    FOREIGN KEY (material_id) REFERENCES materials(id)
);

-- logs
CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    drawer_id INT,
    action ENUM('unlock', 'weight_update') NOT NULL,
    weight_before FLOAT,
    weight_after FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (drawer_id) REFERENCES drawers(id)
);