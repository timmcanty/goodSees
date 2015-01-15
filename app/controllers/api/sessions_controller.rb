class Api::SessionsController < ApplicationController

  def show
    if current_user
      render :show
    else
      render json: {}
    end
  end

  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user.nil?
      render json: params , status: :unprocessable_entity
    else
      login_user!(user)
      render :show
    end
  end

  def destroy
    logout_user!
    render json: {}
  end

end
