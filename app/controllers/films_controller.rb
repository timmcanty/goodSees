class FilmsController < ApplicationController


  def show
    @film = Film.find(params[:id])
    @rating = Rating.find_by(user_id: current_user.id, film_id: params[:id])
    render :show
  end

  def index
    if params[:user_id]
      @user = User.find(params[:user_id])
      @films = User.find(params[:user_id]).films
    else
      @films = Film.all
    end

    render :index
  end
end
