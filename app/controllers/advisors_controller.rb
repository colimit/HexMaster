class AdvisorsController < ApplicationController
  require 'rest-client'
  require 'addressable/uri'
  def new
  end
  
  def create
    redirect_to advisor_path(params[:littlegolem_game][:id])
  end
  
  def show
    game_url = Addressable::URI.new(
            :scheme => "http",
            :host => "www.littlegolem.net",
            :path => "servlet/sgf/#{params[:id].to_i}/game.hsgf"
          ).to_s
    
    game_hsgf = RestClient.get(game_url)
    @board = Board.position(game_hsgf)
    @board_html = @board.to_html
    @advice_hash = @board.symmetric_next_moves_data
    @advice_hash[:master] ||= []
    @advice_hash[:all] ||= []
    @master_moves = @advice_hash[:master].sort_by { |move, count| -count }
	  @all_moves = @advice_hash[:all].sort_by { |move, count| -count } 
    @master_moves[0] && move = @master_moves[0][0]
    if move
      @board.handle_move(move) 
      @advice_board_html = @board.to_html
    end
  end

end
