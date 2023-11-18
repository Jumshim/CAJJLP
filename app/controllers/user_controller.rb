class UserController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def new
    @user = User.new
  end

  def login
    @user = User.find(user_params)

    if user.save
      render json: {status: "User login successful", user: user}, status: :ok 
    else
      render json: {errors: user.errors.full_messages}, status: :not_found
    end
  end

  def create
    user = User.new(user_params)

    if user.save
      render json: {status: "User created successfully", user: user}, status: :created
    else
      render json: {errors: user.errors.full_messages}, status: :conflict
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
