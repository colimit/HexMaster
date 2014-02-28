class Game < ActiveRecord::Base
  validates :little_golem_id, uniqueness: true
  validates :result, presence: true  
  has_many :moves, inverse_of: :game
end
