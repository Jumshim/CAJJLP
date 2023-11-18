require 'jwt'
require 'json'

class UserController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def new
    @user = User.new
  end

  def generate_jwt(id)
    jwt_secret = 'NOTASECRET' # TODO change later
    day = 24.hours / 1.minute
    payload = {
      data: { id: id },
      exp: Time.now.to_i + day,
      nbf: Time.now.to_i,
    }
    token = JWT.encode payload, jwt_secret, 'HS256'
    token
  end

  def login
    user = User.find_by(username: user_params[:username])

    if user&.authenticate(user_params[:password])
      token = generate_jwt(user.id)
      render json: {status: "User login successful", user: user, token: token}, status: :ok 
    else
      render json: {errors: user.errors.full_messages}, status: :not_found
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render json: {status: "User created successfully", user: @user}, status: :created
    else
      render json: {errors: @user.errors.full_messages}, status: :conflict
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
