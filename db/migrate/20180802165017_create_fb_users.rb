class CreateFbUsers < ActiveRecord::Migration
  def change
    create_table :fb_users do |t|
      t.string :access_token
      t.string :email, unique: true
      t.datetime :expires_in
      t.datetime :reauthorize_in
      t.integer :user_id

      t.timestamps
    end

    add_index :users, :email
    add_index :fb_users, :email
    add_column :users, :fb_user_id, :integer
    add_reference :users, :fb_users, foreign_key: true
    add_reference :fb_users, :users, foreign_key: true
  end
end
