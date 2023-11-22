class BattlesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_request!, except: [:index]

  def create
    battle = current_user.battles.new(battle_params)
    if battle.save
      render json: { status: 'Battle created successfully', battle: battle }, status: :created
    else
      render json: { errors: battle.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    battles = Battle.includes(:user).all
    render json: battles.as_json(include: {user: { only: :username}})
  end

  private

  def battle_params
    params.require(:battle).permit(:title, :description, :battle_type, :date)
  end
end
