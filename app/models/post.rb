class Post < ApplicationRecord
  belongs_to :user
  belongs_to :forum
  has_many :comments

  validates :title, presence: true
  validates :body, presence: true, length: { minimum: 10 }
end
