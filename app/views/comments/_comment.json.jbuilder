json.(comment, :id,  :body, :created_at)

json.username comment.user && comment.user.username 
json.little_golem_name comment.user && comment.user.little_golem_name 