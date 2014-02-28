class Game < ActiveRecord::Base
  validates :little_golem_id, uniqueness: true
  validates :result, presence: true  
  has_many :game_positions
  has_many :positions, through: :game_positions
end
