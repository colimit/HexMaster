class MovesController < ApplicationController
  def show
    @game_record = GameRecord.find_by_little_golem_id(params[:game_id])
    @board = @game_record.position(params[:id].to_i)
  end

end
