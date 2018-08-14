drop table axxion_products cascade;
drop table axxion_users cascade; 
drop table axxion_orders cascade; 
drop table axxion_line_items cascade;
drop table axxion_users_addresses cascade; 

create table axxion_products (
id serial primary key,
product_name text,
price decimal not null check (price >= 0),
category text,
picture text,
stock int not null
);

create table axxion_users (
id SERIAL PRIMARY KEY,
auth0_id text,
first_name text,
last_name text,
username text unique, 
picture text,
bio text,
address text,
email text
admin text,
);

create table axxion_users_addresses (
id serial primary key,
user_id int REFERENCES axxion_users(id),
address_line_one text,
address_line_two text,
city text,
state text,
zipcode int,
default_address text
);

create table axxion_orders (
id serial PRIMARY key,
order_id text unique,
user_id int,
address_id int,
date text
);

create table axxion_line_items (
id serial PRIMARY KEY,
product_id int REFERENCES axxion_products(id),
quantity int,
order_id int REFERENCES axxion_orders(id)
);

create table axxion_comments (
    id serial primary key,
    user_id int references axxion_users(id),
    article_id int,
    body text
);

create table axxion_cheers (
    id serial primary key,
    article_id int,
    count int
);

insert into axxion_cheers (article_id, count)
values (1, 0);

insert into axxion_cheers (article_id, count)
values (2, 0);

insert into axxion_cheers (article_id, count)
values (3, 0);

insert into axxion_cheers (article_id, count)
values (4, 0);

insert into axxion_cheers (article_id, count)
values (5, 0);

insert into axxion_cheers (article_id, count)
values (6, 0);

insert into axxion_cheers (article_id, count)
values (7, 0);

insert into axxion_cheers (article_id, count)
values (8, 0);

insert into axxion_cheers (article_id, count)
values (9, 0);

insert into axxion_cheers (article_id, count)
values (10, 0);

insert into axxion_comments (user_id, article_id, body)
values (1, 2, 'Awesome article!');

insert into axxion_comments (user_id, article_id, body)
values (1, 5, 'I love it!!');

insert into axxion_comments (user_id, article_id, body)
values (2, 2, 'Wow, cool!');

insert into axxion_comments (user_id, article_id, body)
values (3, 1, 'No way, awesome info');

insert into axxion_comments (user_id, article_id, body)
values (1, 3, 'I like this');

insert into axxion_comments (user_id, article_id, body)
values (3, 4, 'Theres nothing better!');

insert into axxion_products (product_name, price, category, picture, stock)
values ('Exercise Bands', 23.97, 'exercise', 'https://cdn.mpowcdn.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/b/0/b06vyg6h99.main_1.jpg', 300);

insert into axxion_products (product_name, price, category, picture, stock)
values ('Pre-Workout Drink Mix', 21.17, 'diet', 'https://target.scene7.com/is/image/Target/50487372?wid=488&hei=488&fmt=pjpeg', 300);

insert into axxion_products (product_name, price, category, picture, stock)
values ('Sweatband', 7.98, 'exercise', 'https://ae01.alicdn.com/kf/HTB1DWdTKVXXXXcLaXXXq6xXFXXX5/1-Pair-Athletic-Wrist-Sweatbands-Cotton-Terry-Cloth-Sweat-Band-Brace-Wristbands-Sports-Tennis-Squash-Badminton.jpg_640x640.jpg', 300);

insert into axxion_products (product_name, price, category, picture, stock)
values ('Stone Warmer', 17.91, 'wellness', 'https://life-cdn.global.ssl.fastly.net/life/wp-content/uploads/2017/01/Hot-Stone-Clamshell.jpg', 300);

insert into axxion_products (product_name, price, category, picture, stock)
values ('Keto Strips', 8.19, 'diet', 'https://i2.wp.com/baldwin-meadows.com/wp-content/uploads/2018/01/Ketone-Box-and-Bottle.jpg?fit=1500%2C1500&ssl=1', 300);

insert into axxion_products (product_name, price, category, picture, stock)
values ('Essential Oil Diffuser', 12.21, 'wellness', 'https://images-na.ssl-images-amazon.com/images/I/71UHQvCLt%2BL._SL1500_.jpg', 300);

insert into axxion_products (product_name, price, category, picture, stock)
values ('Weighted Ball', 19.99, 'exercise', 'https://4.imimg.com/data4/AT/II/ANDROID-22803007/product-500x500.jpeg', 300);

insert into axxion_products (product_name, price, category, picture, stock)
values ('Meditation Pillow', 33.97, 'wellness', 'https://i2.wp.com/truestressmanagement.com/wp-content/uploads/2017/06/peace-yoga-meditation-cushion.jpg?resize=416%2C416&ssl=1', 100);

insert into axxion_products (product_name, price, category, picture, stock)
values ('Magnesium Supplement', 19.97, 'diet', 'https://img.aws.livestrongcdn.com/ls-article-image-673/ds-photo/getty/article/103/52/465611279.jpg', 500);

insert into axxion_users (first_name, last_name, username, picture, bio, address, email)
values ('Jeremy', 'Reed', 'Reed-Machine', 'https://cdn.onlinewebfonts.com/svg/img_191958.png', 'I like boats.', '1234 Awesome Road', 'reedy@gmail.com');

insert into axxion_users (first_name, last_name, username, picture, bio, address, email)
values ('Drupe', 'Gufferson', 'Droopy', 'https://cdn.onlinewebfonts.com/svg/img_191958.png', 'Whats a bio?', '999 This Street', 'dpool@gmail.com');

insert into axxion_users (first_name, last_name, username, picture, bio, address, email)
values ('Karnet', 'Anderson', 'Leaflet', 'https://cdn.onlinewebfonts.com/svg/img_191958.png', 'There are some wonderful moments in store for you', '0101 Binary Point', 'thebigk@gmail.com');

insert into axxion_orders (user_id)
values (1);

insert into axxion_orders (user_id)
values (2);

insert into axxion_orders (user_id)
values (3);

insert into axxion_orders (user_id)
values (2);

insert into axxion_orders (user_id)
values (2);

insert into axxion_orders (user_id)
values (1);

insert into axxion_line_items (product_id, quantity, order_id)
values (1, 1, 1);

insert into axxion_line_items (product_id, quantity, order_id)
values (2, 1, 1);

insert into axxion_line_items (product_id, quantity, order_id)
values (1, 2, 3);

insert into axxion_line_items (product_id, quantity, order_id)
values (3, 2, 2);

insert into axxion_line_items (product_id, quantity, order_id)
values (1, 1, 4);

insert into axxion_line_items (product_id, quantity, order_id)
values (2, 2, 6);

insert into axxion_line_items (product_id, quantity, order_id)
values (3, 1, 5);

insert into axxion_line_items (product_id, quantity, order_id)
values (2, 3, 1);

select * from axxion_products;
select * from axxion_users; 
select * from axxion_orders; 
select * from axxion_line_items;