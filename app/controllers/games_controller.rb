class GamesController < ApplicationController
  def index
    @games = Game.joins(:comments).uniq
  end

  def show
    redirect_to game_start_url(params[:id])
  end
end
