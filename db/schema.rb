# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151120144128) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "articles", force: true do |t|
    t.string   "url",                                null: false
    t.string   "title",                              null: false
    t.text     "summary"
    t.string   "author",       default: "anonymous", null: false
    t.datetime "created_date",                       null: false
    t.integer  "website_id",                         null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "details"
  end

  add_index "articles", ["author"], name: "index_articles_on_author", using: :btree
  add_index "articles", ["created_date"], name: "index_articles_on_created_date", using: :btree
  add_index "articles", ["url"], name: "index_articles_on_url", using: :btree
  add_index "articles", ["website_id"], name: "index_articles_on_website_id", using: :btree

  create_table "user_articles", force: true do |t|
    t.integer "user_id"
    t.integer "article_id"
    t.boolean "read",        default: false, null: false
    t.boolean "pseudo_read", default: false
  end

  add_index "user_articles", ["article_id"], name: "index_user_articles_on_article_id", using: :btree
  add_index "user_articles", ["user_id"], name: "index_user_articles_on_user_id", using: :btree

  create_table "user_websites", force: true do |t|
    t.integer  "user_id",                null: false
    t.integer  "website_id",             null: false
    t.integer  "folder_id",  default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_websites", ["folder_id"], name: "index_user_websites_on_folder_id", using: :btree
  add_index "user_websites", ["user_id"], name: "index_user_websites_on_user_id", using: :btree
  add_index "user_websites", ["website_id"], name: "index_user_websites_on_website_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["password_digest", "username"], name: "index_users_on_password_digest_and_username", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

  create_table "websites", force: true do |t|
    t.string   "name",       null: false
    t.string   "url",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "websites", ["url"], name: "index_websites_on_url", using: :btree

end
