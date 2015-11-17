class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false, unique: true
      t.string :email, null: false, unique: true
      t.string :password_digest, null: false, unique: true
      t.string :session_token, null: false, unique: true

      t.timestamps
    end
    add_index :users, :session_token, unique: true
    add_index :users, [:password_digest, :username], unique: true
  end
end
