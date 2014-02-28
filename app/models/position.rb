class Position < ActiveRecord::Base
  validates :position_digest, uniqueness: true, presence: true
  has_many :game_positions
  has_many :games, through: :game_positions
  

end
