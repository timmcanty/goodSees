class Friendable < ActiveRecord::Base
  belongs_to :user
  belongs_to :friend, class_name: 'User', foreign_key: :friend_id

  def accept
    self.update(accepted: true)
    Friendable.create(
      user_id: self.friend_id,
      friend_id: self.user_id,
      accepted: true
    )
  end

  def remove
    Friendable.find_by(user_id: self.friend_id, friend_id: self.user_id).destroy
    self.destroy
  end



end
