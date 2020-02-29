CREATE database if not exists projectTwo;

USE projectTwo ;

CREATE TABLE  logins(
    id int primary key AUTO_INCREMENT,
    username varchar (250) NOT NULL,
    email varchar(40) NOT NULL,
    password NOT NULL
  );
  