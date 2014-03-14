class CreateMoves < ActiveRecord::Migration
  def change
    create_table   :moves do |t|
      t.references :game, null: false
      t.string     :move
      t.string     :turn_color
      t.integer    :move_number, null: false
      t.string     :position_digest, null: false
      t.timestamps
    end
    add_index :moves, :game_id
    add_index :moves, :position_digest
  end
end
