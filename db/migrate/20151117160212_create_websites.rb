class CreateWebsites < ActiveRecord::Migration
  def change
    create_table :websites do |t|
      t.string :name, null: false
      t.string :url, null: false

      t.timestamps
    end
    add_index :websites, :url
  end
end
