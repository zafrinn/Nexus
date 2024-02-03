CREATE DATABASE IF NOT EXISTS nexus;

USE nexus;

DROP TABLE IF EXISTS advertisement_image;
DROP TABLE IF EXISTS advertisement;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS role;

CREATE TABLE role (
    role_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL,

    PRIMARY KEY(role_id),
    UNIQUE(name)
);

INSERT INTO role VALUES(NULL, "Admin");
INSERT INTO role VALUES(NULL, "Basic");

CREATE TABLE user (
    user_id INT NOT NULL AUTO_INCREMENT,
    display_name VARCHAR(25) NOT NULL,
    role_id INT NOT NULL,
    email_address VARCHAR(50) NOT NULL,
    password CHAR(60) NULL,
    enabled TINYINT(1) NOT NULL,
    created_timestamp DATETIME NOT NULL,

    PRIMARY KEY (user_id),
    UNIQUE(email_address),
    FOREIGN KEY (role_id) REFERENCES role(role_id)
);

INSERT INTO user VALUES(NULL, "stephan", 1, "stephan.bissoon@torontomu.ca", NULL, 1, NOW());
INSERT INTO user VALUES(NULL, "zafrin", 1, "zafrin.rahman@torontomu.ca", NULL, 1, NOW());
INSERT INTO user VALUES(NULL, "alishba", 1, "alishba.aamir@torontomu.ca", NULL, 1, NOW());
INSERT INTO user VALUES(NULL, "shruti", 1, "s12sharma@torontomu.ca", NULL, 1, NOW());
INSERT INTO user VALUES(NULL, "karanvir", 1, "karanvir.heer@torontomu.ca", NULL, 1, NOW());

CREATE TABLE category (
    category_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,

    PRIMARY KEY (category_id),
    UNIQUE(name)
);

INSERT INTO category VALUES(NULL, "Items Wanted");
INSERT INTO category VALUES(NULL, "Items for Sale");
INSERT INTO category VALUES(NULL, "Academic Services");

CREATE TABLE advertisement (
    advertisement_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    created_timestamp DATETIME NOT NULL,
    category_id INT NOT NULL,
    price DECIMAL(10, 2) NULL,
    location VARCHAR(100) NULL,
    enabled TINYINT(1) NOT NULL,

    PRIMARY KEY(advertisement_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);

CREATE TABLE advertisement_image (
    advertisement_image_id INT NOT NULL AUTO_INCREMENT,
    advertisement_id INT NOT NULL,
    mime_type VARCHAR(10) NOT NULL,
    data MEDIUMBLOB NOT NULL,

    PRIMARY KEY (advertisement_image_id),
    FOREIGN KEY (advertisement_id) REFERENCES advertisement(advertisement_id)
);