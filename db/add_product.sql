insert into axxion_products (product_name, price, category, picture, stock)
values (${product_name}, ${price}, ${category}, ${picture}, ${stock});
-- This SQL statement must be passed an object whose property names match the variables here. The value of the property will be entered in the database.
