class Admin < ApplicationRecord
  # To keep things simple, there will be no signing of admins in the App. Accounts will be created by Admins.
  devise :database_authenticatable, :rememberable, :trackable, :validatable
end
