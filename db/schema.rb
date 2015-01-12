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

ActiveRecord::Schema.define(version: 20150109150215) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "film_reels", force: true do |t|
    t.integer  "film_id",    null: false
    t.integer  "reel_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "film_reels", ["film_id", "reel_id"], name: "index_film_reels_on_film_id_and_reel_id", unique: true, using: :btree

  create_table "films", force: true do |t|
    t.string   "title",        null: false
    t.string   "imdb_url",     null: false
    t.text     "description"
    t.datetime "validated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "films", ["title"], name: "index_films_on_title", using: :btree

  create_table "ratings", force: true do |t|
    t.integer  "user_id",     null: false
    t.integer  "film_id",     null: false
    t.integer  "star_rating"
    t.date     "view_date"
    t.text     "review"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "ratings", ["star_rating"], name: "index_ratings_on_star_rating", using: :btree
  add_index "ratings", ["user_id", "film_id"], name: "index_ratings_on_user_id_and_film_id", using: :btree
  add_index "ratings", ["view_date"], name: "index_ratings_on_view_date", using: :btree

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
    t.string   "password_digest",                 null: false
    t.string   "username",                        null: false
    t.string   "email",                           null: false
    t.string   "name"
    t.string   "location"
    t.integer  "featured_id"
    t.date     "birth_date"
    t.text     "bio"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "admin",           default: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
