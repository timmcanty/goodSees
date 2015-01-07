class SessionsController < ApplicationController

  def create
    user = User.find_by_credentials(params[:username], params[:password])
    if user.nil?
      flash.now[:errors] = ["Incorrect username and/or password"]
      render :new
    else
      login_user!(user)
      render :works
    end
  end

  def destroy
    logout_user!
    render :works
  end

  def new
    render :new
  end
end
