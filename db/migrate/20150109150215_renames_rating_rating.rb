class RenamesRatingRating < ActiveRecord::Migration
  def change
    rename_column :ratings, :rating, :star_rating
  end
end
