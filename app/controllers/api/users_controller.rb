module Api
  class UsersController < ApiController


    def index
      @users = User.all
      render :index
    end


    def create
      @user = User.new(user_params)

      if @user.save
        login_user!(@user)
        render :show
      else
        render json: params
      end
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
      params.require(:user).permit(:featured_id,:name, :location, :birth_date, :bio, :image, :username, :password, :email)
    end
  end
end
