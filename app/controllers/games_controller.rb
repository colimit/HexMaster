class GamesController < ApplicationController
  def index
    @games = Game.joins(:comments).uniq
  end

  def show
    id = params[:id]
    @game = Game.find_by(little_golem_id: id) || 
            Game.fetch_from_little_golem(id)
    @moves = @game.moves.sort_by(&:move_number).map(&:move)[1..-1] || []
    @comments = @game.comments.includes(:user)
    render "games/show"
  end
end
