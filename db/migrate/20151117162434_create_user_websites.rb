class CreateUserWebsites < ActiveRecord::Migration
  def change
    create_table :user_websites do |t|

      t.timestamps
    end
  end
end
