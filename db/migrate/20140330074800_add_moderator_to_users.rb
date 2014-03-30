class AddModeratorToUsers < ActiveRecord::Migration
  def change
    add_column :users, :moderator, :boolean
  end
end
