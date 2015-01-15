class FilmsController < ApplicationController

  before_action :require_admin, except: [:show, :index]

  def show
    @film = Film.find(params[:id])
    @rating = Rating.find_by(user_id: current_user.id, film_id: params[:id])
    @reels = current_user.reels
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

  def new
      @film = Film.new
      render :new
  end

  def create
    @film = Film.new(film_params)
    if @film.save
      redirect_to film_url(@film.id)
    else
      flash.now[:errors] = @film.errors.full_messages
      render :new
    end
  end

  def edit
    @film = Film.find(params[:id])
    render :edit
  end

  def update
    @film = Film.find(params[:id])
    if @film.update(film_params)
      redirect_to film_url(@film.id)
    else
      flash.now[:errors] = @film.errors.full_messages
      render :edit
    end
  end

  def destroy
    @film = Film.find(params[:id])
    @film.destroy
    redirect_to films_url
  end

  private

  def film_params
    params.require(:film).permit(:imdb_url, :title, :description)
  end

  def require_admin
    redirect_to films_url unless current_user.is_admin?
  end
end
