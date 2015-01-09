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
      fail
    end
  end
end
