# LONG LIVE THE QUEEN
![who the ---- do you think I am?](https://cdn-images-1.medium.com/max/1600/1*4NugaGbQ7UP7AAvxujuJGA.gif)


This project is a re-write of the king-tide/will-it-flood projects, building them from the ground up as a single application.

## Getting Started

This project uses Ruby 2.5.0. We recommend installing Ruby through the Ruby Version Manager: https://rvm.io/

To make development easier for newcomers, we are also not using PostgreSQL in development. If you don't want to install the Postgres driver remember to run bundler with the `--without production` flag.

To run this project you will also need a Google Maps [API key](https://developers.google.com/maps/documentation/javascript/get-api-key).

Clone the repository and create the file `application.yml` in the `config` sub-directory.

```yaml
google_maps_key: [YOUR GOOGLE MAPS KEY]
default_user_email: [AN EMAIL ADDRESS FOR THE ADMIN]
default_user_password: [A PASSWORD TO USE FOR THE ADMIN]
```
This file contains configuration information that should not be committed to source control. For the default user, enter any valid email you want. The application will not require you to access it.

After creating `application.yml` run the following commands:

```shell
bundle --without production
rails db:create
rails db:migrate
rails db:seed
rails s
```

And navigate to http://localhost:3000 to see the App in action.