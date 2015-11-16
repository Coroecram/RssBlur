# RSSBlur

[Heroku link][heroku]

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

RSSBlur is a web application inspired by NewsBlur built using Ruby on Rails
and React.js in order to keep RSS feeds in one formatted browser page.

RSSBlur allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Compile RSS feeds, request new articles at regular intervals
- [ ] Organize website feeds into folders
- [ ] Organize articles into folders
- [ ] Tag articles and websites with category tags and search them by tag
- [ ] Search through article titles for blocks of text
- [ ] Keep track of read and unread articles

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, User Websites and Landing Page (1.5 day)

Phase 1: The website will begin with the ability to create user accounts with BCrypt
encrypted passwords. After signing up, users will be redirected to the home-
page where they will already be subscribed to some websites and bare a-tag links
to those sites will be provided.

[Details][phase-one]

### Phase 2: Websites, Articles, Folders and Tags (1.5 days)

Phase 2 will allow for the addition of website RSS feeds for the User. The
site will host a single database for each unique website, which users can then
link to with a join table. By default, the website will refresh a user's feed by
a specified interval that will be user-controlled in a later point of
development. I will be using the jQuery plugin jFeed (https://github.com/jfhovinne/jFeed)
to handle the RSS/XML requests as JSON objects. With the RSS feed API working,
I will work on how to organize the article data coming through and putting it
into the database associated with the proper website. (I will definitely need
to configure how many articles are pre-cached in the database and how to handle
garbage collecting/updating the database as the project, views, and my
understanding of jFeed progresses.) Websites and articles can then be associated with different folders which can be created, destroyed, and renamed. Finally, different preset tags (for example, read, important) will be able to be set onto the websites and articles.

[Details][phase-two]

### Phase 3: Flux Stores and Actions (2 days)

Phase 3 will be creating the foundation of Flux, the React Router, and the React view structure for the main application. After the basic Flux architecture has been set up, a website store will be implemented and a set of actions corresponding to the needed CRUD functionality created.  After the website store is created a second store for articles will be created and populated by the websites. Fetch actions for specific websites will then be created for articles.


[Details][phase-three]

### Phase 4: React Components (2.5 days)

Phase 4 will be the creation of React views and routes for the bulk of the
website. Namely, the 'Guest Page', 'Link View', 'RSS Form', and 'Feed Options'.
These will rely upon the Flux Action architecture created in the previous phase.
After this phase websites can be added, read, tagged, organized, categorized,
and removed in the browser. Articles will be able to be read, tagged, organized,
and categorized. Folders will be able to be added, tagged, organized, renamed,
and destroyed. Folders will also be able to be 'opened' and 'closed' to view contents.

[Details][phase-four]

### Phase 5: Search and Sorting (1 day)

Phase 5 introduces two new features. First, users can search for specific
articles, based on their title or author, in a selected subset of websites or
the complete collection of websites the are subscribed to. The second function
will allow users to sort their article views based upon different criteria.
(date and read, for starters)

[Details][phase-five]

### Phase 6: Styling, Cleanup, and Seeding (1.5 day)

Phase 6 will be for available extra time, styling, seeding the site db
and adding features listed within my bonus or discovered throughout development.

[Details][phase-six]

### Bonus Features (TBD)
- [ ] Loading Animation
- [ ] Library of suggested websites
- [ ] Account settings
- [ ] Use javascript library for cleaner tag selection
- [ ] Pagination / infinite scroll for Articles
- [ ] Multiple sessions to share articles
- [ ] Highlighting in Article share
- [ ] Internal Commenting on Articles

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
