CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(75),
    lastName VARCHAR(100),
    password_digest text
);