class CreateGamePositions < ActiveRecord::Migration
  def change
    create_table   :game_positions do |t|
      t.references :game, null: false
      t.references :position, null: false
      t.string     :last_move
      t.string     :turn_color
      t.integer    :last_move_number, null: false
      t.timestamps
    end
    add_index :game_positions, :position_id
    add_index :game_positions, :game_id
  end
end
