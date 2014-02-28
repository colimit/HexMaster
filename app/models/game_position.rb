class GamePosition < ActiveRecord::Base
  validates :game_id, presence: true
  validates :position_id, presence: true
  
  belongs_to :game
  belongs_to :position
end
