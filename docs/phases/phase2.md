# Phase 2: Websites and Sidebar Component (2 days)

## Rails
### Models
* Website
* UserWebsite

### Controllers
* Api::WebsitesController (create, index, delete, show, update)

## Flux
### Components
* Header
* Sidebar
* Websites
* WebsiteList
* SidebarFooter
* NewWebsiteForm


### Stores
* WebsiteStore
* SidebarClickedStore

### Actions
* WebsiteApiActions.createWebsite
* WebsiteApiActions.fetchUserWebsites
* WebsiteApiActions.deleteWebsite
* WebsiteApiActions.setSidebarClicked


### ApiUtil
* WebsiteApiUtil.fetchUserWebsites
* WebsiteApiUtil.fetchWebsite
* WebsiteApiUtil.createWebsite
* WebsiteApiUtil.deleteWebsite
