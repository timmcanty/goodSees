class User < ActiveRecord::Base
  attr_reader :password

  has_many :session_tokens
  has_many :reels

  validates :username, :email,  presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  before_create :generate_default_reels

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)

    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def generate_default_reels
    reels.new( name: 'To Watch', custom: false)
    reels.new( name: 'Watched', custom: false)
  end

end
