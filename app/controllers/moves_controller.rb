class MovesController < ApplicationController
  def show
      @game = Game.includes(:moves).find_by(little_golem_id: params[:game_id])
      @board = @game.position(params[:id].to_i)
      @move = @game.moves.to_a.find do |move| 
        move.move_number == params[:id].to_i 
      end
      @comments = @move.comments
  end

end
