insert into axxion_comments (user_id, article_id, body)
values (${user_id}, ${article_id}, ${body})
returning *;