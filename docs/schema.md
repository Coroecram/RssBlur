# Schema Information

## articles
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
website_id  | integer   | not null, foreign key (references websites), indexed
url					| string		| not null, indexed, unique
title       | string    | not null
author			| string		| not null
date				| datetime  | not null


## websites
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
url					| string		| not null, indexed
tag         | string    | not null
folder_id		| integer		| foreign key (references folders), :indexed

## folders
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
website_id  | integer   | foreign key (references websites), indexed
user_id     | integer   | foreign key (references users), indexed

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## user_websites
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
website_id  		| integer   | foreign key (references websites), indexed
user_id  		    | integer   | foreign key (references users), indexed
