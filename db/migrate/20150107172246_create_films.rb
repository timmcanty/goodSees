class CreateFilms < ActiveRecord::Migration
  def change
    create_table :films do |t|
      t.string :title, null: false
      t.string :imdb_url, null: false
      t.text :description
      t.datetime :validated_at, default: nil
      t.timestamps
    end

    add_index :films, :title
  end
end
