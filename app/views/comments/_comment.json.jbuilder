json.(comment, :id,  :body, :created_at, :user_id)

json.username comment.user && comment.user.username 
json.little_golem_name comment.user && comment.user.little_golem_name  