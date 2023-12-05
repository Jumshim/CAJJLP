class PostController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :authenticate_user!, except: [:index, :show]
  
    def create
        post = current_user.posts.new(post_params)
        if post.save
            render json: { status: 'Post created successfully', post: post }, status: :created
        else
            render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index 
        posts = Post.all
        render json: posts.as_json(include: {user: { only: :username}})
    end

    def user_posts
        posts = current_user.posts
        render json: posts.as_json
    end

    
    def destroy
        post = current_user.posts.find_by(id: params[:id])
        if post
          if post.destroy
            render json: { status: 'Post deleted successfully' }, status: :ok
          else
            render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { error: 'Post not found' }, status: :not_found
        end
    end 
      
    private
    def post_params
        params.require(:post).permit(:title, :body)
    end
end
