# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create!([
    {
       username: "User1",
       email: "user@1.com",
       password:"password",
       password_confirmation:"password"
    },
    {
       username: "User2",
       email: "user@2.com",
       password:"password",
       password_confirmation:"password"
    },
    {
       username: "User3",
       email: "user@3.com",
       password: "password",
       password_confirmation:"password"
    },
    {
      username: "Guest",
      email: "7evEUIpk1O1ajjK9lhihQ@belieber.com",
      password: "AqXPos8Nz04DPBiBd0BIjQ",
      password_confirmation:"AqXPos8Nz04DPBiBd0BIjQ"
    }
  ]
)

Website.create!([
  {
    name: "WIRED Feed",
    url: "http://www.wired.com/feed/",
    logo: "http://www.wired.com/wp-content/themes/Phoenix/assets/images/favicon.ico",
    description: "Get in-depth coverage of current and future trends in technology, and how they are shaping business, entertainment, communications, science, politics, and culture at WIRED.",
 },
 {
    name: "The Nation Feed",
    url: "http://www.thenation.com/feed/?post_type=article",
    logo: "http://www.thenation.com/wp-content/themes/thenation/images/favicon.ico",
   },
   {
    name: "Engadget Feed",
    url: "http://www.engadget.com/rss.xml",
    logo: "http://www.blogsmithmedia.com/www.engadget.com/media/favicon-16x16.png",
    description: "Engadget is a web magazine with obsessive daily coverage of everything new in gadgets and consumer electronics",
   },
   { name: "Colossal",
     url: "http://feeds.feedburner.com/colossal",
     logo: "http://www.thisiscolossal.com/favicon.ico?v=6",
     description: "© 2010-2015 Christopher Jobson, all rights reserve..."
   },
   { name: "Lifehacker",
     url: "https://lifehacker.com/rss",
     logo: nil,
     description: "Google FeedBurner lets you stay on top of the late..."
   },
   { name: "Next Big Future",
     url: "http://feeds.feedburner.com/blogspot/advancednano",
     logo: "http://nextbigfuture.com/favicon.ico",
     description: ""
   },
   { name: "Gizmodo",
     url: "https://gizmodo.com/rss",
     logo: nil,
     description: "Google FeedBurner lets you stay on top of the late..."
   }
]


UserWebsite.create!([
  {
    user_id: 1,
    website_id: 1,
    folder_id: 0
  },
  {
    user_id: 1,
    website_id: 2,
    folder_id: 0
  },
  {
    user_id: 1,
    website_id: 3,
    folder_id: 0
  },
  {
    user_id: 2,
    website_id: 1,
    folder_id: 0
  },
  {
    user_id: 2,
    website_id: 2,
    folder_id: 0
  },
  {
    user_id: 3,
    website_id: 3,
    folder_id: 0
  },
  {
    user_id: 4,
    website_id: 4,
    folder_id: 0
  },
  {
    user_id: 4,
    website_id: 6,
    folder_id: 0
  },
  {
    user_id: 4,
    website_id: 7,
    folder_id: 0
  }
 ]
)
