class CreateWebsites < ActiveRecord::Migration
  def change
    create_table :websites do |t|
      t.string :url, null: false
      t.integer :folder_id, default: 0

      t.timestamps
    end
    add_index :websites, :url
    add_index :websites, :folder_id
  end
end
