insert into axxion_orders (user_id, address_id, order_id, date)
values (${userId}, ${addressId}, ${orderId}, ${date})

returning *;
