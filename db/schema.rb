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

ActiveRecord::Schema.define(version: 20150115212842) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: true do |t|
    t.integer  "mentionable_id"
    t.string   "mentionable_type"
    t.string   "message",          null: false
    t.integer  "user_id",          null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "activities", ["mentionable_id", "mentionable_type"], name: "index_activities_on_mentionable_id_and_mentionable_type", using: :btree
  add_index "activities", ["user_id"], name: "index_activities_on_user_id", using: :btree

  create_table "film_reels", force: true do |t|
    t.integer  "film_id",    null: false
    t.integer  "reel_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "film_reels", ["film_id", "reel_id"], name: "index_film_reels_on_film_id_and_reel_id", unique: true, using: :btree

  create_table "films", force: true do |t|
    t.string   "title",              null: false
    t.string   "imdb_url",           null: false
    t.text     "description"
    t.datetime "validated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "films", ["title"], name: "index_films_on_title", using: :btree

  create_table "friendables", force: true do |t|
    t.integer  "user_id",                    null: false
    t.integer  "friend_id",                  null: false
    t.boolean  "accepted",   default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "friendables", ["user_id", "friend_id"], name: "index_friendables_on_user_id_and_friend_id", unique: true, using: :btree

  create_table "pg_search_documents", force: true do |t|
    t.text     "content"
    t.integer  "searchable_id"
    t.string   "searchable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

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

  create_table "read_marks", force: true do |t|
    t.integer  "readable_id"
    t.integer  "user_id",                  null: false
    t.string   "readable_type", limit: 20, null: false
    t.datetime "timestamp"
  end

  add_index "read_marks", ["user_id", "readable_type", "readable_id"], name: "index_read_marks_on_user_id_and_readable_type_and_readable_id", using: :btree

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
    t.string   "password_digest",                    null: false
    t.string   "username",                           null: false
    t.string   "email",                              null: false
    t.string   "name"
    t.string   "location"
    t.integer  "featured_id"
    t.date     "birth_date"
    t.text     "bio"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "admin",              default: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "uid"
    t.string   "provider"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
