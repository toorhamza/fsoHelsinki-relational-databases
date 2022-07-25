CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text not null,
    title text not null,
    likes INTEGER NOT NULL DEFAULT 0
);

INSERT INTO blogs (author, url,title, likes) values ('main', 'https://www.google.com/', 'Test Blog 1', 1);

INSERT INTO blogs (author, url,title, likes) values ('main', 'https://www.yahoo.com/', 'Test Blog 2', 1);