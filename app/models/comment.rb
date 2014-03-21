class Comment < ActiveRecord::Base
  validates :body, presence: true
  validates :game, presence: true
  belongs_to :game, inverse_of: :comments
  belongs_to :user, inverse_of: :comments
end 
