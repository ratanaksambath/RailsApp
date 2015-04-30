class User < ActiveRecord::Base
  has_many :recipes
  has_many :grocery_lists
  before_create :create_logged_in_user
  before_save :normalize_fields

  validates :name,
    presence: true,
    length: { maximum: 50 }

  validates :email,
    presence: true,
    uniqueness: { case_sensitive: false },
    format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i }

  has_secure_password

  def User.new_logged_in_user
    SecureRandom.urlsafe_base64
  end

  def User.hash(token)
    Digest::SHA1.hexdigest(token.to_s)
  end

  private

  def create_logged_in_user
    self.logged_in_user = User.hash(User.new_logged_in_user)
  end

  def normalize_fields
    self.email.downcase!
  end


end
