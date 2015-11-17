class CreateUserWebsites < ActiveRecord::Migration
  def change
    create_table :user_websites do |t|
      t.integer :user_id, null: false
      t.integer :website_id, null: false
      t.integer :folder_id, default: 0

      t.timestamps
  end

    add_index :user_websites, :user_id
    add_index :user_websites, :website_id
    add_index :user_websites, :folder_id
  end
end
