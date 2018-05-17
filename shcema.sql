-- schema.sql

drop database if exists yozo;

create database yozo;

use yozo;

grant select, insert, update, delete on yozo.* to 'yozo'@'localhost' identified by '123456789l';

create table images (
    `id` varchar(50) not null,
    `url` varchar(500) not null,
    `created_at` real not null,
    key `idx_created_at` (`created_at`),
    primary key (`id`)
) engine=innodb default charset=utf8;

create table administrators (
    `userid` varchar(50) not null,
    `cipher` varchar(50) not null,
    `session` varchar(500) not null DEFAULT '' ,
    primary key (`userid`)
) engine=innodb default charset=utf8;