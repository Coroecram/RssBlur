# Phase 1: User Authentication and Website Model

## Rails
### Models
* User
* Website

### Controllers
* UsersController (create, new)
* SessionsController (create, new, destroy)
* Api::WebsitesController (create, destroy, index, show, update)

### Views
* static/root.html.erb
* user/:id/index.html.erb

### ApiUtil
* ApiUtil.fetchAllWebsites (jFeed)

## Gems/Libraries
* BCrypt
* jFeed
