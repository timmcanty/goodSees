class Reel < ActiveRecord::Base
  validates :name, presence: true
  validates :user_id, presence: true
  validates_uniqueness_of :name, scope: :user_id

  belongs_to :user

  private

  def user_has_no_duplicates
    reels = User.find(self.user_id).reels
    reels.each do |reel|
      if reel.name == self.name
        return false
      end
    end
    true
  end

end
