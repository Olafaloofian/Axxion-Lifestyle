update axxion_comments
set body = ${body}
where id = ${id}
returning *;