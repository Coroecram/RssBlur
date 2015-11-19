class CreateJoinTable < ActiveRecord::Migration
  def change
    create_table  :user_articles do |t|
      t.integer :user_id
      t.integer :article_id
      t.boolean :read, default: false, null: false
    end
    add_index :user_articles, :user_id
    add_index :user_articles, :article_id
  end
end
