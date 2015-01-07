class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :password_digest, null: false
      t.string :username, null: false
      t.string :email, null: false
      t.string :name
      t.string :location
      t.integer :featured_id
      t.datetime :birth_date
      t.text :bio
      t.timestamps
    end

    add_index :users, :username, unique: true
    add_index :users, :email, unique: true
  end
end
