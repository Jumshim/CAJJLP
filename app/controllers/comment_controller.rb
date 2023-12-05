class CommentController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :authenticate_user!, except: [:index, :show]
  
    def create
        comment = current_user.comments.new(comment_params)
        if comment.save
            render json: { status: 'Comment created successfully', comment: comment }, status: :created
        else
            render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index 
        comments = Comment.all
        render json: comments.as_json(include: {user: { only: :username}})
    end

    def user_comments
        comments = current_user.comments
        render json: comments.as_json
    end

    
    def destroy
        comment = current_user.comments.find_by(id: params[:id])
        if comment
          if comment.destroy
            render json: { status: 'Comment deleted successfully' }, status: :ok
          else
            render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { error: 'Comment not found' }, status: :not_found
        end
    end 
      
    private
    def comment_params
        params.require(:comment).permit(:body)
    end
end
