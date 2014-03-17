module GamesHelper
  
  def game_start_url(lg_id)
    "/games/#{lg_id}/moves/0"
  end
end
