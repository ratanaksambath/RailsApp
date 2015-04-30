module SessionsHelper

  # Current User methods:

  def current_user
    logged_in_user = User.hash(cookies[:logged_in_user])
    @current_user ||= User.find_by(logged_in_user: logged_in_user)
  end

  def current_user=(user)
    @current_user = user
  end

  def current_user?(user)
    current_user == user
  end

  # Signin Status methods:

  def signed_in?
    !current_user.nil?
  end

  def sign_in(user)
    logged_in_user = User.new_logged_in_user
    cookies.permanent[:logged_in_user] = logged_in_user
    user.update_attribute(:logged_in_user, User.hash(logged_in_user))
    self.current_user = user
  end

  def sign_out
    current_user.update_attribute(:logged_in_user, User.hash(User.new_logged_in_user))
    cookies.delete(:logged_in_user)
    self.current_user = nil
  end

  # Location Management methods:

  def store_location
    if request.get?
      session[:return_to] = request.url
    end
  end

  def redirect_back_or(default)
    redirect_to(session[:return_to] || default)
    session.delete(:return_to)
  end

  # Security Checkpoint method:

  def require_signin
    unless signed_in?
      store_location
      flash[:error] = 'Please sign in.'
      redirect_to signin_url
    end
  end
end