class GamesController < ApplicationController
  def index
    @games = Game.joins(:comments).uniq
  end

  def show
    @game = Game.fetch_from_little_golem(params[:id])
    @moves = @game.moves.sort_by(&:move_number).map(&:move)[1..-1] || []
    render "games/show"
  end
end
