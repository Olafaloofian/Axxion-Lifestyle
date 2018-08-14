select  a.id, a.user_id, u.first_name, u.last_name, u.username, u.email,a.address_line_one, a.address_line_two, a.city, a.state, a.zipcode from axxion_users u
join axxion_users_addresses a
on a.user_id = u.id
where user_id = ${id} and default_address = 'true';
