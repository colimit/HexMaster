json.(@game, :little_golem_id, :red_name, :blue_name, :size, :result)

json.moves { json.array! @moves } if @moves