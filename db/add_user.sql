insert into axxion_users (auth0_id, first_name, last_name, username, picture, email)
values (${auth0_id}, ${first_name}, ${last_name}, ${username}, ${picture}, ${email});

select * from axxion_users where auth0_id = ${auth0_id}
-- This SQL statement must be passed an object whose property names match the variables here. The value of the property will be entered in the database.
