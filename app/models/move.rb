class Move < ActiveRecord::Base  # 
  # validates :game, presence: true
  # validates :position_digest, presence: true
  # 
  belongs_to :game, inverse_of: :moves
  has_many :comments
end
