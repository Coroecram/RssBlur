json.array! @articles do |article|
  json.extract! article, :url, :title, :author, :details, :summary, :created_date
end
