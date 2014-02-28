class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string   :red_name
      t.string   :blue_name
      t.integer  :little_golem_id
      t.string   :result, null: false
      t.boolean  :red_master
      t.boolean  :blue_master
      t.integer  :size
      t.timestamps
    end
    add_index(:games, :little_golem_id, unique: true)
  end
end
