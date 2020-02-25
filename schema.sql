CREATE database projectTwo ;

USE projectTwo ;

CREATE TABLE Logininfo(
    id int primary key AUTO_INCREMENT,
    username varchar (250) NOT NULL,
    email varchar (250) NOT NULL
);

CREATE TABLE  signUp(
    id int primary key AUTO_INCREMENT,
    Username varchar (250) NOT NULL,
    Password varchar (250) NOT NULL
  );