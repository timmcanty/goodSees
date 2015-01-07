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

ActiveRecord::Schema.define(version: 20150107162004) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "reels", force: true do |t|
    t.integer  "user_id"
    t.string   "name",       null: false
    t.boolean  "custom"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "reels", ["user_id", "name"], name: "index_reels_on_user_id_and_name", unique: true, using: :btree

  create_table "session_tokens", force: true do |t|
    t.integer  "user_id"
    t.string   "token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "session_tokens", ["user_id"], name: "index_session_tokens_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "password_digest", null: false
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "name"
    t.string   "location"
    t.integer  "featured_id"
    t.datetime "birth_date"
    t.text     "bio"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
