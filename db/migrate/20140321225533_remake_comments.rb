class RemakeComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :game_id, null: false
      t.text :body
      t.integer :user_id

      t.timestamps
    end
    add_index :comments, :game_id
    add_index :comments, :user_id
  end
end
