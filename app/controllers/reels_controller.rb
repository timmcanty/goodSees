class ReelsController < ApplicationController

  before_action :require_user!

  def index
    @reels = current_user.reels
    render :index
  end

  def create
    @reel = Reel.new(
      user_id: current_user.id,
      custom: true,
      name: params[:name]
    )

    unless @reel.save
      flash[:errors] = ['Invalid Reel Name']
    end

    redirect_to reels_url
  end

  def destroy
    @reel = Reel.find(params[:id])

    if @reel.custom
      @reel.destroy!
    else
      flash.now[:errors] = ["Cannot delete default reels!"]
    end

    redirect_to reels_url
  end
end
