# RSSBlur

[Heroku link][heroku]

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

RSSBlur is a web application inspired by NewsBlur built using Ruby on Rails
and React.js in order to keep RSS feeds in one formatted browser page.

RSSBlur allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] React-Based Authentication
- [x] React-Based Authorization
- [x] Add new Website to User via pop-up form
- [x] Organize website feeds into clickable sidebar list
- [x] Organize articles into list and summary components
- [x] Add dynamic scrolling to articles on-click of list
- [x] Add unread counter and update in real-time
- [x] Loading Animations
- [x] Pagination for Article lists
- [x] Edit profile menu
- [x] Profile pics with AWS storage


## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, User Websites and Landing Page (1 day)

Phase 1: The website will begin with the ability to create user accounts with BCrypt
encrypted passwords. After signing up, users will be redirected to the home-
page where they will already be subscribed to some websites and bare a-tag links
to those sites will be provided.

[Details][phase-one]

### Phase 2: Websites and Sidebar Component (2 days)

Phase 2 will allow for the addition of website RSS feeds for the User. The
site will host a single database for each unique website, which users can then
link to with a join table. Websites will have to be checked as valid RSS feeds,
and then added to both the Website database and UserWebsite database when created
 I will be using the Feedjira gem or the built-in Rails RSS parser to handle the
 RSS/XML requests and NOKOGIRI to parse them out. With the RSS feed API working,
I will work on the sidebar to view the data coming through in a selectable list.

[Details][phase-two]

### Phase 3: Articles and UserArticles (2 days)

Phase 3 will be concerned with the centerpiece of my website, the articles.
Articles will have to be parsed from the RSS feeds correctly and the relevant information
passed down the the components. Also, UserArticles will have to be created when
an user retrieves and Article, and deleted on deletion of the website the User
and Article are associated with.

[Details][phase-three]

### Phase 4: Unread, Pagination, Search and Sort (2 days)

Phase 4 introduces new features for articles. First, unread articles will be calculated for each UserWebsite and displayed, in real-time, next to the listed website name. Next, users will be able to bring up more articles when they reach the bottom of the scroll. This will be done with the Kaminari gem. (Ideally, there would even be infinite scrolling). Finally, a component will be added to search and display articles with certain criteria. Finally, when the articles are loaded and displayed, they can be sorted by another component without pinging the database again.

[Details][phase-four]


### Phase 5: Profile Info and AWS (1 day)

Phase 5 will be a bit of old and new. I will be going back to the User model and adding a menu with components that will allow a user to change their password and profile pic. For the new, I will be setting up an AWS account linked to my project where I will store the profile pictures.

[Details][phase-five]

### Phase 6: Right-Click CRUD Component (1 day)

Phase 6 will be creating a component that comes up on right click that will hold the UX functionality for the different items. This component can be reinterpreted for the different data objects but, to start, will be focused on the CRUD commands for Websites in the sidebar and sorting in the Article components. It will link in to most of the Api actions and Utils already created.

[Details][phase-six]


### Bonus Features (TBD)
- [x] Guest login controls and walkthrough
- [x] Search articles by title, summary or author
- [ ] Search and Sort articles by time published
- [ ] Sign in via Facebook, Twitter, etc.
- [ ] Sign in via Facebook, Twitter, etc.
- [ ] Add Right Click Menu for CRUD options
- [ ] Add folders to organize websites
- [ ] Sharing articles via social media accounts with one-click
- [ ] Internal Commenting on Articles
- [ ] Personal Blogs and Article Collections
- [ ] Upvoting of Articles, Blogs and Collections
- [ ] Highlighting in Article share
- [ ] Public/Private settings
- [ ] Friends Between Users

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
