class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user
  helper_method :logged_in?

  private

  def current_user
    return nil unless session[:token]
    session_token = SessionToken.find_by token: session[:token]
    return nil unless session_token
    session_token.user @current_user ||= session_token.user
  end

  def logged_in?
    !!current_user
  end

  def login_user!(user)
    session_token = SessionToken.new( user_id: user.id)
    session_token.save!
    session[:token] = session_token.token
  end

  def logout_user!
    session_token = SessionToken.find_by token: session[:token]
    session_token.destroy!
    session[:token] = nil
  end

  def require_user!
    redirect_to new_session_url if current_user.nil?
  end

end
