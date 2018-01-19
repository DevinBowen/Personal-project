create table dentist (
id serial primary key,
name text,
office text
);

create table event (
id serial primary key,
dentist text,
date text,
time text,
avalable boolean
);





---------test----------
-- insert into event (
-- dentist,
-- date,
-- time,
-- avalable
-- ) values (
-- 'dentist_test',
-- '0-0-0',
-- '00:00:00',
-- false
-- )

-- insert into event (
-- dentist,
-- date,
-- start,
-- "end",
-- avalable
-- ) values (
-- 'devin',
-- '1/26/2018',
-- '01:30 pm',
-- '02:00 pm',
-- false
-- )

-- insert into event (
-- dentist,
-- date,
-- time,
-- avalable
-- ) values (
-- 'dentist_test',
-- '1-1-1',
-- '01:01:01',
-- true
-- )

-- insert into dentist (
-- name,
-- office
-- ) values (
-- 'dentist_test',
-- 'test_office'
-- )