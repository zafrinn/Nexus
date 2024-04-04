CREATE DATABASE IF NOT EXISTS nexus;

USE nexus;

DROP TABLE IF EXISTS discussion_reply;
DROP TABLE IF EXISTS discussion;
DROP TABLE IF EXISTS tutor_session;
DROP TABLE IF EXISTS tutor_level;
DROP TABLE IF EXISTS study_group_member;
DROP TABLE IF EXISTS study_group;
DROP TABLE IF EXISTS textbook;
DROP TABLE IF EXISTS textbook_genre;
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
    password CHAR(60) NOT NULL,
    enabled BOOLEAN NOT NULL,
    created_timestamp DATETIME NOT NULL,

    PRIMARY KEY (user_id),
    UNIQUE(email_address),
    FOREIGN KEY (role_id) REFERENCES role(role_id)
);

INSERT INTO user VALUES(NULL, "stephan", 1, "stephan.bissoon@torontomu.ca", "", 1, NOW());
INSERT INTO user VALUES(NULL, "zafrin", 1, "zafrin.rahman@torontomu.ca", "", 1, NOW());
INSERT INTO user VALUES(NULL, "alishba", 1, "alishba.aamir@torontomu.ca", "", 1, NOW());
INSERT INTO user VALUES(NULL, "shruti", 1, "s12sharma@torontomu.ca", "", 1, NOW());
INSERT INTO user VALUES(NULL, "karanvir", 1, "karanvir.heer@torontomu.ca", "", 1, NOW());

CREATE TABLE category (
    category_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,

    PRIMARY KEY (category_id),
    UNIQUE(name)
);

INSERT INTO category VALUES(NULL, "Items Wanted");
INSERT INTO category VALUES(NULL, "Items for Sale");

CREATE TABLE advertisement (
    advertisement_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    created_timestamp DATETIME NOT NULL,
    category_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    location VARCHAR(100) NOT NULL,
    enabled BOOLEAN NOT NULL,

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

CREATE TABLE textbook_genre (
	textbook_genre_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    
    PRIMARY KEY(textbook_genre_id)
);

INSERT INTO textbook_genre VALUES(NULL, "Faculty of Science");
INSERT INTO textbook_genre VALUES(NULL, "Faculty of Arts");
INSERT INTO textbook_genre VALUES(NULL, "Faculty of Engineering and Architectural Science");
INSERT INTO textbook_genre VALUES(NULL, "Lincoln Alexander School of Law");
INSERT INTO textbook_genre VALUES(NULL, "Ted Rogers School of Management");
INSERT INTO textbook_genre VALUES(NULL, "The Creative School");
INSERT INTO textbook_genre VALUES(NULL, "Faculty of Community Services");
INSERT INTO textbook_genre VALUES(NULL, "Yeates School of Graduate and Postdoctoral Studies");

CREATE TABLE textbook (
    textbook_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    isbn CHAR(13) NOT NULL,
    enabled BOOLEAN NOT NULL,
    location VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    textbook_genre_id INT NOT NULL,
    
    PRIMARY KEY (textbook_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (textbook_genre_id) REFERENCES textbook_genre(textbook_genre_id)
);

CREATE TABLE study_group (
    study_group_id INT NOT NULL AUTO_INCREMENT,
    timestamp DATETIME NOT NULL,
    room VARCHAR(7) NOT NULL,
    course_name VARCHAR(50) NOT NULL,
    seat_limit INT NOT NULL,
    user_id INT NOT NULL,
    
    PRIMARY KEY(study_group_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE study_group_member (
    study_group_member_id INT NOT NULL AUTO_INCREMENT,
    study_group_id INT NOT NULL,
    user_id INT NOT NULL,
    
    PRIMARY KEY(study_group_member_id),
    FOREIGN KEY (study_group_id) REFERENCES study_group(study_group_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE tutor_level (
    tutor_level_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(15) NOT NULL,
    
    PRIMARY KEY(tutor_level_id)
);

INSERT INTO tutor_level VALUES(NULL, "Beginner");
INSERT INTO tutor_level VALUES(NULL, "Intermediate");
INSERT INTO tutor_level VALUES(NULL, "Advanced");

CREATE TABLE tutor_session (
    tutor_session_id INT NOT NULL AUTO_INCREMENT,
    course_name VARCHAR(50) NOT NULL,
    enabled BOOLEAN NOT NULL,
    tutor_level_id INT NOT NULL,
    user_id INT NOT NULL,
    
    PRIMARY KEY(tutor_session_id),
    FOREIGN KEY (tutor_level_id) REFERENCES tutor_level(tutor_level_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE discussion (
    discussion_id INT NOT NULL AUTO_INCREMENT,
    description VARCHAR(1000) NOT NULL,
    created_timestamp DATETIME NOT NULL,
    updated_timestamp DATETIME NOT NULL,
    user_id INT NOT NULL,
    
    PRIMARY KEY(discussion_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE discussion_reply (
    discussion_reply_id INT NOT NULL AUTO_INCREMENT,
    discussion_id INT NOT NULL,
    reply VARCHAR(1000) NOT NULL,
    created_timestamp DATETIME NOT NULL,
    updated_timestamp DATETIME NOT NULL,
    user_id INT NOT NULL,
    
    PRIMARY KEY (discussion_reply_id),
    FOREIGN KEY (discussion_id) REFERENCES discussion(discussion_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);