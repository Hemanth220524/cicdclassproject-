-- Seed initial data for the freelancer marketplace

-- Insert sample skills
INSERT INTO skills (name, category) VALUES
('JavaScript', 'Programming'),
('React', 'Frontend'),
('Node.js', 'Backend'),
('Python', 'Programming'),
('Django', 'Backend'),
('PHP', 'Programming'),
('Laravel', 'Backend'),
('Vue.js', 'Frontend'),
('Angular', 'Frontend'),
('MySQL', 'Database'),
('PostgreSQL', 'Database'),
('MongoDB', 'Database'),
('HTML/CSS', 'Frontend'),
('UI/UX Design', 'Design'),
('Graphic Design', 'Design'),
('Logo Design', 'Design'),
('WordPress', 'CMS'),
('Shopify', 'E-commerce'),
('Digital Marketing', 'Marketing'),
('SEO', 'Marketing'),
('Content Writing', 'Writing'),
('Copywriting', 'Writing'),
('Translation', 'Writing'),
('Video Editing', 'Multimedia'),
('Photography', 'Multimedia'),
('3D Modeling', 'Design'),
('Mobile App Development', 'Programming'),
('DevOps', 'Infrastructure'),
('AWS', 'Cloud'),
('Docker', 'Infrastructure');

-- Insert sample users (passwords are hashed versions of 'password123')
INSERT INTO users (email, password_hash, first_name, last_name, user_type, bio, location, hourly_rate, rating, total_reviews, verified) VALUES
('john.doe@example.com', '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQ', 'John', 'Doe', 'freelancer', 'Full-stack developer with 5+ years of experience in React and Node.js', 'New York, NY', 75.00, 4.8, 24, TRUE),
('jane.smith@example.com', '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQ', 'Jane', 'Smith', 'client', 'Tech startup founder looking for talented developers', 'San Francisco, CA', NULL, 4.9, 12, TRUE),
('mike.wilson@example.com', '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQ', 'Mike', 'Wilson', 'freelancer', 'UI/UX Designer specializing in modern web applications', 'Austin, TX', 65.00, 4.7, 18, TRUE),
('sarah.johnson@example.com', '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQ', 'Sarah', 'Johnson', 'both', 'Digital marketing expert and content creator', 'Los Angeles, CA', 55.00, 4.6, 31, TRUE),
('alex.brown@example.com', '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQ', 'Alex', 'Brown', 'freelancer', 'Python developer with expertise in AI and machine learning', 'Seattle, WA', 85.00, 4.9, 15, TRUE);

-- Insert user skills
INSERT INTO user_skills (user_id, skill_id, proficiency_level, years_experience) VALUES
(1, 1, 'expert', 5), -- John - JavaScript
(1, 2, 'expert', 4), -- John - React
(1, 3, 'advanced', 3), -- John - Node.js
(1, 10, 'advanced', 4), -- John - MySQL
(3, 14, 'expert', 6), -- Mike - UI/UX Design
(3, 15, 'advanced', 5), -- Mike - Graphic Design
(3, 13, 'expert', 7), -- Mike - HTML/CSS
(4, 19, 'expert', 8), -- Sarah - Digital Marketing
(4, 20, 'expert', 6), -- Sarah - SEO
(4, 21, 'advanced', 5), -- Sarah - Content Writing
(5, 4, 'expert', 7), -- Alex - Python
(5, 5, 'advanced', 4), -- Alex - Django
(5, 11, 'advanced', 3); -- Alex - PostgreSQL

-- Insert sample projects
INSERT INTO projects (client_id, title, description, category, budget_min, budget_max, project_type, duration_estimate, status, priority, required_skills) VALUES
(2, 'E-commerce Website Development', 'Need a modern e-commerce website built with React and Node.js. Should include user authentication, product catalog, shopping cart, and payment integration.', 'Web Development', 3000.00, 5000.00, 'fixed', '6-8 weeks', 'open', 'high', '["React", "Node.js", "JavaScript", "MySQL"]'),
(2, 'Mobile App UI/UX Design', 'Looking for a talented designer to create modern and intuitive UI/UX for our fitness tracking mobile app.', 'Design', 1500.00, 2500.00, 'fixed', '3-4 weeks', 'open', 'medium', '["UI/UX Design", "Mobile App Development"]'),
(4, 'SEO Optimization for Website', 'Need comprehensive SEO optimization for our business website to improve search rankings and organic traffic.', 'Marketing', 800.00, 1200.00, 'fixed', '2-3 weeks', 'open', 'medium', '["SEO", "Digital Marketing"]');

-- Insert sample proposals
INSERT INTO proposals (project_id, freelancer_id, cover_letter, proposed_budget, proposed_timeline, status) VALUES
(1, 1, 'Hi! I am excited about your e-commerce project. With 5+ years of experience in React and Node.js, I can deliver a high-quality solution that meets all your requirements. I have built similar e-commerce platforms before and can ensure secure payment integration and optimal performance.', 4200.00, '7 weeks', 'pending'),
(2, 3, 'Hello! As a UI/UX designer with 6+ years of experience, I would love to work on your fitness app design. I specialize in creating intuitive and engaging mobile interfaces that provide excellent user experience. I can provide wireframes, prototypes, and final designs.', 2000.00, '3 weeks', 'pending'),
(3, 4, 'Hi there! I am a digital marketing expert with proven results in SEO optimization. I can help improve your website rankings through comprehensive keyword research, on-page optimization, technical SEO, and content strategy. Let me help you increase your organic traffic!', 1000.00, '3 weeks', 'pending');

-- Insert sample portfolio items
INSERT INTO portfolio_items (user_id, title, description, category, technologies, project_url, is_featured, display_order) VALUES
(1, 'Task Management App', 'A full-stack task management application built with React, Node.js, and MongoDB. Features include user authentication, real-time updates, and team collaboration.', 'Web Development', '["React", "Node.js", "MongoDB", "Socket.io"]', 'https://taskapp-demo.com', TRUE, 1),
(3, 'Restaurant Mobile App Design', 'Complete UI/UX design for a restaurant ordering mobile app. Includes user research, wireframes, prototypes, and final designs with a focus on user experience.', 'UI/UX Design', '["Figma", "Adobe XD", "Prototyping"]', 'https://dribbble.com/shots/restaurant-app', TRUE, 1),
(5, 'AI-Powered Analytics Dashboard', 'Machine learning dashboard for business analytics built with Python, Django, and TensorFlow. Provides predictive insights and data visualization.', 'Data Science', '["Python", "Django", "TensorFlow", "D3.js"]', 'https://analytics-demo.com', TRUE, 1);
