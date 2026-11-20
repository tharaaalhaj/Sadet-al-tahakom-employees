---create table

CREATE TABLE users (
    id SERIAL PRIMARY KEY ,
    name varchar(250) not null ,
    par_code varchar(255) not null unique ,
    check_in_time TIMESTAMP ,
    check_out_time  TIMESTAMP ,
    status varchar(20) 
);


