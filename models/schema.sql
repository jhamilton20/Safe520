DROP database if exists projectTwo;
CREATE database if not exists projectTwo;

USE projectTwo ;

CREATE TABLE if not exists logins(
    id int primary key AUTO_INCREMENT,
    username varchar (250) NOT NULL,
    email varchar(40) NOT NULL,
    pw varchar (250) NOT NULL
  );