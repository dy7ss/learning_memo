-- CREATE SCHEMA learning_memo;
\c postgres;

create table todo
(
    task_name varchar(50) not null,
    is_done boolean not null
);
create table learning_list
(
    memo_id SERIAL primary key,
    user_id int,
    category varchar(100),
    subject_name varchar(100) not null,
    used_time int not null,
    study_date date,
    created_date date,
    updated_date date,
    remarks varchar(1000)
);

create table users
(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

insert into users (user_id , password) values ('123', 'password');

CREATE SCHEMA learning_memo;
create table learning_memo.todo
(
    task_name varchar(50) not null,
    is_done boolean not null
);
