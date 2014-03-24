json.(@game, :id, :little_golem_id, :red_name, :blue_name, :size, :result)

json.moves { json.array! @moves } if @moves

if @comments
	json.comments(@comments) do |comment|
		json.partial!("comments/comment", :comment => comment)
	end 
end	
	
	
