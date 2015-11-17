# RSSBlur

[Heroku link][heroku]

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

RSSBlur is a web application inspired by NewsBlur built using Ruby on Rails
and React.js in order to keep RSS feeds in one formatted browser page.

RSSBlur allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create an account
- [x] Log in / Log out
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

### Phase 1: User Authentication, User Websites and Landing Page (1 day)

Phase 1: The website will begin with the ability to create user accounts with BCrypt
encrypted passwords. After signing up, users will be redirected to the home-
page where they will already be subscribed to some websites and bare a-tag links
to those sites will be provided.

[Details][phase-one]

### Phase 2: Websites and Sidebar Component (2 days)

Phase 2 will allow for the addition of website RSS feeds for the User. The
site will host a single database for each unique website, which users can then
link to with a join table. By default, the website will refresh a user's feed by
a specified interval that will be user-controlled in a later point of
development. I will be using the jQuery plugin jFeed (https://github.com/jfhovinne/jFeed)
to handle the RSS/XML requests as JSON objects. With the RSS feed API working,
I will work on the sidebar to view the data coming through.

[Details][phase-two]

### Phase 3: Articles, Folders, and LinkView (2 days)

Phase 3 will be concerned with the centerpiece of my website, the articles.
(I will definitely need to configure how many articles are pre-cached in the
database and how to handle garbage collecting/updating the database as the project, views, and my
understanding of jFeed progresses.) Websites and articles can then be associated
with different folders which can be created, destroyed, and renamed. This will
be reflected in new formatting in the sidebar.  Articles will be able to be
 read, tagged, organized, and categorized. Folders will be able to be added,
  organized, renamed, and destroyed.

[Details][phase-three]

### Phase 4: Search and Sort (1 days)

Phase 4 introduces two new features. First, users can search for specific
articles, based on their title or author, in a selected subset of websites or
the complete collection of websites the are subscribed to. The second function
will allow users to sort their article views based upon different criteria.
(date and read, for starters).

[Details][phase-four]

### Phase 5: React Components for Actions (2 days)

Phase 5 will be concerned with the implementation and presentation of the
different actions required for the website. These will revolve around 2
components, the RightClickMenu and UserSettings. This is where the UX will be
 created to work with the back end.

[Details][phase-five]

### Phase 6: Article Collections (1 day)

Phase 6 will add a custom feature which is the creation of collections
of articles. Much like websites, these will hold a number of articles with links.
The user can create reading lists of different articles they enjoyed. Other users
can then view each others' collections.

[Details][phase-six]


### Bonus Features (TBD)
- [ ] Loading Animations
- [ ] Pagination / infinite scroll for Articles
- [ ] Profile Page
- [ ] Multiple sessions to share articles
- [ ] Highlighting in Article share
- [ ] Public/Private settings
- [ ] Friends Between Users
- [ ] Internal Commenting Among Friends on Articles
- [ ] Upvoting of Articles and Collections

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
