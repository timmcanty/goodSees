module Api
  class UsersController < ApiController

    def show
      @user = User.includes(:ratings, reels: :films).find(params[:id])
      render :show
    end
  end
end
