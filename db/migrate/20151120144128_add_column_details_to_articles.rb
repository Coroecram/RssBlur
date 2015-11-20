class AddColumnDetailsToArticles < ActiveRecord::Migration
  def change
    add_column :articles, :details, :text
    add_column :user_articles, :pseudo_read, :boolean, default: false
  end
end
