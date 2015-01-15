class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.references :mentionable, polymorphic: true, index: true
      t.string :message, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
    
    add_index :activities, :user_id
  end
end
