USE dispenser_db;

-- insert users
INSERT INTO users (name, card_uid, role) VALUES
('Alexandra Student', 'UID123456', 'student'),
('Leo Teacher', 'UID999999', 'teacher');

-- insert drawers
INSERT INTO drawers (label, is_locked, current_weight) VALUES
('Screws', TRUE, 0);