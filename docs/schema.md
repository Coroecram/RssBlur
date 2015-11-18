# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
email           | string    | not null, indexed, unique, email true
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## websites
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name				| string		| not null, unique, indexed
url					| string		| not null, unique, indexed

## user_websites
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
website_id  		| integer   | foreign key (references websites), indexed
user_id  		    | integer   | foreign key (references users), indexed
folder_id		    | integer		| foreign key (references folders), indexed

## articles
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
url					| string		| not null, indexed, unique
title       | string    | not null
author			| string		| not null
website_id  | integer   | not null, foreign key (references websites), indexed
created_date| datetime  | not null

## folders
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
website_id  | integer   | foreign key (references websites), indexed
user_id     | integer   | foreign key (references users), indexed
