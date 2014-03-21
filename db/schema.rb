# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140321230131) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: true do |t|
    t.integer  "game_id",    null: false
    t.text     "body"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["game_id"], name: "index_comments_on_game_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "games", force: true do |t|
    t.string   "red_name"
    t.string   "blue_name"
    t.integer  "little_golem_id"
    t.string   "result",          null: false
    t.boolean  "red_master"
    t.boolean  "blue_master"
    t.integer  "size"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "games", ["little_golem_id"], name: "index_games_on_little_golem_id", unique: true, using: :btree

  create_table "moves", force: true do |t|
    t.integer  "game_id",         null: false
    t.string   "move"
    t.string   "turn_color"
    t.integer  "move_number",     null: false
    t.string   "position_digest", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "moves", ["game_id"], name: "index_moves_on_game_id", using: :btree
  add_index "moves", ["position_digest"], name: "index_moves_on_position_digest", using: :btree

  create_table "users", force: true do |t|
    t.string "username",          null: false
    t.string "email"
    t.string "password_digest"
    t.string "little_golem_name"
  end

  add_index "users", ["username"], name: "index_users_on_username", using: :btree

end
