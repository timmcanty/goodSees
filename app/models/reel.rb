class Reel < ActiveRecord::Base
  validates :name, presence: true
  validates :user_id, presence: true
  validates_uniqueness_of :name, scope: :user_id

  belongs_to :user
  has_many :films, through: :film_reels
  has_many :film_reels

end
