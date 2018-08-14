insert into axxion_users_addresses (user_id, address_line_one, address_line_two, city, state, zipcode, default_address)
values (${id}, ${addressLine1}, ${addressLine2}, ${city}, ${state}, ${zipcode}, ${defaultAddress})

returning *;