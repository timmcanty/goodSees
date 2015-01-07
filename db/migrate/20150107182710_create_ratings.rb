class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.integer :user_id, null: false
      t.integer :film_id, null: false
      t.integer :rating
      t.date :view_date
      t.text :review
      t.timestamps
    end

    add_index :ratings, [ :user_id, :film_id]
    add_index :ratings, :rating
    add_index :ratings, :view_date
  end
end
