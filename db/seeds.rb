# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create!([{
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
            }])

Website.create!([{
                  name: "Wired",
                  url: "http://www.wired.com/feed/"
                 },
                 {
                  name: "The Nation",
                  url: "http://www.thenation.com/feed/?post_type=article"
                 },
                 {
                  name: "Engadget",
                  url: "http://www.engadget.com/rss.xml"
                 }])

UserWebsite.create!([{
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
                            }
                    ])
