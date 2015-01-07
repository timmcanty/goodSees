class CreateReels < ActiveRecord::Migration
  def change
    create_table :reels do |t|
      t.integer :user_id
      t.string :name, null: false
      t.boolean :custom
      t.timestamps
    end

    add_index :reels, [:user_id, :name], unique: true
  end
end
