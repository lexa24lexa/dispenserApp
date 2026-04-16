DROP DATABASE dispenser_db;
CREATE DATABASE IF NOT EXISTS dispenser_db;
USE dispenser_db;

-- users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    card_uid VARCHAR(50) UNIQUE NOT NULL,
    role ENUM('student', 'teacher') NOT NULL,
    password VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- drawers
CREATE TABLE drawers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    is_locked BOOLEAN DEFAULT TRUE,
    current_weight DECIMAL(10,2) DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- materials
CREATE TABLE materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    unit_weight DECIMAL(10,2) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- relation drawer - materials
CREATE TABLE drawer_materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    drawer_id INT NOT NULL,
    material_id INT NOT NULL,
    quantity INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE (drawer_id, material_id),

    FOREIGN KEY (drawer_id) REFERENCES drawers(id) ON DELETE CASCADE,
    FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE
);

-- logs
CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    user_role ENUM('student', 'teacher') NOT NULL,
    drawer_id INT NOT NULL,
    action ENUM('unlock', 'lock', 'weight_update') NOT NULL,

    weight_before DECIMAL(10,2),
    weight_after DECIMAL(10,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (drawer_id) REFERENCES drawers(id) ON DELETE CASCADE
);

-- indexes (performance)
CREATE INDEX idx_logs_user_id ON logs(user_id);
CREATE INDEX idx_logs_drawer_id ON logs(drawer_id);
CREATE INDEX idx_drawer_materials_drawer_id ON drawer_materials(drawer_id);
CREATE INDEX idx_drawer_materials_material_id ON drawer_materials(material_id);