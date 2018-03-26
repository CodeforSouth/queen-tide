#create default user
if Admin.find_by(email:'codeformiami@gmail.com').nil?
    Admin.create!(email: 'codeformiami@gmail.com', password: ENV['default_user_password'], password_confirmation: ENV['default_user_password'])
end