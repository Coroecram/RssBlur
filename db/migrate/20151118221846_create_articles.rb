class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :url, null: false
      t.string :title, null: false
      t.string :author, null: false, default: 'anonymous'
      t.datetime :created_date, null: false
      t.integer :website_id, null: false

      t.timestamps
    end
    add_index :articles, :url
    add_index :articles, :author
    add_index :articles, :created_date
    add_index :articles, :website_id
  end
end
