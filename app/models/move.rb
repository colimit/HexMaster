class Move < ActiveRecord::Base  # 
  # validates :game, presence: true
  # validates :position_digest, presence: true
  # 
  belongs_to :game, inverse_of: :moves
  has_many :comments
  
  
  #this is to be used in context where game is pre-fetched so does
  #not perform queries
  def next
    game.moves.to_a.find {|move| move.move_number == move_number + 1} || self
  end

  def previous
    game.moves.to_a.find {|move| move.move_number == move_number - 1} || self
  end


end
