class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      login_user!(@user)
      redirect_to reels_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def index
    @users = User.all
    render :index
  end

  def new
    @user = User.new
    render :new
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def edit
    @user = current_user
    render :edit
  end

  def update
    @user = current_user

    if @user.update(user_params)
      redirect_to user_url(@user.id)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :edit
    end
  end

  private
  def user_params
    params.require(:user).permit(:password,:username,:email, :bio, :birth_date, :name, :location, :featured_id)
  end
end
