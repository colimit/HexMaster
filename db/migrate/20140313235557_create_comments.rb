class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :move_id
      t.text :body

      t.timestamps
    end
    add_index :comments, :move_id
  end
end
