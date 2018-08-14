update axxion_cheers
set count = count + 1 where article_id = $1
returning *;