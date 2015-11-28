class CreatePeriodicJobs < ActiveRecord::Migration
  def change
    create_table :periodic_jobs do |t|
      t.string :type
      t.text :job
      t.string :url
      t.integer :interval
      t.datetime :last_run_at

      t.timestamps
    end
  end
end
