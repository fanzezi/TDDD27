CREATE DATABASE pernblog;

CREATE TABLE userdata(
    id SERIAL,
    email VARCHAR(50),
    map text[],
    password VARCHAR(30),
    firstname VARCHAR(50),
    familyname VARCHAR(50),
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS blog;
CREATE TABLE blog(
    post_id SERIAL,
    user_id INTEGER,
    image_url text,
    title VARCHAR(100),
    country VARCHAR(60),
    description VARCHAR(255), 
    PRIMARY KEY(post_id),
    FOREIGN KEY (user_id) REFERENCES userdata (id) ON DELETE CASCADE     
);

CREATE TABLE loggedInUsers(
  email VARCHAR(50),
  token VARCHAR(30),
  PRIMARY KEY(email)
);

