class GameRecord
  #attr_accessor :game_attributes
  def initialize(options)
    default_options = { red_name: "Red", blue_name: "Blue", size: 13 }
    @game_attributes      = default_options.merge(options)
  end
  
  def result
    @game_attributes[:result]
  end
  
  def end_board
    Board.new(@game_attributes[:size]).tap do |board|
      @game_attributes[:move_list].each do |move|
        board.handle_move(move)
      end
    end
  end
  
  #This creates a record from littlegolem.com's HSGF string. Note that this 
  #format has the unfortunate property that the fields giving the names of the    #players are reversed from what they should be
  #the masters are the names of the players, if any, who are considered a 
  #master. unfortunately, littlegolem hsgf files do not have rating, and they 
  #identify players only by name, which is non-unique and can change. 
  def self.read_hsgf(hsgf_string, masters = [])
    p hsgf_string
    red_name  = hsgf_string.match(/[B]\[(.+?)\]/)[1]
    blue_name = hsgf_string.match(/[W]\[(.+?)\]/)[1]
    moves     = hsgf_string.scan(/;[BW]\[(.+?)\]/).map(&:first)
    size      = hsgf_string.match(/SZ\[(.+?)\]/)[1].to_i
    lg_id     = hsgf_string.match(/game\s#?(.+?)\]/)[1].to_i
    result_code_match = hsgf_string.match(/RE\[(.+?)\]/)
    result_code       = result_code_match && result_code_match[1]
    result_code_hash  = { "W" => :red, "B" => :blue }
    result            =  result_code_hash[result_code]
    record_options    = { 
      red_name:        red_name,
      blue_name:       blue_name, 
      move_list:       moves,
      size:            size,
      little_golem_id: lg_id,
      result:          result,
      blue_master:     masters.include?(blue_name),
      red_master:      masters.include?(red_name)
      }
    self.new(record_options) 
  end
  
  def save_meta_data!
    game = Game.find_by(little_golem_id: @game_attributes[:little_golem_id])
    if game
      game.red_master  ||= @game_attributes[:red_master]
      game.blue_master ||= @game_attributes[:blue_master]
      game.save! && game
    else
      Game.create!(
        @game_attributes.reject { |key, _| :move_list == key }
      )
    end
  end
  
  def save!
    game     = save_meta_data!
    board    = Board.new(@game_attributes[:size])
    position = board.find_or_create_position!
    GamePosition.create!(
      game_id: game.id, 
      position_id: position.id, 
      last_move: nil,
      turn_color: board.turn_color,
      last_move_number: 0
      )
    @game_attributes[:move_list].each_with_index do |move, index|
      board.handle_move(move)
      position = board.find_or_create_position!
      GamePosition.create!(
        game_id: game.id, 
        position_id: position.id, 
        last_move: move,
        turn_color: board.turn_color,
        last_move_number: index + 1
        )
    end
  end
  
  def self.save_player_file!(file, masters = [])
    ActiveRecord::Base.transaction do
      File.open(file).each do |line|
        line.chomp!
        next if line.empty? 
        game = GameRecord.read_hsgf(line, masters)
        game.save! if game.result
      end
    end
  end
  
  
  
  private
  
  # def self.coord(move_string)
  #   return move_string if ["resign", "swap"].include?(move_string)
  #   raise "bad move_string" unless move_string.length > 2
  #   move_string.chars.map { |char| char.ord - a.ord }
  # end
end


# 
# game_string = "(;FF[4]EV[hex.in.DEFAULT.14]PB[firehand]PW[Bundle Gerbe]SZ[13]RE[W]GC[ game 1578981]SO[http://www.littlegolem.com];W[ac];B[ie];W[fh];B[dj];W[ji];B[fg];W[hf];B[he];W[ef];B[ge];W[jf];B[kd];W[jd];B[je];W[dh];B[ee];W[cf];B[dg];W[bh];B[ed];W[resign])"
# 
# GameRecord.read_hsgf(game_string).save!