select c.id, c.user_id, c.article_id, c.body, u.username, u.picture from axxion_comments c
join axxion_users u on u.id = c.user_id
where c.user_id = ${id}
order by c.id desc;