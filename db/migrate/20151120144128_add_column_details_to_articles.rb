class AddColumnDetailsToArticles < ActiveRecord::Migration
  def change
    add_column :articles, :details, :string
  end
end
