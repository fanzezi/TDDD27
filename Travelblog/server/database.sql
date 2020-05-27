CREATE DATABASE pernblog;

/*Change the length of the blog post?*/
CREATE TABLE blogpost(
    blogpost_id SERIAL PRIMARY KEY, 
    description VARCHAR(255),
    imgname text,
    img bytea 
);
 
DROP TABLE IF EXISTS blog;
CREATE TABLE blog(
    post_id SERIAL,
    user_id INTEGER,
    description VARCHAR(255), 
    PRIMARY KEY(post_id),
    FOREIGN KEY (user_id) REFERENCES userdata (id) ON DELETE CASCADE 
    
);

CREATE TABLE userdata(
    id SERIAL,
    email VARCHAR(50),
    password VARCHAR(30),
    firstname VARCHAR(50),
    familyname VARCHAR(50),
    PRIMARY KEY(id)
);

/*FOREIGN KEY (id) REFERENCES userdata(id) ON DELETE CASCADE */
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

