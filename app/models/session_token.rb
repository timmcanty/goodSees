class SessionToken < ActiveRecord::Base

  belongs_to :user
  after_initialize :ensure_token

  private

  def ensure_token
    self.token ||= SecureRandom.urlsafe_base64(16)
  end


end
