class Api::FriendablesController < ApplicationController

  def create
    return if current_user.id == params[:id]
    @friendable = Friendable.new(
      from_id: current_user.id
      to_id: params[:id]
    )

    if @friendable.save
      render json: @friendable
    else
      render json: @friendable.errors.full_messages
    end
  end

  def update
    @friendable = Friendable.find_by(
      to_id: current_user.id,
      from_id: params[:id]
    )

    if @friendable.update(accepted: true)
      render json: @friendable
    else
      render json: @friendable.errors.full_messages
    end
  end

  def destroy
    @friendable = Friendable.find_by(
      to_id: current_user.id,
      from_id: params[:id]
    )
    @friendable.destroy
    render json: 'destroyed'
  end
end
