insert into axxion_users (first_name, last_name, email)
values (${firstName}, ${lastName}, ${email})

returning *;