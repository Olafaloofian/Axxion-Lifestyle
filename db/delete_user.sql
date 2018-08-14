delete from axxion_users_addresses
where user_id = $1;

delete from axxion_comments
where user_id = $1;

delete from axxion_users cascade
where id = $1;
--  Deletes user with id (variable) from database