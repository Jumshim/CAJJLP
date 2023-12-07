class PostController < ApplicationController
<<<<<<< HEAD
  #skip authenticity token verification for all actions 
  skip_before_action :verify_authenticity_token

  #use user authentication for actions except index and show (create, destroy)
  before_action :authenticate_user!, except: [:index, :show]
  
  #create a new post 
  def create
    #build a new post associated with the current user 
    post = current_user.posts.new(post_params)

    #handle post creation (success vs failure)
    if post.save
      render json: { status: 'Post created successfully', post: post }, status: :created
    else
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
=======
    skip_before_action :verify_authenticity_token
    before_action :authenticate_request!, except: [:index, :index_by_forum]
  
    def create
        forum = Forum.find_by(title: params[:forum])
        post = current_user.posts.new(post_params)
        post.forum = forum
        if post.save
            render json: { status: 'Post created successfully', post: post }, status: :created
        else
            render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index 
        post = Post.find_by(id: params[:id])
        if post
          render json: post.as_json(include: {user: { only: :username}})
        else
          render json: { error: 'Post not found'}, status: :not_found
        end
    end

    def index_by_forum
      forum = Forum.find_by(title: params[:tag])
      if forum
        posts = forum.posts
        render json: posts.as_json(include: { user: { only: :username}})
      else
        render json: { error: 'Posts or Forum not found'}, status: :not_found
      end
>>>>>>> 2c5c884 (done with forum and post and comments)
    end
  end

  #retrieve all posts 
  def index 
    posts = Post.all
    #render posts as JSON, including the username of the associated user 
    render json: posts.as_json(include: {user: { only: :username}})
  end

  #retrieve posts of the current user 
  def user_posts
    posts = current_user.posts
    #render user posts as JSON 
    render json: posts.as_json
  end

    
  def destroy
    #find the post that belongs to the current user by ID 
    post = current_user.posts.find_by(id: params[:id])
    
    if post
      #handle success vs failure for destroying the post 
      if post.destroy
        render json: { status: 'Post deleted successfully' }, status: :ok
      else
        render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
      end
    #handle the case where the post isn't found 
    else
      render json: { error: 'Post not found' }, status: :not_found
    end
  end 
      
  private
  def post_params
    #params for post creation
    params.require(:post).permit(:title, :body)
  end
end
