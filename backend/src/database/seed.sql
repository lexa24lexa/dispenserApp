USE dispenser_db;

-- insert users
INSERT INTO users (name, card_uid, role, password) VALUES
('Alexandra Student', 'UID123456', 'student', '$2b$10$e9jzfmZNfj9ADir90Q5He.0sHrZhvNfsgTMke70b6yxbEoSxUwjSm'),
('Leo Teacher', 'UID999999', 'teacher', '$2b$10$B32OJ.kVT45JspLBV9dIH.kFCf8AFV1sAs6dRR7qaL7Q4G4RZlohG');

-- insert drawers
INSERT INTO drawers (label, is_locked, current_weight) VALUES
('Screws Drawer', TRUE, 100.00),
('Bolts Drawer', TRUE, 200.00);

-- insert materials
INSERT INTO materials (name, unit_weight) VALUES
('Screw A', 0.50),
('Screw B', 1.00),
('Screw C', 0.50),
('Bolt A', 2.00),
('Bolt B', 3.50);

-- insert relation drawers - materials
INSERT INTO drawer_materials (drawer_id, material_id, quantity) VALUES
-- screws drawer
(1, 1, 100),
(1, 2, 50),
(1, 3, 0),

-- bolt drawer
(2, 4, 60),
(2, 5, 20);

-- Alexandra interacts wth screws drawer
INSERT INTO logs (user_id, user_role, drawer_id, action, weight_before, weight_after) VALUES
(1, 'student', 1, 'unlock', NULL, NULL),
(1, 'student', 1, 'weight_update', 100.00, 95.00), -- removed 5 weight
(1, 'student', 1, 'lock', NULL, NULL);

-- Leo interacts with screws drawer
INSERT INTO logs (user_id, user_role, drawer_id, action, weight_before, weight_after) VALUES
(2, 'teacher', 1, 'unlock', NULL, NULL),
(2, 'teacher', 1, 'weight_update', 95.00, 120.00), -- refill
(2, 'teacher', 1, 'lock', NULL, NULL);