# create_table "ratings", force: true do |t|
#   t.integer  "user_id",     null: false
#   t.integer  "film_id",     null: false
#   t.integer  "star_rating"
#   t.date     "view_date"
#   t.text     "review"
#   t.datetime "created_at"
#   t.datetime "updated_at"
# end

json.extract! @rating, :user_id, :film_id, :star_rating, :id, :review, :created_at, :updated_at
