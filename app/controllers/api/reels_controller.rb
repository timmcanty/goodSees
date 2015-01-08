module Api
  class ReelsController < ApiController

    def create
      @reel = current_user.reels.new(reel_params)

      if @reel.save
        render json: @reel
      else
        render json: @reel.errors.full_messages, status: :unprocessable_entity
      end
    end


    private


    def reel_params
      params.require(:reel).permit(:name, :custom)
    end

  end
end
