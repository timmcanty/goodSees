class CreateFilmReels < ActiveRecord::Migration
  def change
    create_table :film_reels do |t|
      t.integer :film_id, null: false
      t.integer :reel_id, null: false
      t.timestamps
    end

    add_index :film_reels, [:film_id, :reel_id], unique: true
  end
end
