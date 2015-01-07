class FilmsController < ApplicationController


  def show
    @film = Film.find(params[:id])
    @rating = Rating.find_by(user_id: current_user.id, film_id: params[:id])
    render :show
  end
end
