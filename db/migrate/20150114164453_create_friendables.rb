class CreateFriendables < ActiveRecord::Migration
  def change
    create_table :friendables do |t|
      t.integer :user_id, null: false
      t.integer :friend_id, null:false
      t.boolean :accepted, default: false
      t.timestamps
    end

    add_index :friendables, [:user_id, :friend_id], unique: true
  end
end
