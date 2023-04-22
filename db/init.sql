create table event.mail
(
    sent_to varchar(32) not null,
    subject varchar(32) not null,
    body    varchar(64) not null,
    sent_at varchar(32) not null,
    result  char(1) not null
);
create table event.todo
(
    task_name varchar(50) not null,
    is_done boolean not null,
);
