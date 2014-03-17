class Game < ActiveRecord::Base  # 
  validates :little_golem_id, uniqueness: true
  validates :red_name, presence: true
  validates :blue_name, presence: true
  has_many :moves, inverse_of: :game
  has_many :comments, through: :moves
  
  #This creates a game with moves from
  #littlegolem.com's HSGF string. Note that this 
  #format has the unfortunate property that the fields giving the names of the    #players are reversed from what they should be
  #the masters are the names of the players, if any, who are considered a 
  #master. unfortunately, littlegolem hsgf files do not have rating, and they 
  #identify players only by name, which is non-unique and can change. 
  def self.read_hsgf(hsgf_string, masters = [])
    game = self.new
    game.red_name        = hsgf_string.match(/[B]\[(.+?)\]/)[1]
    game.blue_name       = hsgf_string.match(/[W]\[(.+?)\]/)[1]
    move_list            = hsgf_string.scan(/;[BW]\[(.+?)\]/).map(&:first)
    game.size            = hsgf_string.match(/SZ\[(.+?)\]/)[1].to_i
    game.little_golem_id = hsgf_string.match(/game\s#?(.+?)\]/)[1].to_i
    result_code_match    = hsgf_string.match(/RE\[(.+?)\]/)
    result_code          = result_code_match && result_code_match[1]
    result_code_hash     = { "B" => :red, "W" => :blue }
    game.result          = result_code_hash[result_code]
    game.blue_master     = masters.include?(game.blue_name)
    game.red_master      = masters.include?(game.red_name)
    board = Board.new(game.size)
    game.moves.build(move: nil, turn_color: board.turn_color, 
      move_number: 0, position_digest: board.position_digest)
    move_list.each_with_index do |move, index|
      board.handle_move(move)
      game.moves.build(move: move, turn_color: board.turn_color, 
        move_number: index + 1, position_digest: board.position_digest)
    end
    game
  end

  #if the record is found in the database, only the master properties are
  #updated, as appropriate. Otherwise, the game is saved
  def save_record!
    game = Game.find_by(little_golem_id: self.little_golem_id)
    if game
      game.red_master  ||= self.red_master
      game.blue_master ||= self.blue_master
      game.save!
    else
      save!
    end
  end
  
  #returns the board object after a certain number of moves
  def position(move_number = nil)
    Board.new(size).tap do |board|
      moves.sort_by { |move| move.move_number }.each_with_index do |move, index|
        next unless move.move
        break if index == move_number + 1
           move.move
        board.handle_move(move.move)
      end
    end
  end

  #parses and saves records for a littlegolem game file
  def self.save_player_file!(file, masters = [])
    ActiveRecord::Base.transaction do
      File.open(file).each do |line|
        next if line.chomp!.blank? 
        game = self.read_hsgf(line, masters)
        game.save_record! if game.result
      end
    end
  end
  
  
end