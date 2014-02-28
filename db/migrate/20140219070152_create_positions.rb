class CreatePositions < ActiveRecord::Migration
  def change
    create_table :positions do |t|
      t.string :position_digest, null: false
      t.timestamps
    end
    
    add_index :positions, :position_digest, unique: true
  end
end
