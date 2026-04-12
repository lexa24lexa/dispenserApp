USE dispenser_db;

-- insert users
INSERT INTO users (name, card_uid, role, password) VALUES
('Alexandra Student', 'UID123456', 'student', '$2b$10$e9jzfmZNfj9ADir90Q5He.0sHrZhvNfsgTMke70b6yxbEoSxUwjSm'),
('Leo Teacher', 'UID999999', 'teacher', '$2b$10$B32OJ.kVT45JspLBV9dIH.kFCf8AFV1sAs6dRR7qaL7Q4G4RZlohG');

-- insert drawers
INSERT INTO drawers (label, is_locked, current_weight) VALUES
('Screws', TRUE, 0);
