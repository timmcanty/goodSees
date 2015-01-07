class SessionsController < ApplicationController

  def create
    user = User.find_by_credentials(params[:username], params[:password])
    if user.nil?
      flash.now[:errors] = ["Incorrect username and/or password"]
      render :new
    else
      login_user!(user)
      redirect_to reels_url
    end
  end

  def destroy
    logout_user!
    redirect_to new_session_url
  end

  def new
    render :new
  end
end
