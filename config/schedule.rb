# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:
#
# set :output, "/path/to/my/cron_log.log"
#
# every 5.seconds do
#   runner "RunIntervalPeriodicJob.job_to_run_on_interval"
# end

#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Learn more: http://github.com/javan/whenever

every 3.hours do
  rake delete:old_records
end

every 1.day at: '12am' do
  rake guest_prep:guest_updates
end
