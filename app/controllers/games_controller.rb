class GamesController < ApplicationController
  def index
    @games = Game.joins(:comments).uniq
    render :json => @games
  end

  def show
    id = params[:id]
    begin
      @game = Game.find_by(little_golem_id: id) || 
              Game.fetch_from_little_golem(id)
    rescue Exception
      render json: "Not a valid ID of a hex game", status: 404
      return
    end
      
    @moves = @game.moves.sort_by(&:move_number).map(&:move)[1..-1] || []
    @comments = @game.comments.includes(:user).order(:created_at)
    render "games/show"
  end
  
end
