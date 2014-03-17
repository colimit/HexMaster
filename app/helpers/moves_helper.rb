module MovesHelper
  def move_url(move)
    "/games/#{move.game.little_golem_id}/moves/#{move.move_number}"
  end

end
