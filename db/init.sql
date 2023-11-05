create table event.todo
(
    task_name varchar(50) not null,
    is_done boolean not null
);
create table event.learning_list
(
    learning_id int auto_increment primary key,
    user_id int,
    category varchar(100),
    subject_name varchar(100) not null,
    used_time int not null,
    study_date date,
    created_date date,
    updated_date date,
    remarks varchar(1000)
);
