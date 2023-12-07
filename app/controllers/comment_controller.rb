class CommentController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :authenticate_request!, except: [:index]
  
    def create
        comment = current_user.comments.new(comment_params)
        post = Post.find_by(id: params[:post_id])
        comment.post = post
        if comment.save
            render json: { status: 'Comment created successfully', comment: comment }, status: :created
        else
            render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index 
        post = Post.find_by(id: params[:id])
        puts post
        if post.save
          comments = post.comments.all
          render json: comments.as_json(include: {user: { only: :username}}), status: :ok
        else
          render json: {errors: post.errors.full_messages}, status: :unprocessable_entity
        end
    end
  end

  #retrieve all comments
  def index 
    comments = Comment.all
    #render comments as JSON, including the username of the associated user 
    render json: comments.as_json(include: {user: { only: :username}})
  end

  #retrieve comments of the current user 
  def user_comments
    comments = current_user.comments
    #render user comments as JSON 
    render json: comments.as_json
  end

    
  def destroy
    #find the comment that belongs to the current user by ID
    comment = current_user.comments.find_by(id: params[:id])

    if comment
      #handle success vs failure for destroying the comment
      if comment.destroy
        render json: { status: 'Comment deleted successfully' }, status: :ok
      else
        render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
      end
    #handle the case where the comment isn't found 
    else
      render json: { error: 'Comment not found' }, status: :not_found
    end
  end 
      
  private
  def comment_params
    #params for comment creation
    params.require(:comment).permit(:body)
  end
end
