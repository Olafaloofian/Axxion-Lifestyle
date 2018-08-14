update axxion_users
set first_name = ${new_first_name}, last_name = ${new_last_name}, picture = ${new_picture}, bio = ${new_bio}, address = ${new_address}, email = ${new_email}, username = ${new_username}
where auth0_id = ${auth0_id};

select * from axxion_users
where auth0_id = ${auth0_id};
-- This SQL statement must be passed an object whose property names match the variables here. The value of the property will be entered in the database.