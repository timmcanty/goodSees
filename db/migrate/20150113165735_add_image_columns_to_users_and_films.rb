class AddImageColumnsToUsersAndFilms < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.attachment :image
    end
    change_table :films do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :users, :image
    remove_attachment :films, :image
  end
end
