create table event.todo
(
    task_name varchar(50) not null,
    is_done boolean not null
);
create table event.learning_list
(
    subject_name varchar(100) not null,
    used_time int not null,
    study_date date
);
