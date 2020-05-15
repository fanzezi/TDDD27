CREATE DATABASE pernblog;


/*Change the length of the blog post?*/
CREATE TABLE blogpost(
    blogpost_id SERIAL PRIMARY KEY, 
    description VARCHAR(255) 
);
 
CREATE TABLE users(
    email VARCHAR(50),
    password VARCHAR(30),
    firstname VARCHAR(50),
    familyname VARCHAR(50),
    PRIMARY KEY(email)
);

CREATE TABLE loggedInUsers(
  email VARCHAR(50),
  token VARCHAR(30),
  PRIMARY KEY(email)
);
