module Api
  class UsersController < ApiController

    def index
      render :index
    end

    def show
      @user = User.includes(:ratings, reels: :films).find(params[:id])
      render :show
    end

    def update
      @user = User.find(params[:id])
      @user.update( featured_id: params[:featured_id])
      render :show
    end
  end
end
