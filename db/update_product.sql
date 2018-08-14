update axxion_products
set product_name = ${product_name}, price = ${price}, category = ${category}, picture = ${picture}, stock = ${stock}
where id = ${id};
-- This SQL statement must be passed an object whose property names match the variables here. The value of the property will be entered in the database.