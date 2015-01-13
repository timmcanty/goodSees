module Api
  class UsersController < ApiController

    def index
      @users = User.all
      render :index
    end

    def show
      @user = User.includes(:ratings, reels: :films).find(params[:id])
      render :show
    end

    def update
      @user = User.find(params[:id])
      @user.update(user_params)
      render :show
    end

    private

    def user_params
      params.require(:user).permit(:featured_id,:name, :location, :birth_date, :bio, :image)
    end
  end
end
