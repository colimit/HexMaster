class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :email
      t.string :password_digest
      t.string :little_golem_name
    end
    
    add_index :users, :username
  end
end
